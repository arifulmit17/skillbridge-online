"use client";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


export default function LogoutButton() {
    const handleLogout = async () => {
    // BetterAuth has been removed. Implement your custom logout logic here.
    toast.success("Logged out successfully")
    window.location.href = "/login";
}
  return (
    <div>
       <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
    </div>
  )
}
