import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST: Create a new user
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !role || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
