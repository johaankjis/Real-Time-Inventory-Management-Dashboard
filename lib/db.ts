import {
  mockProducts,
  mockSuppliers,
  mockTransactions,
  mockAlerts,
  mockUsers,
  generateStockTrendData,
  generateCategoryDistribution,
  generateRevenueData,
  generateSupplierPerformance,
} from "./mock-data"
import type { Product, Supplier, StockTransaction, InventoryAlert, User, KPI } from "./types"

// In-memory database simulation
class InventoryDatabase {
  private products: Product[] = [...mockProducts]
  private suppliers: Supplier[] = [...mockSuppliers]
  private transactions: StockTransaction[] = [...mockTransactions]
  private alerts: InventoryAlert[] = [...mockAlerts]
  private users: User[] = [...mockUsers]

  // Products
  async getProducts(filters?: {
    category?: string
    status?: string
    search?: string
  }): Promise<Product[]> {
    let filtered = [...this.products]

    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status)
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search),
      )
    }

    return filtered
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = { ...this.products[index], ...updates }
    return this.products[index]
  }

  async updateStock(
    productId: string,
    quantity: number,
    type: StockTransaction["type"],
    userId: string,
    notes?: string,
  ): Promise<Product | null> {
    const product = await this.getProductById(productId)
    if (!product) return null

    const previousStock = product.currentStock
    const newStock = previousStock + quantity

    // Update product stock
    product.currentStock = newStock
    product.lastRestocked = new Date()

    // Update status based on stock levels
    if (newStock === 0) {
      product.status = "out-of-stock"
    } else if (newStock <= product.reorderPoint) {
      product.status = "low-stock"
    } else {
      product.status = "in-stock"
    }

    // Create transaction record
    const transaction: StockTransaction = {
      id: `TXN${Date.now()}`,
      productId,
      type,
      quantity,
      previousStock,
      newStock,
      timestamp: new Date(),
      userId,
      notes,
    }
    this.transactions.unshift(transaction)

    // Check for alerts
    this.checkAndCreateAlerts(product)

    return product
  }

  private checkAndCreateAlerts(product: Product) {
    // Remove old alerts for this product
    this.alerts = this.alerts.filter((a) => a.productId !== product.id)

    if (product.currentStock === 0) {
      this.alerts.unshift({
        id: `ALT${Date.now()}`,
        productId: product.id,
        productName: product.name,
        type: "out-of-stock",
        severity: "high",
        message: "Product is completely out of stock. Immediate reorder required.",
        timestamp: new Date(),
      })
    } else if (product.currentStock <= product.reorderPoint) {
      this.alerts.unshift({
        id: `ALT${Date.now()}`,
        productId: product.id,
        productName: product.name,
        type: "low-stock",
        severity: product.currentStock < product.minStockLevel ? "high" : "medium",
        message: `Stock ${product.currentStock < product.minStockLevel ? "below minimum threshold" : "approaching reorder point"} (${product.currentStock} units remaining).`,
        timestamp: new Date(),
      })
    }
  }

  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    return [...this.suppliers]
  }

  async getSupplierById(id: string): Promise<Supplier | null> {
    return this.suppliers.find((s) => s.id === id) || null
  }

  // Transactions
  async getTransactions(limit?: number): Promise<StockTransaction[]> {
    return limit ? this.transactions.slice(0, limit) : [...this.transactions]
  }

  async getTransactionsByProduct(productId: string): Promise<StockTransaction[]> {
    return this.transactions.filter((t) => t.productId === productId)
  }

  // Alerts
  async getAlerts(): Promise<InventoryAlert[]> {
    return [...this.alerts]
  }

  async dismissAlert(id: string): Promise<boolean> {
    const index = this.alerts.findIndex((a) => a.id === id)
    if (index === -1) return false
    this.alerts.splice(index, 1)
    return true
  }

  // Analytics
  async getKPIs(): Promise<KPI[]> {
    const totalProducts = this.products.length
    const totalStock = this.products.reduce((sum, p) => sum + p.currentStock, 0)
    const lowStockCount = this.products.filter((p) => p.status === "low-stock").length
    const outOfStockCount = this.products.filter((p) => p.status === "out-of-stock").length
    const totalValue = this.products.reduce((sum, p) => sum + p.currentStock * p.price, 0)

    return [
      {
        label: "Total Products",
        value: totalProducts,
        change: 5.2,
        trend: "up",
      },
      {
        label: "Total Stock Units",
        value: totalStock.toLocaleString(),
        change: -2.4,
        trend: "down",
      },
      {
        label: "Low Stock Items",
        value: lowStockCount,
        change: 12.5,
        trend: "up",
      },
      {
        label: "Out of Stock",
        value: outOfStockCount,
        change: 8.3,
        trend: "up",
      },
      {
        label: "Inventory Value",
        value: `$${(totalValue / 1000).toFixed(0)}K`,
        change: 3.7,
        trend: "up",
      },
      {
        label: "Active Suppliers",
        value: this.suppliers.filter((s) => s.status === "active").length,
        change: 0,
        trend: "neutral",
      },
    ]
  }

  async getStockTrendData() {
    return generateStockTrendData()
  }

  async getCategoryDistribution() {
    return generateCategoryDistribution()
  }

  async getRevenueData() {
    return generateRevenueData()
  }

  async getSupplierPerformance() {
    return generateSupplierPerformance()
  }

  // Users
  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null
  }
}

// Export singleton instance
export const db = new InventoryDatabase()
