export const dynamic = "force-dynamic"
import { CategoryCard } from '@/components/modules/Cards/CategoryCard';
import CategoryCreatePage from '@/components/modules/pages/CategoryCreatePage';
import { categoriesService } from '@/services/categories.service'

type   category= {
    id: string
    name: string
    _count: {
      tutors: number
      bookings: number
    
  }
}

export default async function Categorypage() {
    const {data}=await categoriesService?.getAllCategories()
    const categoryList=await data?.json();
    // console?.log(categoryList);
  return (
    <div className="space-y-4">
    <h2 className="text-lg font-semibold">Categories</h2>

    <div className="w-11/12 grid grid-cols-3 gap-5">
          {categoryList?.length > 0 ? (
            categoryList?.map((category) => (
              <CategoryCard key={category?.id} category={category} />
            ))
          ) : (
            <p className="col-span-3 text-center text-muted-foreground">
              No categories found
            </p>
          )}
        </div>

    <div>
        <h2 className="text-lg font-semibold">Create Categories</h2>
        <CategoryCreatePage></CategoryCreatePage>
    </div>
  </div>
  )
}
