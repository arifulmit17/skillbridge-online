"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { userService2 } from "@/services/user2.service"
import { UpdateUserData } from "@/types/users.type"
import { toast } from "sonner"

const handleUpdate = async (
  userId: string,
  userdata: UpdateUserData
) => {
  toast(`Updating user with ID: ${userId}` )

  const data = await userService2.updateUser(userId, userdata)
  // console.log(data);
  if (data) {
    toast.success("User updated successfully")
  }

  if (data.error) {
    toast.error("Failed to update user:", data.error)
  }
}

export default function UpdateUserProfile({ userId }: { userId: string }) {
  const [name, setName] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: UpdateUserData = {}

if (name.trim()) {
  payload.name = name
}

payload.emailVerified = emailVerified


    const res= await handleUpdate(userId, payload)
    
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-1/3 flex flex-col gap-4"
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          className="border rounded-md px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      

      {/* Email Verified */}
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={emailVerified}
          onChange={(e) => setEmailVerified(e.target.checked)}
        />
        Email Verified
      </label>

      <Button type="submit">
        Update User
      </Button>
    </form>
  )
}
