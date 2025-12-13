"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllPCs, deletePC } from "@/lib/pc-service"
import type { PCDocument } from "@/lib/types"
import { Trash2, Pencil, Plus, LogOut, ImageIcon } from "lucide-react"

export default function AdminPCsPage() {
  const router = useRouter()
  const [pcs, setPcs] = useState<PCDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadPCs()
  }, [])

  const loadPCs = async () => {
    try {
      const data = await getAllPCs()
      setPcs(data)
    } catch (error) {
      console.error("Error loading PCs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }

    setDeletingId(id)
    try {
      await deletePC(id)
      setPcs(pcs.filter((pc) => pc.id !== id))
    } catch (error) {
      console.error("Error deleting PC:", error)
      alert("Failed to delete PC")
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">PC MANAGEMENT</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            {pcs.length} {pcs.length === 1 ? "PC" : "PCs"} total
          </p>
          <Link href="/admin/pcs/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New PC
            </Button>
          </Link>
        </div>

        {pcs.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">No PCs yet</p>
            <Link href="/admin/pcs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First PC
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Price</th>
                    <th className="text-left p-4 font-semibold text-sm">Images</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-right p-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pcs.map((pc) => (
                    <tr key={pc.id} className="border-b border-border last:border-0">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{pc.name}</p>
                          <p className="text-sm text-muted-foreground">{pc.slug}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-foreground">CHF {pc.priceChf.toLocaleString("de-CH")}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm">{pc.images.length}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {pc.isFeatured ? (
                          <Badge variant="default">Featured</Badge>
                        ) : (
                          <Badge variant="secondary">Standard</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/pcs/${pc.id}`}>
                            <Button variant="outline" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(pc.id, pc.name)}
                            disabled={deletingId === pc.id}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
