import { NextRequest, NextResponse } from "next/server";
import { fetchSession } from "./app/_lib/services";
import { dashboardLink } from "./app/_lib/utilities";

export async function middleware(req: NextRequest) {
  // Get path
  const { pathname } = req.nextUrl;
  // Fetch session
  const session = await fetchSession();
  // Get user role
  const role = session.user?.role;
  // Redirect user based on role
  function redirect() {
    const url = dashboardLink(role);
    return NextResponse.redirect(new URL(url, req.url));
  }
  // Blocking auth path if user is logged in
  if (pathname.startsWith("/auth") && session.isLoggedIn) {
    return redirect();
  }
  // Blocking admin if user is not logged in
  if (pathname.startsWith("/dashboard") && !session.isLoggedIn) {
    return redirect();
  } else {
    if (pathname.startsWith("/dashboard/consult") && role !== "patient") {
      return redirect();
    }
    if (pathname.startsWith("/dashboard/staff") && role !== "professional") {
      return redirect();
    }
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return redirect();
    }
    if (
      pathname.startsWith("/dashboard/message") ||
      pathname.startsWith("/dashboard/contacts")
    ) {
      if (!["patient", "professional"].includes(`${role}`)) {
        return redirect();
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
