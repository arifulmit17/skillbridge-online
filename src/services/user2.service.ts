import { UpdateUserData } from "@/types/users.type"
import { env } from "process"
const API_URL=env.API_URL
export const userService2={

updateUser: async function (userId:string,data:UpdateUserData ) {
     
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
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
    throw new Error(error?.message || "Failed to update user")
  }

  return res.json()
},
getAllUser: async function () {
    try{
       
      const res=await fetch(`${API_URL}/users`,{
        headers:{
    credentials: "include",
  },
      })
      const userdata=await res.json()

 return {data:userdata,error:null}

    }
    catch(err){
        // console.log(err);
        return {data:null,error:{message:"Failed to fetch users"}}
    }
},
}