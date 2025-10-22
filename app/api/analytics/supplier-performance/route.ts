import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/analytics/supplier-performance - Get supplier performance data
export async function GET(request: NextRequest) {
  try {
    const data = await db.getSupplierPerformance()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch supplier performance data",
      },
      { status: 500 },
    )
  }
}
