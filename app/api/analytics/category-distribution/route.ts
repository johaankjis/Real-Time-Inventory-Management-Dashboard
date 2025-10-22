import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/analytics/category-distribution - Get category distribution
export async function GET(request: NextRequest) {
  try {
    const data = await db.getCategoryDistribution()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch category distribution",
      },
      { status: 500 },
    )
  }
}
