import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/suppliers/[id] - Get single supplier
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supplier = await db.getSupplierById(id)

    if (!supplier) {
      return NextResponse.json(
        {
          success: false,
          error: "Supplier not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: supplier,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch supplier",
      },
      { status: 500 },
    )
  }
}
