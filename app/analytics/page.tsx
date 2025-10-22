import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { StockTrendChart } from "@/components/charts/stock-trend-chart"
import { CategoryDistributionChart } from "@/components/charts/category-distribution-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { SupplierPerformanceChart } from "@/components/charts/supplier-performance-chart"
import { UserMenu } from "@/components/user-menu"
import { Package, TrendingUp, DollarSign, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AnalyticsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const kpis = await db.getKPIs()
  const stockTrend = await db.getStockTrendData()
  const categoryDistribution = await db.getCategoryDistribution()
  const revenueData = await db.getRevenueData()
  const supplierPerformance = await db.getSupplierPerformance()

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
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Comprehensive inventory insights & metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi, index) => {
            const icons = [Package, TrendingUp, TrendingUp, TrendingUp, DollarSign, Users]
            const Icon = icons[index] || Package
            const colors = [
              "bg-blue-500/10 text-blue-600",
              "bg-green-500/10 text-green-600",
              "bg-yellow-500/10 text-yellow-600",
              "bg-red-500/10 text-red-600",
              "bg-purple-500/10 text-purple-600",
              "bg-indigo-500/10 text-indigo-600",
            ]

            return (
              <div key={index} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">{kpi.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors[index]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      kpi.trend === "up"
                        ? "text-green-600"
                        : kpi.trend === "down"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↓" : "→"} {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-sm text-muted-foreground">vs last period</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Stock Trend Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Stock Level Trends</h2>
              <p className="text-sm text-muted-foreground">Daily stock status over the last 30 days</p>
            </div>
            <StockTrendChart data={stockTrend} />
          </div>

          {/* Category Distribution Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Category Distribution</h2>
              <p className="text-sm text-muted-foreground">Stock units by product category</p>
            </div>
            <CategoryDistributionChart data={categoryDistribution} />
          </div>

          {/* Revenue Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Revenue & Cost Analysis</h2>
              <p className="text-sm text-muted-foreground">Monthly revenue vs cost comparison</p>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          {/* Supplier Performance Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Supplier Performance</h2>
              <p className="text-sm text-muted-foreground">On-time delivery rates by supplier</p>
            </div>
            <SupplierPerformanceChart data={supplierPerformance} />
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Top Performing Categories</h3>
            <div className="mt-4 space-y-3">
              {categoryDistribution
                .sort((a, b) => b.value - a.value)
                .slice(0, 5)
                .map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{cat.category}</span>
                    <span className="text-sm font-medium text-muted-foreground">{cat.value} units</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Top Suppliers</h3>
            <div className="mt-4 space-y-3">
              {supplierPerformance
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((supplier) => (
                  <div key={supplier.name} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{supplier.name}</span>
                    <span className="text-sm font-medium text-muted-foreground">★ {supplier.rating.toFixed(1)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Quick Stats</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Avg. Stock Value</span>
                <span className="text-sm font-medium text-muted-foreground">$1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Turnover Rate</span>
                <span className="text-sm font-medium text-muted-foreground">4.2x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Avg. Restock Time</span>
                <span className="text-sm font-medium text-muted-foreground">5.3 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Stock Accuracy</span>
                <span className="text-sm font-medium text-muted-foreground">98.7%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
