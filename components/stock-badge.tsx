import type { Product } from "@/lib/types"

interface StockBadgeProps {
  status: Product["status"]
}

export function StockBadge({ status }: StockBadgeProps) {
  const styles = {
    "in-stock": "bg-green-500/10 text-green-700 dark:text-green-400",
    "low-stock": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    "out-of-stock": "bg-red-500/10 text-red-700 dark:text-red-400",
    discontinued: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  const labels = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
    discontinued: "Discontinued",
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
