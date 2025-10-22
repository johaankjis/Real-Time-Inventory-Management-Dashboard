import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/alerts - List all alerts
export async function GET(request: NextRequest) {
  try {
    const alerts = await db.getAlerts()

    return NextResponse.json({
      success: true,
      data: alerts,
      count: alerts.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch alerts",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/alerts - Dismiss an alert
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const alertId = searchParams.get("id")

    if (!alertId) {
      return NextResponse.json(
        {
          success: false,
          error: "Alert ID is required",
        },
        { status: 400 },
      )
    }

    const success = await db.dismissAlert(alertId)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Alert not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Alert dismissed successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to dismiss alert",
      },
      { status: 500 },
    )
  }
}
