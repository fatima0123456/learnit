// app/api/enrollments/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const courseId = params.id;

  try {
    // Simulate user ID from session or token (replace with real auth logic)
    const userId = "mock-user-id";

    await prisma.enrollment.deleteMany({
      where: {
        userId,
        courseId,
      },
    });

    return NextResponse.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete enrollment:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
