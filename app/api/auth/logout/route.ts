import { type NextRequest, NextResponse } from "next/server"
import { destroySession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await destroySession()

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during logout",
      },
      { status: 500 },
    )
  }
}
