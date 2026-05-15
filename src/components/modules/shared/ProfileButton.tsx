"use client";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";


export default function ProfileButton({ session }) {
  const router = useRouter();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex px-5 items-center gap-2 rounded-xl text-white bg-primary" >
          <span>{session?.name}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">

        <DropdownMenuItem onSelect={() => router.push("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/dashboard")}>
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem

        >
         <LogoutButton></LogoutButton>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}