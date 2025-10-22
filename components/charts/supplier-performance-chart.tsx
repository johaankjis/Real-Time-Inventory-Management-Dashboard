"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SupplierPerformanceChartProps {
  data: Array<{
    name: string
    onTimeDelivery: number
    rating: number
    totalOrders: number
  }>
}

export function SupplierPerformanceChart({ data }: SupplierPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis type="number" className="text-xs text-muted-foreground" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" className="text-xs text-muted-foreground" width={150} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: number) => `${value}%`}
        />
        <Bar dataKey="onTimeDelivery" fill="hsl(142 76% 36%)" radius={[0, 8, 8, 0]} name="On-Time Delivery %" />
      </BarChart>
    </ResponsiveContainer>
  )
}
