import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UserMenu } from "@/components/user-menu"
import { Users, ArrowLeft, Mail, Phone, MapPin, Star, TrendingUp, Package } from "lucide-react"
import Link from "next/link"

export default async function SuppliersPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const suppliers = await db.getSuppliers()
  const products = await db.getProducts()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-secondary/80"
              >
                <ArrowLeft className="h-5 w-5 text-secondary-foreground" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Supplier Management</h1>
                <p className="text-sm text-muted-foreground">Manage supplier relationships & performance</p>
              </div>
            </div>
            <UserMenu user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{suppliers.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {suppliers.filter((s) => s.status === "active").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {suppliers.reduce((sum, s) => sum + s.totalOrders, 0).toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => {
            const supplierProducts = products.filter((p) => p.supplierId === supplier.id)

            return (
              <div key={supplier.id} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      supplier.status === "active"
                        ? "bg-green-500/10 text-green-700 dark:text-green-400"
                        : "bg-gray-500/10 text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {supplier.address}
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-medium text-foreground">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        {supplier.rating.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">On-Time</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{supplier.onTimeDelivery}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{supplier.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Products</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{supplierProducts.length}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  View Details
                </button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
