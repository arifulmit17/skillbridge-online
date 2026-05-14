import { SessionCreatePage } from '@/components/modules/pages/SessionCreatePage';
import { availabilityService } from '@/services/availability.service';
import { categoriesService } from '@/services/categories.service';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';

type User = {
  id: string
  name: string
  email: string
  image?: string
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
}
export default async function CreateSessionPage() {
    const {data:user}=await userService?.getSession()
        const  myId=user?.session?.userId;
        
        const {data:tutor}=await tutorService?.getTutorByUserId(myId);
        
        const {data:category}=await categoriesService?.getAllCategories();
        const {data:slot}=await availabilityService?.getAllSlots();
       
            const categoryList=await category?.json();
            const slotList=await slot?.json()
            //  const studentid="uvDEjuFHNU2cW4EIw9hD9LAQNGkgVwqt";
            // console.log(slotList);
  return (
    <div>
  {slotList?.data &&
  tutor?.id &&
  Array.isArray(categoryList) &&
  categoryList?.length > 0 ? (
    <SessionCreatePage
      slots={slotList?.data}
      tutorId={tutor?.id}
      categories={categoryList}
    />
  ) : (
    <div className="text-center py-10 text-muted-foreground">
      <p className="text-lg font-medium">Unable to create session</p>
      <p className="text-sm">
        Required data is missing. Please make sure tutor, categories, and
        availability slots are available.
      </p>
    </div>
  )}
</div>

  )
}
