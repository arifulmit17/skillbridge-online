import { Route } from "@/types/routes.type";



export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "My Booked Sessions",
        url: "/dashboard/myBookings",
      },
      {
        title: "My Reviews",
        url: "/dashboard/myReviews",
      },
    ],
  },
];