import { categoriesService } from '@/services/categories.service';
import React from 'react'
import { CategoryCard2 } from '../Cards/CategoryCard2';


export default async function Categories() {
    const {data}=await categoriesService?.getAllCategories()
        const categoryList=await data?.json();
        
  return (
    <div className="w-11/12 grid-cols-1  grid lg:grid-cols-3 gap-5">
      {categoryList?.length > 0 ? (
        categoryList?.map((category) => (
          <CategoryCard2 key={category?.id} category={category} />
        ))
      ) : (
        <p className="col-span-3 text-center text-muted-foreground">
          No categories found
        </p>
      )}
    </div>
  )
}
