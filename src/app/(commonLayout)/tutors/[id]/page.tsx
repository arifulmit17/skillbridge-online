import TutorProfilePage from '@/components/modules/pages/TutorProfile'
import { tutorService } from '@/services/tutor.service'
import React from 'react'

export default async function Tutorpage({ params }: { params: Promise<{ id: string }> }) {
    const {id}=await params
    const data=await tutorService.getTutorById(id)
    console.log(data);
    
  return (
    <div>
  {data?.data ? (
    <TutorProfilePage  tutor={data.data} />
  ) : (
    <div className="text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">No tutor data available</p>
      <p className="text-sm">Please select a tutor to view their profile.</p>
    </div>
  )}
</div>

  )
}
