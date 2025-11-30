"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/admin-layout"
import { getPCById, createPC, updatePC, uploadPCImage, deletePCImage } from "@/lib/pc-service"
import { generateSlug } from "@/lib/slug"
import { ArrowLeft, X, Upload, Loader2 } from "lucide-react"

interface PCFormProps {
  pcId?: string
}

export function PCForm({ pcId }: PCFormProps) {
  const router = useRouter()
  const isEditing = !!pcId

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  // Form fields
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [priceChf, setPriceChf] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [cpu, setCpu] = useState("")
  const [gpu, setGpu] = useState("")
  const [ram, setRam] = useState("")
  const [storage, setStorage] = useState("")
  const [motherboard, setMotherboard] = useState("")
  const [cooler, setCooler] = useState("")
  const [psu, setPsu] = useState("")
  const [caseModel, setCaseModel] = useState("")
  const [usageTags, setUsageTags] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [features, setFeatures] = useState("")

  useEffect(() => {
    if (isEditing) {
      loadPC()
    }
  }, [pcId])

  useEffect(() => {
    if (!isEditing && name) {
      setSlug(generateSlug(name))
    }
  }, [name, isEditing])

  const loadPC = async () => {
    if (!pcId) return

    try {
      const pc = await getPCById(pcId)
      if (pc) {
        setName(pc.name)
        setSlug(pc.slug)
        setPriceChf(pc.priceChf.toString())
        setShortDescription(pc.shortDescription)
        setLongDescription(pc.longDescription)
        setCpu(pc.cpu)
        setGpu(pc.gpu)
        setRam(pc.ram)
        setStorage(pc.storage)
        setMotherboard(pc.motherboard || "")
        setCooler(pc.cooler || "")
        setPsu(pc.psu || "")
        setCaseModel(pc.caseModel || "")
        setUsageTags(pc.usageTags.join(", "))
        setIsFeatured(pc.isFeatured)
        setImages(pc.images)
        setFeatures(pc.features?.join("\n") || "")
      }
    } catch (error) {
      console.error("[v0] Error loading PC:", error)
      alert("Failed to load PC")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = async (imageUrl: string) => {
    if (!confirm("Remove this image?")) return

    try {
      await deletePCImage(imageUrl)
      setImages(images.filter((img) => img !== imageUrl))

      if (isEditing && pcId) {
        await updatePC(pcId, { images: images.filter((img) => img !== imageUrl) })
      }
    } catch (error) {
      console.error("[v0] Error removing image:", error)
      alert("Failed to remove image")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (!isEditing) {
      alert("Please save the PC first before uploading images")
      return
    }

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map((file) => uploadPCImage(pcId!, file))
      const uploadedUrls = await Promise.all(uploadPromises)

      const newImages = [...images, ...uploadedUrls]
      setImages(newImages)

      await updatePC(pcId!, { images: newImages })
    } catch (error) {
      console.error("[v0] Error uploading images:", error)
      alert("Failed to upload images")
    } finally {
      setUploadingImages(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !priceChf || !cpu || !gpu) {
      alert("Please fill in all required fields (Name, Price, CPU, GPU)")
      return
    }

    setSaving(true)
    try {
      const pcData = {
        name,
        slug: slug || generateSlug(name),
        priceChf: Number.parseFloat(priceChf),
        shortDescription,
        longDescription,
        cpu,
        gpu,
        ram,
        storage,
        motherboard,
        cooler,
        psu,
        caseModel,
        usageTags: usageTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isFeatured,
        images,
        features: features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
      }

      if (isEditing && pcId) {
        await updatePC(pcId, pcData)
      } else {
        const newId = await createPC(pcData)
        router.push(`/admin/pcs/${newId}`)
        return
      }

      alert("PC saved successfully!")
      router.push("/admin/pcs")
    } catch (error) {
      console.error("[v0] Error saving PC:", error)
      alert("Failed to save PC")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title={isEditing ? "Edit PC" : "Create New PC"}
      description={isEditing ? `Editing ${name}` : "Add a new PC to your catalog"}
      action={
        <Link href="/admin/pcs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to PCs
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="DISRUPTEC Gaming Pro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="disruptec-gaming-pro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">
              Price (CHF) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={priceChf}
              onChange={(e) => setPriceChf(e.target.value)}
              placeholder="1299"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Input
              id="shortDesc"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Perfect for 1080p gaming with high FPS"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDesc">Long Description</Label>
            <Textarea
              id="longDesc"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Detailed description of the PC..."
              rows={4}
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Specifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu">
                CPU <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cpu"
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="AMD Ryzen 5 7600X"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpu">
                GPU <span className="text-destructive">*</span>
              </Label>
              <Input id="gpu" value={gpu} onChange={(e) => setGpu(e.target.value)} placeholder="RTX 4060 Ti" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ram">RAM</Label>
              <Input id="ram" value={ram} onChange={(e) => setRam(e.target.value)} placeholder="16GB DDR5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Input id="storage" value={storage} onChange={(e) => setStorage(e.target.value)} placeholder="1TB NVMe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherboard">Motherboard</Label>
              <Input
                id="motherboard"
                value={motherboard}
                onChange={(e) => setMotherboard(e.target.value)}
                placeholder="B650 Chipset"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cooler">Cooler</Label>
              <Input id="cooler" value={cooler} onChange={(e) => setCooler(e.target.value)} placeholder="280mm AIO" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="psu">PSU</Label>
              <Input id="psu" value={psu} onChange={(e) => setPsu(e.target.value)} placeholder="650W 80+ Gold" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="case">Case</Label>
              <Input
                id="case"
                value={caseModel}
                onChange={(e) => setCaseModel(e.target.value)}
                placeholder="Tempered Glass ATX"
              />
            </div>
          </div>
        </div>

        {/* Tags and Features */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tags & Features</h2>

          <div className="space-y-2">
            <Label htmlFor="tags">Usage Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={usageTags}
              onChange={(e) => setUsageTags(e.target.value)}
              placeholder="1080p, 1440p, Content Creation, Streaming"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Optimized for competitive gaming&#10;High-quality RGB lighting&#10;Professional cable management&#10;3 years warranty"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured PC
            </Label>
          </div>
        </div>

        {/* Images */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Images</h2>

          {!isEditing && (
            <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
              Save the PC first to upload images
            </div>
          )}

          {isEditing && (
            <>
              <div>
                <Label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-foreground mb-1">Click to upload images</p>
                    <p className="text-xs text-muted-foreground">Multiple files supported</p>
                  </div>
                </Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImages}
                />
              </div>

              {uploadingImages && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Uploading images...</span>
                </div>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
                    <div key={imageUrl} className="relative group aspect-square">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`PC image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(imageUrl)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      {index === 0 && <Badge className="absolute bottom-2 left-2">Main</Badge>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEditing ? "Update PC" : "Create PC"}</>
            )}
          </Button>
          <Link href="/admin/pcs">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </AdminLayout>
  )
}
