import { env } from "@/env";

const API_URL=env.API_URL


interface GetTutorParams {
  isFeatured?: boolean;
  search?: string;
  userId?: string;
}
export const tutorService={
    
    getTutor: async function(params?: GetTutorParams){
        try{
             const url = new URL(`${API_URL}/tutors`);
             

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      
           

 const res=await fetch(`${url.toString()}`,{
  cache:'no-store'
 })
  
  
 const data=await res.json()
//  console.log("Home page session:",session);
 return {data:data,error:null}
        }
    catch(err){
        // console.log(err);
        return {data:null,error:{message:"Failed to fetch tutor data"}}
    }
},

getTutorById : async function(id:string){
    try{
         
         const res=await fetch(`${API_URL}/tutors/${id}`,{
            credentials: "include",
         })
         const data=await res.json()
        //  console.log(data);
//  console.log("Home page session:",session);
 return {data:data,error:null}
    }
    catch(err){
        // console.log(err);
        return {data:null,error:{message:"Failed to fetch tutor by ID"}}
    }
},
getTutorByUserId : async function(id:string){
    try{
        
        const url= new URL(`${API_URL}/tutors/user/?id=${id}`);
        
         const res=await fetch(url.toString(),{
            credentials: "include",
         })
        
         if (!res.ok) {
  throw new Error(`Request failed with status ${res.status}`)
}
         const data=await res.json()
        
//  console.log("Home page session:",session);
 return {data:data,error:null}
    }
    catch(err){
        // console.log(err);
        return {data:null,error:{message:"Failed to fetch tutor by user ID"}}
    }
}
}

