import { Route } from "@/types/routes.type";



export const tutorRoutes: Route[] = [
  {
    title: "Session Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "My Profile",
        url: "/tutor-dashboard/tutorprofile",
      },
      {
        title: "My Availability",
        url: "/tutor-dashboard/availability",
      },
      {
        title: "Arrange Sessions",
        url: "/tutor-dashboard/createSession",
      },
      {
        title: "My Sessions",
        url: "/tutor-dashboard/mySessions",
      },
      {
        title: "Student's Reviews",
        url: "/tutor-dashboard/tutorReviews",
      },
    ],
  },
];