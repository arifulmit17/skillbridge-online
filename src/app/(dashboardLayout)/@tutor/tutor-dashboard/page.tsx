export const dynamic = "force-dynamic"
import { redirect } from "next/navigation";


export default function TutorDashboard() {
  redirect("/tutor-dashboard/tutorprofile");
  return(
    <div>
      <h1>This is tutor dashboard</h1>
    </div>
  )
    
  
}