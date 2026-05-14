export const dynamic = "force-dynamic"
import { UserCard } from '@/components/modules/Cards/UserCard';
import { userService2 } from '@/services/user2.service';


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
export default async function AllUser() {
  const data=await userService2?.getAllUser()
  

  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
  {Array.isArray(data?.data) && data?.data?.length > 0 ? (
    data?.data?.map((user: User) => (
      <UserCard key={user?.id} user={user} />
    ))
  ) : (
    <p className="col-span-1 lg:col-span-2 text-center text-muted-foreground">
      No users found
    </p>
  )}
</div>

  )
}
