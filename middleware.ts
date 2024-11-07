import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/_lib/services";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession();
  const role: any = session?.role;

  function handleDashboardRedirect() {
    switch (role) {
      case "patient":
        return NextResponse.redirect(new URL("/dashboard/consult", req.url));
      case "professional":
        return NextResponse.redirect(new URL("/dashboard/staff", req.url));
      case "admin":
        return NextResponse.redirect(
          new URL("/dashboard/admin/addProfessional", req.url)
        );
      default:
        return NextResponse.next();
    }
  }

  if (pathname.startsWith("/auth") && session.isLoggedIn) {
    // Blocking auth path when user is logged in
    return handleDashboardRedirect();
  }

  if (pathname.startsWith("/dashboard") && !session.isLoggedIn)
    return NextResponse.redirect(new URL("/", req.url));
  else {
    if (pathname.startsWith("/dashboard/consult") && role !== "patient") {
      return handleDashboardRedirect();
    }

    if (pathname.startsWith("/dashboard/staff") && role !== "professional") {
      return handleDashboardRedirect();
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin")
      return handleDashboardRedirect();

    if (
      pathname.startsWith("/dashboard/message") ||
      pathname.startsWith("/dashboard/contacts")
    ) {
      if (!["patient", "professional"].includes(role))
        return handleDashboardRedirect();
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
