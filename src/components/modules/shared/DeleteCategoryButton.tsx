"use client"

import { Button } from "@/components/ui/button"
import { categoriesService } from "@/services/categories.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    )

    if (!confirmed) return

    try {
      await categoriesService.deleteCategory(categoryId)
      toast.success("Category deleted successfully")
      router.refresh()
    } catch (error) {
      // console.error(error)
      toast.error("Failed to delete category")
    }
  }

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      variant="outline"
      className="text-red-600 border-red-200 hover:bg-red-50"
    >
      Delete
    </Button>
  )
}
