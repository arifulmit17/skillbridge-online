"use client";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../modules/shared/ModeToggle";
import logo from "../logo.png";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { getUser } from "@/services/auth.service";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}




const handleLogout = async () => {
  // BetterAuth has been removed. Implement your custom logout logic here.
  window.location.href = "/login";
}

const Navbar1 = ({
  logo = {
    
    src: "/logo.svg",
    alt: "logo",
    title: "SkillBridge",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Tutors",
      url: "/tutors",
      
    },
    {
      title: "Sessions",
      url: "/sessions",
     
    },
    {
      title: "About",
      url: "/about",
     
    },
    {
      title: "Contact",
      url: "/contact",
     
    },
    
    
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const [session, setSession] = useState<any>(null);
const [loading, setLoading] = useState(true);

const role = session?.role;
console.log("role:", role);

useEffect(() => {
  const fetchSession = async () => {
    const  data  = await getUser();
    console.log("Session data:", data);
    setSession(data);
    setLoading(false);
  };

  fetchSession();
}, []);
console.log(session);
let dashboardItem: MenuItem | null = null;

if (role === "tutor") {
  dashboardItem = { title: "Dashboard", url: "/tutor-dashboard" };
} else if (role === "student" || role === "STUDENT") {
  dashboardItem = { title: "Dashboard", url: "/dashboard" };
} else if (role === "admin") {
  dashboardItem = { title: "Dashboard", url: "/admin-dashboard" };
}
 const finalMenu = dashboardItem ? [...menu, dashboardItem] : menu;
 
  // console.log(session);
  return (
    <section className={cn("py-4 top-0 z-50 sticky bg-background/50 backdrop-blur-lg border-b border-border/50", className)}>
      <div className="container mx-auto px-4 ">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div className="flex flex-col">
              <Link href="/">
                <Image width={50} height={10} src={logo.src} alt={logo.alt} className={logo.className} />
             
            </Link>
            <span className="text-sm text-blue-600 font-semibold tracking-tighter">
              {logo.title}
            </span>

            </div>
            
          
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {finalMenu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
             {session && (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground cursor-pointer">
        {session?.name}
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      
      <DropdownMenuItem asChild>
        <Link href="/profile">Profile</Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        
              <div onClick={handleLogout}>Logout</div>
            
      </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>
)}
            <ModeToggle></ModeToggle>
           {!session && <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>}
           
          
           
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
           
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  
                    <ModeToggle></ModeToggle>
                 
                  
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {finalMenu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    
                   {!session ? <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>:
            <Button asChild variant="outline" size="sm">
              <div onClick={handleLogout}>Logout</div>
            </Button>}
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
      asChild
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
       
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};



export { Navbar1 };
