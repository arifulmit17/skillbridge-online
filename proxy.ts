import { getUser } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let role = "";

  // get logged in user
  const data = await getUser();
   console.log("dashboard",data);
  if (data) {
    isAuthenticated = true;
    role = data.role;
  }

  //* User not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  //* ADMIN routes protection
  if (
    pathname.startsWith("/admin-dashboard") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  //* TUTOR routes protection
  if (
    pathname.startsWith("/tutor-dashboard") &&
    role !== "tutor"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  //* STUDENT routes protection
  if (
    pathname.startsWith("/dashboard") &&
    role !== "student"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  //* Optional:
  //* redirect users to their own dashboard

  if (pathname === "/dashboard") {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (role === "tutor") {
      return NextResponse.redirect(
        new URL("/tutor-dashboard", request.url)
      );
    }

    if (role === "student") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
  ],
};