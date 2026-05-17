"use server"

import { env } from "@/env"
import { cookies } from "next/headers"

const API_URL = env.API_URL

// helper inside file (recommended for reuse inside same file)


  // GET ALL USERS
 export const getAllUser=async function() {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `${API_URL}/users`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        }
      )

      const users = await res.json()

      return {
        data: users,
        error: null,
      }
    } catch (err) {
      return {
        data: null,
        error: {
          message:
            "Failed to fetch users",
        },
      }
    }
  }

  
