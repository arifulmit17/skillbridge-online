"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { env } from "@/env"
import { toast } from "sonner"

const NEXT_PUBLIC_API_URL=env.NEXT_PUBLIC_API_URL

type AvailabilitySlot = {
  id: string
  tutorId:string
  dayOfWeek: string
  isAvailable: boolean
  isBooked: boolean
}
type Category = {
  id: string
  name: string
}

type Tutor = {
  id: string
  name: string
}

export function SessionCreatePage({
  tutorId,
  studentId,
  categories,
  slots,
}: {
  tutorId: string
  studentId?: string
  categories: Category[]
  slots: AvailabilitySlot[]

}) {
    // BetterAuth has been removed. Use your custom session management here if needed.
    const availableSlots = slots?.filter(
  (slot) => slot.isAvailable && !slot.isBooked && slot.tutorId==tutorId
) ?? []
  const [formData, setFormData] = useState({
    categoryId: "",
    availabilitySlotId: "",
    startTime: "",
    endTime: "",
    status: "PENDING",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const  handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.availabilitySlotId) {
  alert("No availability slot selected.")
  return
}


    const payload = {
      tutorId,
      studentId,
      categoryId: formData.categoryId,
      availabilitySlotId: formData.availabilitySlotId,
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: formData.status,
    }

    // console.log("Booking payload:", payload)
     try{
            const res=await fetch(`${NEXT_PUBLIC_API_URL}/teachingsessions`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: "include",
                body:JSON.stringify(payload)
            })
            const data=await res.json()
            if(res.ok){
              toast.success("Session is created")
            }else{
              toast.error("Session creation failed")
            }
        }
        catch(err){
            toast.error(err);
            return {data:null,error:{message:"Failed to create session"}}
        }
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Create Session</CardTitle>
        <CardDescription>
          Book a tutoring session with your selected tutor.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Category */}
            <Field>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full bg-card rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Field>

            {/* set availability */}
            <Field>
  <FieldLabel htmlFor="availabilitySlotId">
    Availability Slot
  </FieldLabel>

  <select
    id="availabilitySlotId"
    name="availabilitySlotId"
    required
    disabled={availableSlots.length === 0}
    value={formData.availabilitySlotId}
    onChange={handleChange}
    className="w-full bg-card rounded-md border px-3 py-2 text-sm disabled:opacity-50"
  >
    <option value="">
      {availableSlots.length === 0
        ? "No available slots"
        : "Select a slot"}
    </option>

    {availableSlots.map((slot) => (
      <option key={slot.id} value={slot.id}>
        {slot.dayOfWeek}
      </option>
    ))}
  </select>

  <FieldDescription>
    {availableSlots.length === 0
      ? "This tutor has no available slots at the moment."
      : "Choose an available day for this tutor"}
  </FieldDescription>
</Field>


            {/* Start Time */}
            <Field>
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                required
                value={formData.startTime}
                onChange={handleChange}
              />
              <FieldDescription>
                Session start time
              </FieldDescription>
            </Field>

            {/* End Time */}
            <Field>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                required
                value={formData.endTime}
                onChange={handleChange}
              />
              <FieldDescription>
                Session end time
              </FieldDescription>
            </Field>

            {/* Status */}
            <Field>
              <FieldLabel htmlFor="status">Session Status</FieldLabel>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-card rounded-md border px-3 py-2 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </Field>

            {/* Submit */}
            <Button
  type="submit"
  className="w-full mt-6"
  disabled={availableSlots.length === 0}
>
  Create Session
</Button>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
