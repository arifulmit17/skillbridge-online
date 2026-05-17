"use client"

import TutorCard from "@/components/modules/Cards/TutorCard"
import SearchFormCustom from "@/components/modules/shared/SearchFormCustom"
import React, { useState, useMemo } from "react"

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

const ITEMS_PER_PAGE = 4

export default function TutorPage() {
  const [allTutors, setAllTutors] = useState<Tutor[]>([])
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [featuredFilter, setFeaturedFilter] =
    useState<"all" | "featured" | "non-featured">("all")

  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest"
  >("newest")

  const [currentPage, setCurrentPage] = useState(1)

  const categories = Array.from(
    new Set(
      allTutors
        ?.map((t) => t.category?.name)
        .filter(Boolean)
    )
  )

  // APPLY CATEGORY + FEATURED FILTER TOGETHER
  const filteredTutors = useMemo(() => {
    let result = [...allTutors]

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
        (t) => t.isFeatured === true
      )
    }

    if (
      featuredFilter === "non-featured"
    ) {
      result = result.filter(
        (t) => t.isFeatured === false
      )
    }

    return result
  }, [allTutors, selectedCategory, featuredFilter])

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
    sortedTutors.length / ITEMS_PER_PAGE
  )

  const paginatedTutors = useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE

    return sortedTutors.slice(
      start,
      start + ITEMS_PER_PAGE
    )
  }, [sortedTutors, currentPage])

  return (
    <div className="flex flex-col gap-10">

      {/* SEARCH */}
      <SearchFormCustom
        onResults={(results: Tutor[]) => {
          setAllTutors(results)
          setTutors(results)
          setCurrentPage(1)
        }}
      />

      {/* FILTERS */}
      <div className="w-11/12 mx-auto flex gap-4 items-center flex-wrap">

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            setCurrentPage(1)
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="all">
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* FEATURED FILTER */}
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
        {paginatedTutors.length > 0 ? (
          paginatedTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
            />
          ))
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
                Math.max(p - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from(
            { length: totalPages },
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
                Math.min(p + 1, totalPages)
              )
            }
            disabled={
              currentPage === totalPages
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