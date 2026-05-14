"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function SearchFormCustom({
  onResults,
}: {
  onResults: (data: any[]) => void
}) {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const params = new URLSearchParams()
    if (search) params.append("search", search)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors?${params.toString()}`,
  {
credentials: "include",
  })

    const data = await res.json()
    onResults(data)

    setLoading(false)
  }

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >
          <Input
            placeholder="Search by subject (e.g. English)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
