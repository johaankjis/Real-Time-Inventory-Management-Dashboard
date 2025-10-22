"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CategoryDistributionChartProps {
  data: Array<{
    category: string
    value: number
    percentage: number
  }>
}

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="category"
          className="text-xs text-muted-foreground"
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
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
        <Bar dataKey="value" fill="hsl(221 83% 53%)" radius={[8, 8, 0, 0]} name="Stock Units" />
      </BarChart>
    </ResponsiveContainer>
  )
}
