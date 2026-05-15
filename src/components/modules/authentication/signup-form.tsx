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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import { z } from "zod"

import { signupUser } from "@/services/auth.service"

export function SignupForm(
  props: React.ComponentProps<typeof Card>
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    image: "",
  })

  const signupSchema = z
    .object({
      name: z
        .string()
        .min(
          2,
          "Name must be at least 2 characters"
        ),

      email: z
        .string()
        .email("Invalid email address"),

      password: z
        .string()
        .min(
          8,
          "Password must be at least 8 characters"
        ),

      confirmPassword: z.string(),

      role: z.enum([
        "student",
        "tutor",
      ]),

      image: z
        .string()
        .url("Image must be a valid URL")
        .optional()
        .or(z.literal("")),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    )

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const result =
      signupSchema.safeParse(formData)

    if (!result.success) {
      result.error.issues.forEach(
        (issue) => {
          toast.error(issue.message)
        }
      )

      return
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      image:
        formData.image || undefined,
    }

    try {
      const { data } =
        await signupUser(payload)

      if (data) {
        toast.success(
          "Signup successful"
        )

        window.location.href = "/"
      }
    } catch (error) {
      console.log(error)

      toast.error(
        "Signup not successful. Please try again."
      )
    }
  }

  return (
    <Card {...props} className="max-w-md w-full mx-auto shadow-lg rounded-2xl">
  <CardHeader className="space-y-1 text-center">
    <CardTitle className="text-2xl font-semibold">
      Create your account
    </CardTitle>

    <CardDescription className="text-sm text-muted-foreground">
      Join us by entering your details below
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Full Name */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={handleChange}
          className="bg-card rounded-md border px-3 py-2 text-sm"
        />
      </Field>

      {/* Email */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleChange}
          className="bg-card rounded-md border px-3 py-2 text-sm"
        />
      </Field>

      {/* Password */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <FieldDescription>
          Must contain at least 8 characters
        </FieldDescription>
      </Field>

      {/* Confirm Password */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="confirmPassword">
          Confirm Password
        </FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </Field>

      {/* Role */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="role">Account Type</FieldLabel>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
      </Field>

      {/* Image */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="image">Profile Image (optional)</FieldLabel>
        <Input
          id="image"
          name="image"
          placeholder="https://example.com/photo.jpg"
          value={formData.image}
          onChange={handleChange}
        />
        <FieldDescription>
          You can add this later as well
        </FieldDescription>
      </Field>

      {/* Submit */}
      <Button type="submit" className="w-full h-11 text-sm font-medium">
        Create Account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Sign in
        </a>
      </p>
    </form>
  </CardContent>
</Card>
  )
}