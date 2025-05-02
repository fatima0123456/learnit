import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  );

  // Delete (expire) the session cookie
  response.cookies.set({
    name: "session",
    value: "",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
