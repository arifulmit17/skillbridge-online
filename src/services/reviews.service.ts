"use server"

import { cookies } from "next/headers"

const API_URL = process.env.API_URL

interface GetReviewParams {
  tutorId: string
}

// GET REVIEWS BY TUTOR ID
export async function getReviewsByTutorId(
  params?: GetReviewParams
) {
  try {
    const cookieStore =await cookies()

    const url = new URL(
      `${API_URL}/reviews/tutor`
    )

    if (params?.tutorId) {
      url.searchParams.append(
        "id",
        params.tutorId
      )
    }

    const res = await fetch(
      url.toString(),
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
          "Failed to fetch tutor reviews",
      },
    }
  }
}

// GET ALL REVIEWS
export async function getAllReviews() {
  try {
    const cookieStore =await cookies()

    const res = await fetch(
      `${API_URL}/reviews`,
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
          "Failed to fetch reviews",
      },
    }
  }
}