"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { availabilityService } from "@/services/availability.service"

export default function CreateSlotButton({ tutorId }: { tutorId: string }) {
  const [dayOfWeek, setDayOfWeek] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDayOfWeek(e.target.value)
  }

  const handleCreate = async () => {
    if (!dayOfWeek) return toast.warning("Please select a weekday",{ position: "top-center" })

    try {
      setLoading(true)

      // 
      const res = await availabilityService.createSlot(tutorId, dayOfWeek)
      
      const data = res

      // if (!res.ok) {
      //   toast.error(data.message || "Failed to create slot",{ position: "top-center" })
      // }

      toast.success("Availability added successfully",{ position: "top-center" })
      setDayOfWeek("")
    } catch (err) {
      // console.error(err)
      toast.error("Something went wrong",{ position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <label className="text-sm font-medium">Select Weekday</label>

      <select
        value={dayOfWeek}
        onChange={handleSelect}
        className="border bg-card rounded-md px-3 py-2"
      >
        <option value="" disabled>
          Choose a day
        </option>
        <option value="MONDAY">Monday</option>
        <option value="TUESDAY">Tuesday</option>
        <option value="WEDNESDAY">Wednesday</option>
        <option value="THURSDAY">Thursday</option>
        <option value="FRIDAY">Friday</option>
        <option value="SATURDAY">Saturday</option>
        <option value="SUNDAY">Sunday</option>
      </select>

      <Button onClick={handleCreate} disabled={loading}>
        {loading ? "Saving..." : "Add Availability"}
      </Button>
    </div>
  )
}
