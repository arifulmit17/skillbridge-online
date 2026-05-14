



import { UpdateSlotData } from "@/types/slot.type"

import { env } from "process"


const API_URL=env.API_URL

export const availabilityService={
    createSlot: async function (tutorId:string,dayOfWeek:string) {
        try{
            const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slots/`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include",
                body:JSON.stringify({tutorId,dayOfWeek})
            })
            const data=await res.json()
            return { data, error: null }
        } catch (error) {
            console.error("Error creating slot:", error)
            return { data: null, error }
        }
    },
    getAllSlots: async function () { 
        
        const data=await fetch(`${API_URL}/slots/`,{
           credentials: "include",
        cache:'no-store',
        }
           )
       return {data:data,error:null}
    },

   updateSlot: async function (slotId:string,data:UpdateSlotData ) {
    //    console.log("data: ",data,"session id:",slotId);
       
       const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/slots/${slotId}`,
       {
         method: "PATCH", // or PUT if your backend uses PUT
         headers: {
           
           "Content-Type": "application/json",
           
         },
          credentials: "include",
         body: JSON.stringify(data),
       }
     )
     
     if (!res.ok) {
       const error = await res.json().catch(() => null)
       throw new Error(error?.message || "Failed to update slot")
     }
     
   
     return res.json()
   }


}