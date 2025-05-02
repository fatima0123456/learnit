import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: "Password not set for user" }, { status: 500 });
    }

    const isMatch = await bcrypt.hash(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    };

    const response = NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

    response.cookies.set("session", JSON.stringify(session), {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
