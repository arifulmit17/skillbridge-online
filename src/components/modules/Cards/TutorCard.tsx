import Image from "next/image"
import Link from "next/link"

type Tutor = {
  id: string
  subject: string
  price: string
  isFeatured: boolean
  status: "ACTIVE" | "INACTIVE"
  user: {
    name: string
    email: string
    image: string
  }
  category: {
    name: string
  }
  reviews: {
    rating: number
    comment: string
  }[]
}

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
<div className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
  {/* Featured glow */}
  {tutor?.isFeatured && (
    <div className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-white shadow">
      ⭐ Featured
    </div>
  )}

  {/* Header */}
  <div className="flex items-center gap-4">
    {/* Avatar */}
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-sm font-bold text-primary">
      {tutor?.user?.name?.charAt(0) || "T"}
    </div>

    <div className="flex-1">
      <h3 className="text-lg font-semibold leading-tight capitalize">
        {tutor?.user?.name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {tutor?.subject} · {tutor?.category.name}
      </p>
    </div>
  </div>

  {/* Divider */}
  <div className="my-4 h-px bg-muted" />

  {/* Body */}
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Hourly Rate
      </p>
      <p className="text-2xl font-bold">
        ${tutor?.price}
        <span className="text-sm font-medium text-muted-foreground"> / hr</span>
      </p>
    </div>

    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        tutor?.status === "ACTIVE"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {tutor?.status}
    </span>
  </div>

  {/* Footer */}
  <div className="mt-5 flex items-center justify-between">
    <span className="text-sm text-muted-foreground">
      {tutor?.reviews.length} reviews
    </span>

    <Link
      href={`/tutors/${tutor?.id}`}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      View Profile →
    </Link>
  </div>
</div>

  )
}
