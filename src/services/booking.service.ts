"use server"

import { cookies } from "next/headers"
import { UpdateSessionData } from "@/types/bookings.type"

const API_URL = process.env.API_URL

// GET ALL SESSIONS
export async function getAllSessions() {
  try {
    const cookieStore =await cookies()

    const res = await fetch(
      `${API_URL}/teachingsessions`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString()
        },
        cache: "no-store",
      }
    )

    const data = await res.json()

    return { data, error: null }
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to fetch sessions" },
    }
  }
}

// DELETE SESSION
export async function deleteSession(id: string) {
  try {
    const cookieStore =await cookies()

    const res = await fetch(
      `${API_URL}/teachingsessions/${id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString()
        },
      }
    )

    const data = await res.json()

    return { data, error: null }
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to delete session" },
    }
  }
}

// UPDATE SESSION
export async function updateSession(
  sessionId: string,
  data: UpdateSessionData
) {
  try {
    const cookieStore =await cookies()

    const res = await fetch(
      `${API_URL}/teachingsessions/${sessionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString()
            
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    )

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      throw new Error(
        error?.message || "Failed to update session"
      )
    }

    const result = await res.json()

    return { data: result, error: null }
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message },
    }
  }
}