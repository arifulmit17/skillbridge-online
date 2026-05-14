"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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

import { loginUser } from "@/services/auth.service"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })

  // Demo Student Login
  const handleStudentLogin = async () => {
    setEmail("kamal@gmail.com")
    setPassword("password1234")
  }

  // Demo Tutor Login
  const handleTutorLogin = async () => {
    setEmail("mehrab@gmail.com")
    setPassword("password1234")
  }

  // Demo Admin Login
  const handleAdminLogin = async () => {
    setEmail("jamal@gmail.com")
    setPassword("admin1234")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setError(null)

    const result = loginSchema.safeParse({
      email,
      password,
    })

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })

      return
    }

    setLoading(true)

    try {
      const res = await loginUser(result.data)

      const data = res

      if (!data.success) {
        setError(data.message)
        toast.error(data.message || "Login failed")
        return
      }

      toast.success("Login successful")

      window.location.href = "/"
    } catch (err) {
      console.log(err)

      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Login to your account
          </CardTitle>

          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </Field>

              {error && (
                <FieldDescription className="text-center text-red-500">
                  {error}
                </FieldDescription>
              )}

              <Field className="space-y-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>

          {/* Demo Accounts */}
          <div className="flex flex-col gap-4 pt-6">
            <Button 
              onClick={handleStudentLogin}
              disabled={loading}
              
              className="w-full "
            >
              Demo Student Login
            </Button>

            <Button
              onClick={handleTutorLogin}
              disabled={loading}
              
              className="w-full"
            >
              Demo Tutor Login
            </Button>

            <Button
              onClick={handleAdminLogin}
              disabled={loading}
             
              className="w-full"
            >
              Demo Admin Login
            </Button>

            <p className="text-center text-sm text-gray-400">
              Click a demo button to autofill credentials,
              then press Login.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}