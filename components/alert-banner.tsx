"use client"

import { AlertTriangle, X } from "lucide-react"
import type { InventoryAlert } from "@/lib/types"
import { useState } from "react"

interface AlertBannerProps {
  alerts: InventoryAlert[]
}

export function AlertBanner({ alerts: initialAlerts }: AlertBannerProps) {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visibleAlerts = alerts.filter((alert) => !dismissed.has(alert.id))

  if (visibleAlerts.length === 0) return null

  const handleDismiss = (alertId: string) => {
    setDismissed((prev) => new Set(prev).add(alertId))
  }

  return (
    <div className="flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive" />
      <div className="flex-1">
        <p className="font-medium text-foreground">
          {visibleAlerts.length} Active Alert{visibleAlerts.length !== 1 ? "s" : ""}
        </p>
        <div className="mt-2 space-y-1">
          {visibleAlerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{alert.productName}:</span> {alert.message}
              </p>
              <button
                onClick={() => handleDismiss(alert.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {visibleAlerts.length > 3 && (
          <p className="mt-2 text-sm text-muted-foreground">
            +{visibleAlerts.length - 3} more alert{visibleAlerts.length - 3 !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  )
}
