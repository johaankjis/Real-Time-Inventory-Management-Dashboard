// Core inventory types
export interface Product {
  id: string
  sku: string
  name: string
  category: string
  description: string
  price: number
  cost: number
  currentStock: number
  minStockLevel: number
  maxStockLevel: number
  reorderPoint: number
  supplierId: string
  location: string
  lastRestocked: Date
  status: "in-stock" | "low-stock" | "out-of-stock" | "discontinued"
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  rating: number
  totalOrders: number
  onTimeDelivery: number
  status: "active" | "inactive"
}

export interface StockTransaction {
  id: string
  productId: string
  type: "purchase" | "sale" | "adjustment" | "return"
  quantity: number
  previousStock: number
  newStock: number
  timestamp: Date
  userId: string
  notes?: string
}

export interface KPI {
  label: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
}

export interface InventoryAlert {
  id: string
  productId: string
  productName: string
  type: "low-stock" | "out-of-stock" | "overstock" | "expiring"
  severity: "high" | "medium" | "low"
  message: string
  timestamp: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "supplier" | "viewer"
  avatar?: string
}
