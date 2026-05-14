"use client"
import TutorCard from '@/components/modules/Cards/TutorCard';
import GetAllTutor from '@/components/modules/shared/GetAllTutor';
import SearchFormCustom from '@/components/modules/shared/SearchFormCustom';
import { tutorService } from '@/services/tutor.service';


import React, { useState } from 'react'
type Tutor = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
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

export default function TutorPage() {
  
  const [allTutors, setAllTutors] = useState<Tutor[]>([])
const [tutors, setTutors] = useState<Tutor[]>([])
const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = Array.from(
  new Set(allTutors?.map((t) => t.category?.name).filter(Boolean))
)

  // console.log(tutors);
  return (
    
         <div className='flex flex-col gap-10 '>
            
          <div>
             <SearchFormCustom onResults={(results: Tutor[]) => {
    setAllTutors(results)
    setTutors(results)
  }}></SearchFormCustom>
          </div>
          <div className="w-11/12 mx-auto flex gap-4 items-center">
  <label className="text-sm font-medium">Filter by category:</label>

  <select
    value={selectedCategory}
    onChange={(e) => {
      const value = e.target.value
      setSelectedCategory(value)

      if (value === "all") {
        setTutors(allTutors)
      } else {
        setTutors(
          allTutors?.filter(
            (tutor) => tutor.category?.name === value
          )
        )
      }
    }}
    className="rounded-md border px-3 py-2 text-sm"
  >
    <option value="all">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

        <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
  {tutors.length > 0 ? (
    tutors?.map((tutor) => (
      <TutorCard key={tutor.id} tutor={tutor} />
    ))
  ) : (
    <div className="col-span-full text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No tutors available</p>
      <p className="text-sm">
        Please press search button and adjust your search or category filter.
      </p>
    </div>
  )}
</div>



         </div>
        
      
  )
}
