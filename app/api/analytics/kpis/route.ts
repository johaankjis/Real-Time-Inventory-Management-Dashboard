import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/analytics/kpis - Get KPI data
export async function GET(request: NextRequest) {
  try {
    const kpis = await db.getKPIs()

    return NextResponse.json({
      success: true,
      data: kpis,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KPIs",
      },
      { status: 500 },
    )
  }
}
