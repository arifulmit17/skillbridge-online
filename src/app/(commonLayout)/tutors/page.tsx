"use client"

import TutorCard from "@/components/modules/Cards/TutorCard"
import React, {
  useState,
  useMemo,
  useEffect,
} from "react"

type Tutor = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
  createdAt: string
  user: {
    name: string
    email: string
    image: string
  }
  category: {
    name: string
  }
  reviews: {
    rating: number
    comment: string
  }[]
}

const ITEMS_PER_PAGE = 2

export default function TutorPage() {
  const [allTutors, setAllTutors] =
    useState<Tutor[]>([])

  const [selectedCategory, setSelectedCategory] =
    useState("all")

  const [featuredFilter, setFeaturedFilter] =
    useState<
      "all" | "featured" | "non-featured"
    >("all")

  const [sortOrder, setSortOrder] =
    useState<"newest" | "oldest">(
      "newest"
    )

  const [searchTerm, setSearchTerm] =
    useState("")

  const [currentPage, setCurrentPage] =
    useState(1)

  // FETCH TUTORS
  useEffect(() => {
    async function fetchTutors() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors`
        )

        const tutorsData = await res.json()

        setAllTutors(tutorsData)
      } catch (error) {
        console.error(
          "Error fetching tutors:",
          error
        )
      }
    }

    fetchTutors()
  }, [])

  // CATEGORY LIST
  const categories = Array.from(
    new Set(
      allTutors
        ?.map((t) => t.category?.name)
        .filter(Boolean)
    )
  )

  // FILTER + SEARCH
  const filteredTutors = useMemo(() => {
    let result = [...allTutors]

    // SEARCH
    if (searchTerm.trim()) {
      const term =
        searchTerm.toLowerCase()

      result = result.filter(
        (tutor) =>
          tutor.subject
            ?.toLowerCase()
            .includes(term) ||
          tutor.user?.name
            ?.toLowerCase()
            .includes(term) ||
          tutor.category?.name
            ?.toLowerCase()
            .includes(term)
      )
    }

    // CATEGORY FILTER
    if (selectedCategory !== "all") {
      result = result.filter(
        (t) =>
          t.category?.name ===
          selectedCategory
      )
    }

    // FEATURED FILTER
    if (featuredFilter === "featured") {
      result = result.filter(
        (t) => t.isFeatured
      )
    }

    if (
      featuredFilter === "non-featured"
    ) {
      result = result.filter(
        (t) => !t.isFeatured
      )
    }

    return result
  }, [
    allTutors,
    searchTerm,
    selectedCategory,
    featuredFilter,
  ])

  // SORT
  const sortedTutors = useMemo(() => {
    const sorted = [...filteredTutors]

    return sorted.sort((a, b) => {
      const dateA = new Date(
        a.createdAt
      ).getTime()

      const dateB = new Date(
        b.createdAt
      ).getTime()

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB
    })
  }, [filteredTutors, sortOrder])

  // PAGINATION
  const totalPages = Math.ceil(
    sortedTutors.length /
      ITEMS_PER_PAGE
  )

  const paginatedTutors =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        ITEMS_PER_PAGE

      return sortedTutors.slice(
        start,
        start + ITEMS_PER_PAGE
      )
    }, [sortedTutors, currentPage])

  return (
    <div className="flex flex-col gap-10">

      {/* SEARCH + FILTERS */}
      <div className="w-11/12 mx-auto flex gap-4 items-center flex-wrap">

        {/* SEARCH */}
       <div className="w-11/12 mx-auto">
  <form
    onSubmit={(e) => {
      e.preventDefault()
      setCurrentPage(1)
    }}
    className="flex w-full gap-3"
  >
    <input
      type="text"
      placeholder="Search tutors by name, subject, category..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="flex-1 my-5 rounded-md border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="submit"
      className="rounded-md h-1/2 my-auto bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/80 transition"
    >
      Search
    </button>
  </form>
</div>

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(
              e.target.value
            )
            setCurrentPage(1)
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        {/* FEATURED */}
        <select
          value={featuredFilter}
          onChange={(e) => {
            setFeaturedFilter(
              e.target.value as any
            )

            setCurrentPage(1)
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="all">
            All Tutors
          </option>

          <option value="featured">
            Featured Only
          </option>

          <option value="non-featured">
            Non Featured
          </option>
        </select>

        {/* SORT */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(
              e.target.value as
                | "newest"
                | "oldest"
            )

            setCurrentPage(1)
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="newest">
            Newest first
          </option>

          <option value="oldest">
            Oldest first
          </option>
        </select>
      </div>

      {/* GRID */}
      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {paginatedTutors.length >
        0 ? (
          paginatedTutors.map(
            (tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
              />
            )
          )
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <p className="text-lg font-medium">
              No tutors available
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 0 && (
        <div className="flex justify-center gap-2 pb-10">
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.max(
                  p - 1,
                  1
                )
              )
            }
            disabled={
              currentPage === 1
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() =>
                setCurrentPage(page)
              }
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(
                  p + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}