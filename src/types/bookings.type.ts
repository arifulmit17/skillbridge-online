export type UpdateSessionData = {
  studentId?:string
  status?: "PENDING" | "COMPLETED" | "CANCELLED"
  startTime?: string // ISO date string
  endTime?: string 
}