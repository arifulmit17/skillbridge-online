import CreateSlotButton from '@/components/modules/shared/createSlotButton';
import { availabilityService } from '@/services/availability.service'
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';


type AvailabilitySlot = {
  id: string
  tutorId: string
  dayOfWeek: string
  isAvailable: boolean
  createdAt: string
}


export default async function Availability() {
  const { data } = await availabilityService?.getAllSlots()
  const slots = await data?.json()
  // console.log(slots);
  const { data: user } = await userService?.getSession()
  const myId = user?.session?.userId
  const {data:tutor}=await tutorService?.getTutorByUserId(myId);
  // console.log("tutor is here ",tutor.data.id);
  
// const mySlots=slots.filter((slot: AvailabilitySlot)=>slot?.tutorId===tutor?.id);

const mySlots = slots?.data.filter((slot: AvailabilitySlot) => {
  // console.log("checking slot:", slot);
  // console.log("slot.tutorId:", slot?.tutorId);
  // console.log("tutor.id:", tutor?.id);
  return slot?.tutorId === tutor?.id;
});

// console.log(slots);
  return (
    <div className="w-11/12 mx-auto flex flex-col gap-6">
      
      {/* Create slot */}
      <CreateSlotButton tutorId={tutor?.id} />

      {/* Slots list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mySlots?.length > 0 ? (
          mySlots?.map((slot: AvailabilitySlot) => (
            <div
              key={slot?.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{slot?.dayOfWeek}</p>
                <p className="text-sm text-muted-foreground">
                  Status: {slot?.isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">
            No availability slots added yet.
          </p>
        )}
      </div>

    </div>
  )
}

