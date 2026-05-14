"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function CategoryUpdatePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
          {
      credentials: "include", 
    }
        )

        if (!res.ok) throw new Error("Failed to fetch category")

        const data = await res.json()
        setName(data.name)
      } catch (err:any) {
        setError(err.message)
      } finally {
        setInitialLoading(false)
      }
    }

    fetchCategory()
  }, [id])

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
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      )

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.message || "Failed to update category")
      }

      toast.success("Category updated successfully")
      router.push("/admin-dashboard/categories")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return <p className="text-sm text-muted-foreground">Loading category...</p>
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
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
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
