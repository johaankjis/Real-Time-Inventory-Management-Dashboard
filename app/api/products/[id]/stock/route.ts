import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// POST /api/products/[id]/stock - Update stock levels
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate request body
    if (typeof body.quantity !== "number") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quantity: must be a number",
        },
        { status: 400 },
      )
    }

    if (!body.type || !["purchase", "sale", "adjustment", "return"].includes(body.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid type: must be purchase, sale, adjustment, or return",
        },
        { status: 400 },
      )
    }

    // Update stock
    const product = await db.updateStock(id, body.quantity, body.type, body.userId || "API_USER", body.notes)

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: "Stock updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update stock",
      },
      { status: 500 },
    )
  }
}
