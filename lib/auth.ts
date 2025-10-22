import { cookies } from "next/headers"
import { mockUsers } from "./mock-data"
import type { User } from "./types"

// Simple session management (in production, use proper session storage)
const sessions = new Map<string, { userId: string; expiresAt: number }>()

export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID()
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  sessions.set(sessionId, { userId, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
    path: "/",
  })

  return sessionId
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) return null

  const session = sessions.get(sessionId)
  if (!session) return null

  // Check if session expired
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId)
    return null
  }

  return { userId: session.userId }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  if (!session) return null

  const user = mockUsers.find((u) => u.id === session.userId)
  return user || null
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (sessionId) {
    sessions.delete(sessionId)
  }

  cookieStore.delete("session")
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  // In production, hash and compare passwords properly
  // For demo purposes, we'll use simple email matching
  const user = mockUsers.find((u) => u.email === email)

  // Demo: any password works for demo users
  if (user && password.length > 0) {
    return user
  }

  return null
}

export function requireAuth(user: User | null, allowedRoles?: User["role"][]): boolean {
  if (!user) return false
  if (!allowedRoles) return true
  return allowedRoles.includes(user.role)
}
