export type UpdateUserData = {
  userId?:string
  status?: "Unbanned" | "Banned" 
  role?:string
  name?:string
  emailVerified?:boolean
}