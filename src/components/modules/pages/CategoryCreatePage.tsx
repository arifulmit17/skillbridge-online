"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function CategoryCreatePage() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Category name is required")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      )

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.message || "Failed to create category")
      }

      setName("")
      toast.success("Category created successfully")
     
    }catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message)
  } else {
    setError("Something went wrong")
  }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category name (e.g. Math)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
