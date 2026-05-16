"use server"

import { cookies } from "next/headers"
import { UpdateSlotData } from "@/types/slot.type"

const API_URL = process.env.API_URL


// CREATE SLOT
export async function createSlot(
  tutorId: string,
  dayOfWeek: string
) {
  const cookieStore =await cookies()
  try {
    const res = await fetch(
      `${API_URL}/slots`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          tutorId,
          dayOfWeek,
        }),
        cache: "no-store",
      }
    )

    const data = await res.json()

    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to create slot",
      },
    }
  }
}

// GET ALL SLOTS
export async function getAllSlots() {
  try {
    const cookieStore = await cookies()
    const res = await fetch(
      `${API_URL}/slots`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    )

    const data = await res.json()

    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to fetch slots",
      },
    }
  }
}

// UPDATE SLOT
export async function updateSlot(
  slotId: string,
  data: UpdateSlotData
) {
  try {
    const res = await fetch(
      `${API_URL}/slots/${slotId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    )

    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => null)

      throw new Error(
        error?.message ||
          "Failed to update slot"
      )
    }

    const result = await res.json()

    return {
      data: result,
      error: null,
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    }
  }
}