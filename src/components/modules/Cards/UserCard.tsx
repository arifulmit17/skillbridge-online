import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import BanButton from "../shared/BanButton"

type User = {
  id: string
  name: string
  email: string
  image?: string
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
}

export function UserCard({ user }: { user: User }) {
  return (
   <Card className="max-w-md rounded-2xl border shadow-sm transition hover:shadow-md">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      {/* Avatar placeholder */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
        {user?.name?.charAt(0) || "U"}
      </div>

      {/* User Info */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold leading-tight">
          {user?.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {user?.email}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="secondary">{user?.role}</Badge>

          <Badge
            variant={user?.status === "Unbanned" ? "default" : "destructive"}
          >
            {user?.status}
          </Badge>

          {user?.emailVerified ? (
            <Badge variant="outline">Email Verified</Badge>
          ) : (
            <Badge variant="outline" className="text-yellow-600 border-yellow-400">
              Email Not Verified
            </Badge>
          )}
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-4 flex justify-end">
      <BanButton userId={user?.id} />
    </div>
  </CardContent>
</Card>

  )
}
