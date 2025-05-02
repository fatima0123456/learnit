import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/signup" 

  // Get the session cookie
  const sessionCookie = request.cookies.get("session")?.value

 

  // If the path is public and the user is logged in, redirect based on role
  if (isPublicPath && sessionCookie) {
    try {
      const userData = JSON.parse(sessionCookie)

      if (userData.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else if (userData.role === "user") {
        return NextResponse.redirect(new URL("/profile", request.url))
      }
    } catch (error) {
      // If there's an error parsing the cookie, continue with the request
      return NextResponse.next()
    }
  }

  // If the path is not public and the user is not logged in, redirect to login
  if (!isPublicPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the path is dashboard and the user is not an admin, redirect to profile
  if (path === "/dashboard" && sessionCookie) {
    try {
      const userData = JSON.parse(sessionCookie)

      if (userData.role !== "admin") {
        return NextResponse.redirect(new URL("/profile", request.url))
      }
    } catch (error) {
      // If there's an error parsing the cookie, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // If the path is profile and the user is an admin, allow access (admins can view user profiles)
  // No redirection needed here

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/login", "/signup", "/profile", "/dashboard"],
}

