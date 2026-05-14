import { Route } from "@/types/routes.type";



export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "All Sessions",
        url: "/admin-dashboard/allSession",
      },
      {
        title: "All Tutors",
        url: "/admin-dashboard/allTutor",
      },
      {
        title: "All Users",
        url: "/admin-dashboard/allUser",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
  
];