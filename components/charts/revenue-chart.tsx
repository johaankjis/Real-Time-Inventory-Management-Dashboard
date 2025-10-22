"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
    cost: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="month" className="text-xs text-muted-foreground" />
        <YAxis className="text-xs text-muted-foreground" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend />
        <Bar dataKey="revenue" fill="hsl(142 76% 36%)" radius={[8, 8, 0, 0]} name="Revenue" />
        <Bar dataKey="cost" fill="hsl(0 84% 60%)" radius={[8, 8, 0, 0]} name="Cost" />
      </BarChart>
    </ResponsiveContainer>
  )
}
