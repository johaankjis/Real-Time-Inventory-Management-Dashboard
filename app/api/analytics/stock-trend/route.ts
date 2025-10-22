import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/analytics/stock-trend - Get stock trend data
export async function GET(request: NextRequest) {
  try {
    const data = await db.getStockTrendData()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stock trend data",
      },
      { status: 500 },
    )
  }
}
