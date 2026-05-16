
import { ProfilepageTutor } from '@/components/modules/pages/ProfilepageTutor';
import TutorProfile from '@/components/modules/pages/TutorProfile';
import { getUser } from '@/services/auth.service';
import { getAllCategories } from '@/services/categories.service';


import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service'
import React from 'react'

export default   async function profile() {
    const user=await getUser()
    console.log(user);
    const  myId=user?.id;
    const {data:tutor}=await tutorService?.getTutorByUserId(myId);
    const tutorres=tutor
    //  console.log(tutorres);
    const {data:category}=await getAllCategories();
    const categoryList= category;
    
  return (
    <div>
         {tutor ? <TutorProfile userId={myId} tutor={tutorres}></TutorProfile>:
        <ProfilepageTutor userId={myId} categories={categoryList}></ProfilepageTutor>}
        
        
    </div>
  )
}
