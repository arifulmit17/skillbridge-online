
import { env } from "process"

const API_URL=env.API_URL

interface GetReviewParams{
    tutorId:string
}

export const reviewsService = {
    getReviewsByTutorId: async function (params?: GetReviewParams) {
        // console.log(params?.tutorId);
        
        const url= new URL(`${API_URL}/reviews/tutor/`);
        
        if (params?.tutorId) {
            url.searchParams.append('id', params.tutorId);
          }
        //   console.log(url);
        const data=await fetch(url.toString(),{
             credentials: "include",
            cache:'no-store'
        })
       return {data:data,error:null}
    },
    getAllReviews: async function () {
              
        const data=await fetch(`${API_URL}/reviews/`,{
             credentials: "include",
            cache:'no-store'
        })
       return {data:data,error:null}
    }
}