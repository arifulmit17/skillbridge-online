
import { ProfilepageTutor } from '@/components/modules/pages/ProfilepageTutor';
import TutorProfile from '@/components/modules/pages/TutorProfile';

import { categoriesService } from '@/services/categories.service';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service'
import React from 'react'

export default   async function profile() {
    const {data:user}=await userService?.getSession()
    const  myId=user?.session?.userId;
    const {data:tutor}=await tutorService?.getTutorByUserId(myId);
    const tutorres=tutor
    //  console.log(tutorres);
    const {data:category}=await categoriesService?.getAllCategories();
    const categoryList=await category?.json();
    
  return (
    <div>
         {tutor ? <TutorProfile userId={myId} tutor={tutorres}></TutorProfile>:
        <ProfilepageTutor userId={myId} categories={categoryList}></ProfilepageTutor>}
        
        
    </div>
  )
}
