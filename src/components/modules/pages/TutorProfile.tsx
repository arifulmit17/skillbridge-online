import Link from "next/link"
import UpdateUserProfile from "../shared/UpdateUserProfile"
import { userService } from "@/services/user.service"
import { getUser } from "@/services/auth.service"




type TutorProfile = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
  createdAt?: string
  user: {
    name: string
    email: string
    image: string
    role: string
    status: string
  }
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function Badge({
  label,
  highlight,
}: {
  label: string
  highlight?: boolean
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        highlight
          ? "bg-yellow-100 text-yellow-700"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {label}
    </span>
  )
}


export default async function TutorProfilePage({
  tutor,
  userId,
}: {
  tutor: TutorProfile,
  userId?: string
}) {
    
      const {data:user}=await getUser()
      // console.log(user.user.name,tutor?.user.name);

  return (
    <div className="min-h-screen bg-muted/30">
  {/* Hero Section */}
  <section className="bg-background border-b">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        <div className="flex-1">
          <h1 className="text-3xl font-bold capitalize text-foreground">
            {tutor?.user.name}
          </h1>

          <p className="mt-1 text-muted-foreground">
            {tutor?.subject} Tutor
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Badge label={`$${tutor?.price}/hour`} />
            <Badge label={tutor?.status} />
            {tutor?.isFeatured && (
              <Badge label="⭐ Featured Tutor" highlight />
            )}
          </div>
        </div>

        <Link
          href={"/sessions"}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition"
        >
          Book a Session
        </Link>
      </div>
    </div>
  </section>

  {/* Content */}
  <section className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3">
    
    {/* Left column */}
    <div className="md:col-span-2 space-y-8">
      <div className="rounded-2xl border bg-card text-card-foreground p-6" >
        <h1 className="text-xl font-bold">About the Tutor</h1>
        <p className="text-sm bg-card leading-relaxed text-card-foreground">
          {tutor?.user?.name} is a professional {tutor?.subject} tutor,
          offering structured and student-focused lessons tailored to
          individual needs.
        </p>
      </div>

      <div className="rounded-2xl border bg-card text-card-foreground p-6">
        <h2 className="text-lg font-semibold">Teaching Details</h2>
        <h2 className="text-sm font-semibold">
  Subject: {tutor?.subject}
</h2>

<h2 className="text-sm font-semibold">
  Hourly Rate: ${tutor?.price}
</h2>
      </div>
    </div>

    {/* Right column */}
    <div className="space-y-6 ">
      <div className="p-4 rounded-xl border bg-card shadow-sm">
  <h2 className="text-xl font-semibold mb-3">
    Contact Information
  </h2>

  <h2 className="text-lg">
    <span className="font-medium text-muted-foreground">Email:</span>{" "}
    {tutor?.user.email}
  </h2>

  <h2 className="text-lg">
    <span className="font-medium text-muted-foreground">Account Status:</span>{" "}
    {tutor?.status}
  </h2>
</div>

      {user?.user.name === tutor?.user.name && (
        <div className="rounded-2xl border bg-card text-card-foreground p-6">
          <UpdateUserProfile userId={userId} />
        </div>
      )}
    </div>
  </section>
</div>
  )
}
