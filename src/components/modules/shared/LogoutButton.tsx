"use client";
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/services/auth.service';
import { toast } from 'sonner';


export default function LogoutButton() {
    const handleLogout = async () => {
    const res = await logoutUser();
    if (!res.success) {
      toast.error("Logout failed");
      return;
    }
    toast.success("Logged out successfully")
    window.location.href = "/login";
}
  return (
    <div>
       <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
    </div>
  )
}
