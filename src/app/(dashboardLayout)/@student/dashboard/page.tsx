export const dynamic = "force-dynamic"
import Image from "next/image"
import { userService } from "@/services/user.service";
import UpdateUserProfile from "@/components/modules/shared/UpdateUserProfile";
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



export default async function ProfilePage() {
  const {data} = await userService.getSession()
  const user=data?.user
  return (
   <div className="min-h-screen bg-background flex items-center justify-center px-4 ">
  <div className="w-full max-w-3xl bg-card text-card-foreground rounded-2xl shadow-md border border-border p-8">
    
    {/* Header */}
    <div className="flex items-center gap-6 border-b border-border pb-6">
      
      {/* Avatar */}
      <div className="relative h-24 w-24 rounded-full overflow-hidden bg-muted flex items-center justify-center text-3xl font-semibold text-primary">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-primary">
            {user?.name?.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {user?.name}
        </h1>

        <p className="text-muted-foreground">
          {user?.email}
        </p>

        <div className="mt-2 flex gap-2">
          
          {/* Role */}
          <span className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">
            {user?.role}
          </span>

          {/* Status */}
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              user?.status === "Unbanned"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {user?.status}
          </span>
        </div>
      </div>
    </div>

    {/* Details */}
    <div className="mt-6 grid grid-cols-1 text-secondary-foreground sm:grid-cols-2 gap-6">
      <div className="text-primary">
  <Info label="User ID" value={user?.id} />
</div>

      <Info
        label="Email Verified"
        value={user?.emailVerified ? "Yes" : "No"}
      />

      <Info
        label="Joined"
        value={new Date(user?.createdAt).toLocaleDateString()}
      />
    </div>

    {/* Update section */}
    <div className="my-10 text-muted-foreground">
      If you want to update your profile:
    </div>

    <UpdateUserProfile userId={user?.id} />
  </div>
</div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-primary break-all">{value}</p>
    </div>
  )
}






