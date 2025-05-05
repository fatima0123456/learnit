import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST: Create a new user
export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password, role },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT: Update an existing user
export async function PUT(req: NextRequest) {
  const { id, name, email, password, role } = await req.json();
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password, role },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE: Delete a user
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
