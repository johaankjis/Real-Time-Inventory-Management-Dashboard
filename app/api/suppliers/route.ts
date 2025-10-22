import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/suppliers - List all suppliers
export async function GET(request: NextRequest) {
  try {
    const suppliers = await db.getSuppliers()

    return NextResponse.json({
      success: true,
      data: suppliers,
      count: suppliers.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch suppliers",
      },
      { status: 500 },
    )
  }
}
