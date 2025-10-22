"use client"

import type { Product } from "@/lib/types"
import { StockBadge } from "./stock-badge"
import { Package, MapPin } from "lucide-react"
import { useState } from "react"

interface InventoryTableProps {
  products: Product[]
}

export function InventoryTable({ products }: InventoryTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Product</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">SKU</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Location</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-muted/50"
                onClick={() => setSelectedProduct(product)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="rounded bg-muted px-2 py-1 text-sm font-mono text-foreground">{product.sku}</code>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{product.currentStock} units</p>
                    <p className="text-muted-foreground">Min: {product.minStockLevel}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StockBadge status={product.status} />
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Cost: ${product.cost.toFixed(2)}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium text-foreground">No products found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}

      {/* Product Detail Modal - Simple version for now */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-2xl rounded-lg border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-foreground">{selectedProduct.name}</h2>
            <p className="mt-2 text-muted-foreground">{selectedProduct.description}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">SKU</p>
                <p className="mt-1 text-foreground">{selectedProduct.sku}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="mt-1 text-foreground">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                <p className="mt-1 text-foreground">{selectedProduct.currentStock} units</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reorder Point</p>
                <p className="mt-1 text-foreground">{selectedProduct.reorderPoint} units</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Price</p>
                <p className="mt-1 text-foreground">${selectedProduct.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost</p>
                <p className="mt-1 text-foreground">${selectedProduct.cost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="mt-1 text-foreground">{selectedProduct.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Restocked</p>
                <p className="mt-1 text-foreground">{new Date(selectedProduct.lastRestocked).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Close
              </button>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
