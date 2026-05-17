"use client"

import {
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Accordion,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

import { ModeToggle } from "../modules/shared/ModeToggle"

import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import {
  getUser,
  logoutUser,
} from "@/services/auth.service"

import { toast } from "sonner"

interface MenuItem {
  title: string
  url: string
}

interface Navbar1Props {
  className?: string
}

const menu: MenuItem[] = [
  {
    title: "Home",
    url: "/",
  },
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
]

export function Navbar1({
  className,
}: Navbar1Props) {
  const [session, setSession] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  // SAFE FETCH SESSION
  useEffect(() => {
    async function fetchSession() {
      try {
        const data = await getUser()

        // SAFE NULL CHECK
        if (data) {
          setSession(data)
        }
      } catch (error) {
        console.error(
          "Session fetch failed:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  // SAFE ROLE ACCESS
  const role =
    session?.role?.toLowerCase?.() || ""

  let dashboardItem:
    | MenuItem
    | null = null

  if (role === "tutor") {
    dashboardItem = {
      title: "Dashboard",
      url: "/tutor-dashboard",
    }
  }

  else if (
    role === "student"
  ) {
    dashboardItem = {
      title: "Dashboard",
      url: "/dashboard",
    }
  }

  else if (
    role === "admin"
  ) {
    dashboardItem = {
      title: "Dashboard",
      url: "/admin-dashboard",
    }
  }

  const finalMenu = dashboardItem
    ? [...menu, dashboardItem]
    : menu

  // SAFE LOGOUT
  const handleLogout =
    async () => {
      try {
        const res =
          await logoutUser()

        if (!res?.success) {
          toast.error(
            "Logout failed"
          )
          return
        }

        toast.success(
          "Logged out successfully"
        )

        window.location.href =
          "/login"
      } catch (error) {
        console.error(error)

        toast.error(
          "Something went wrong"
        )
      }
    }

  return (
    <section
      className={cn(
        "sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-lg",
        className
      )}
    >
      <div className="container mx-auto px-4">

        {/* DESKTOP */}
        <nav className="hidden h-16 items-center justify-between lg:flex">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="SkillBridge"
                width={45}
                height={45}
                priority
              />

              <span className="font-bold text-blue-600">
                SkillBridge
              </span>
            </Link>

            {/* MENU */}
            <NavigationMenu>
              <NavigationMenuList>

                {finalMenu.map(
                  (item) => (
                    <NavigationMenuItem
                      key={
                        item.title
                      }
                    >
                      <NavigationMenuLink
                        asChild
                        className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <Link
                          href={
                            item.url
                          }
                        >
                          {
                            item.title
                          }
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <ModeToggle />

            {/* LOADING */}
            {loading && (
              <div className="text-sm text-muted-foreground">
                Loading...
              </div>
            )}

            {/* USER */}
            {!loading &&
              session && (
                <DropdownMenu>

                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
                      {session?.name ||
                        "User"}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">

                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={
                        handleLogout
                      }
                    >
                      Logout
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              )}

            {/* GUEST */}
            {!loading &&
              !session && (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                  >
                    <Link href="/signup">
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}

          </div>
        </nav>

        {/* MOBILE */}
        <div className="flex h-16 items-center justify-between lg:hidden">

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="SkillBridge"
              width={40}
              height={40}
            />

            <span className="font-bold text-blue-600">
              SkillBridge
            </span>
          </Link>

          <Sheet>

            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent>

              <SheetHeader>
                <SheetTitle>
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">

                <ModeToggle />

                <Accordion
                  type="single"
                  collapsible
                  className="flex flex-col gap-3"
                >

                  {finalMenu.map(
                    (item) => (
                      <Link
                        key={
                          item.title
                        }
                        href={
                          item.url
                        }
                        className="text-sm font-medium"
                      >
                        {
                          item.title
                        }
                      </Link>
                    )
                  )}

                </Accordion>

                <div className="flex flex-col gap-3 pt-4">

                  {!loading &&
                    !session && (
                      <>
                        <Button
                          asChild
                          variant="outline"
                        >
                          <Link href="/login">
                            Login
                          </Link>
                        </Button>

                        <Button asChild>
                          <Link href="/signup">
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    )}

                  {!loading &&
                    session && (
                      <Button
                        variant="destructive"
                        onClick={
                          handleLogout
                        }
                      >
                        Logout
                      </Button>
                    )}

                </div>

              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  )
}