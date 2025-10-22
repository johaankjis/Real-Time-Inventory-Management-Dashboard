import { InventoryTable } from "@/components/inventory-table"
import { InventoryFilters } from "@/components/inventory-filters"
import { AlertBanner } from "@/components/alert-banner"
import { UserMenu } from "@/components/user-menu"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Package, TrendingUp, AlertTriangle, Users } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const products = await db.getProducts()
  const alerts = await db.getAlerts()
  const kpis = await db.getKPIs()

  // Get quick stats
  const inStockCount = products.filter((p) => p.status === "in-stock").length
  const lowStockCount = products.filter((p) => p.status === "low-stock").length
  const outOfStockCount = products.filter((p) => p.status === "out-of-stock").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
                <p className="text-sm text-muted-foreground">Real-time stock tracking & analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/analytics"
                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </a>
              <a
                href="/suppliers"
                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Users className="h-4 w-4" />
                Suppliers
              </a>
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <div className="border-b border-border bg-destructive/10">
          <div className="container mx-auto px-6 py-3">
            <AlertBanner alerts={alerts} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{products.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-green-600">+5.2%</span> from last month
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{inStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {((inStockCount / products.length) * 100).toFixed(0)}% of total inventory
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{lowStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Requires attention</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{outOfStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Immediate reorder needed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <InventoryFilters />
        </div>

        {/* Inventory Table */}
        <div className="rounded-lg border border-border bg-card">
          <InventoryTable products={products} />
        </div>
      </main>
    </div>
  )
}
