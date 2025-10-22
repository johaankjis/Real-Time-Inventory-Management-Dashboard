import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/analytics/revenue - Get revenue data
export async function GET(request: NextRequest) {
  try {
    const data = await db.getRevenueData()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch revenue data",
      },
      { status: 500 },
    )
  }
}
