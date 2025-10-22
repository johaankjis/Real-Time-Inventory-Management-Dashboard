"use client"

import { Search, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

export function InventoryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [status, setStatus] = useState(searchParams.get("status") || "all")

  const handleSearch = (value: string) => {
    setSearch(value)
    updateFilters({ search: value, category, status })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    updateFilters({ search, category: value, status })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    updateFilters({ search, category, status: value })
  }

  const updateFilters = (filters: { search: string; category: string; status: string }) => {
    const params = new URLSearchParams()
    if (filters.search) params.set("search", filters.search)
    if (filters.category !== "all") params.set("category", filters.category)
    if (filters.status !== "all") params.set("status", filters.status)

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative flex-1 md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products by name, SKU, or category..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Categories</option>
          <option value="Processors">Processors</option>
          <option value="Graphics Cards">Graphics Cards</option>
          <option value="Memory">Memory</option>
          <option value="Storage">Storage</option>
          <option value="Motherboards">Motherboards</option>
          <option value="Power Supplies">Power Supplies</option>
          <option value="Cases">Cases</option>
          <option value="Cooling">Cooling</option>
          <option value="Monitors">Monitors</option>
          <option value="Peripherals">Peripherals</option>
        </select>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>
    </div>
  )
}
