import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Route } from "@/types/routes.type"
import { adminRoutes } from "@/routes/adminRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { studentRoutes } from "@/routes/studentRoutes"

// This is sample data.


export function AppSidebar({ user,...props }: {user: { role: string } & React.ComponentProps<typeof Sidebar> } ) {

  let routes: Route[] = [];

  switch (user.role) {
    case "admin":
      routes = adminRoutes;
      break;
    case "tutor":
      routes = tutorRoutes;
      break;
    case "student" :
      routes = studentRoutes;
      break;
    case "Student" :
      routes = studentRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
     
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
