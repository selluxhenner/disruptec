import type { ReactNode } from "react"

interface AdminLayoutProps {
  children: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function AdminLayout({ children, title, description, action }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
