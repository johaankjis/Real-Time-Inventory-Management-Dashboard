"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface StockTrendChartProps {
  data: Array<{
    date: string
    inStock: number
    lowStock: number
    outOfStock: number
  }>
}

export function StockTrendChart({ data }: StockTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          className="text-xs text-muted-foreground"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
        />
        <YAxis className="text-xs text-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend />
        <Line type="monotone" dataKey="inStock" stroke="hsl(142 76% 36%)" strokeWidth={2} name="In Stock" />
        <Line type="monotone" dataKey="lowStock" stroke="hsl(48 96% 53%)" strokeWidth={2} name="Low Stock" />
        <Line type="monotone" dataKey="outOfStock" stroke="hsl(0 84% 60%)" strokeWidth={2} name="Out of Stock" />
      </LineChart>
    </ResponsiveContainer>
  )
}
