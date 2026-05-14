"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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


type Category = {
  id: string
  name: string
}

export  function ProfilepageTutor({
  userId,
  categories,
}: {
  userId: string
  categories: Category[]
}) {
  const [formData, setFormData] = useState({
    categoryId: "",
    subject: "",
    price: "",
    isFeatured: false,
    status: "ACTIVE",
  })

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
  }

  const  handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      userId,
      ...formData,
    }

    // console.log("Tutor profile payload:", payload)

    try{
            const res=await fetch(`${NEXT_PUBLIC_API_URL}/tutors`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: "include",
                body:JSON.stringify(payload)
            })
            if(res.ok){
              toast.success("Tutor profile created successfully")
            }
            const data=await res.json()
            return {data:data,error:null}
        }
        catch(err){
            toast.error(err);
            return {data:null,error:{message:"Failed to create tutor"}}
        }
     
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Create Tutor Profile</CardTitle>
        <CardDescription>
          Set up your tutor profile so students can find you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Subject */}
            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                placeholder="English"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Field>

            {/* Price */}
            <Field>
              <FieldLabel htmlFor="price">Hourly Price (Taka)</FieldLabel>
              <Input
                id="price"
                name="price"
                type="string"
                placeholder="Amount in Taka"
                required
                value={formData.price}
                onChange={handleChange}
              />
              <FieldDescription>
                Set your hourly tutoring rate.
              </FieldDescription>
            </Field>

            {/* Featured */}
<Field>
  <FieldLabel htmlFor="isFeatured">Feature Profile</FieldLabel>
  <select
    id="isFeatured"
    name="isFeatured"
    value={String(formData.isFeatured)}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        isFeatured: e.target.value === "true",
      }))
    }
    className="w-full rounded-md border px-3 py-2 text-sm"
  >
    <option value="false">No</option>
    <option value="true">Yes</option>
  </select>

  <FieldDescription>
    Featured tutors appear in featured tutors.
  </FieldDescription>
</Field>


            

            {/* Submit */}
            <Field>
              <Button type="submit" className="w-full mt-10">
                Create Profile
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

