
import { UpdateSessionData } from "@/types/bookings.type"
import { env } from "process"

const API_URL=env.API_URL


export const bookingService={
    getAllSessions: async function () {         
        const data=await fetch(`${API_URL}/teachingsessions/`,{
            cache:'no-store'
        })
       return {data:data,error:null}
    },
    deleteSession: async function (id:string) { 
      // console.log(id);     
        try{
            const data=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teachingsessions/${id}`,{
             credentials: "include",
                method:"DELETE"
            })
           return {data:data,error:null}
        }
        catch(err){
            // console.log(err);
            return {data:null,error:{message:"Failed to delete session"}}
        }
},


updateSession: async function (sessionId:string,data:UpdateSessionData ) {
    // console.log("data: ",data,"session id:",sessionId);
    
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teachingsessions/${sessionId}`,
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
    throw new Error(error?.message || "Failed to update session")
  }
  

  return res.json()
}
 
}