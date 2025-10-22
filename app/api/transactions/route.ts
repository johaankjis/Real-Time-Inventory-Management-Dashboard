import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/transactions - List transactions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const productId = searchParams.get("productId") || undefined

    let transactions
    if (productId) {
      transactions = await db.getTransactionsByProduct(productId)
    } else {
      transactions = await db.getTransactions(limit)
    }

    return NextResponse.json({
      success: true,
      data: transactions,
      count: transactions.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch transactions",
      },
      { status: 500 },
    )
  }
}
