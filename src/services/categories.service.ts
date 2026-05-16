"use server"

import { cookies } from "next/headers"

const API_URL = process.env.API_URL

// GET ALL
export async function getAllCategories() {
  try {
    const cookieStore = await cookies()

    const res = await fetch(
      `${API_URL}/categories`,
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
  } catch (err) {
    return {
      data: null,
      error: {
        message: "Failed to fetch categories",
      },
    }
  }
}

// GET BY ID
export async function getCategoryById(
  id: string
) {
  try {
    const cookieStore = await cookies()

    const res = await fetch(
      `${API_URL}/categories/${id}`,
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
  } catch (err) {
    return {
      data: null,
      error: {
        message:
          "Failed to fetch category by ID",
      },
    }
  }
}

// DELETE
export async function deleteCategory(
  categoryId: string
) {
  try {
    const cookieStore = await cookies()

    const res = await fetch(
      `${API_URL}/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    )

    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => null)

      throw new Error(
        error?.message ||
          "Failed to delete category"
      )
    }

    return await res.json()
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message,
      },
    }
  }
}