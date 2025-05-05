"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import Image from "next/image";

const AdminPage = () => {
  return (
    <div className="font-sans max-w-7xl mx-auto">
      {/* ✅ Header Section */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full">
        <div className="flex items-center px-5 my-2.5">
          <Link href="/admin">
            <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
          </Link>
        </div>

        <div className="flex items-center gap-3 my-2.5 flex-wrap">
          <nav className="flex items-center">
            <Link href="/admin/add-user">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Manage Users</Button>
            </Link>
            <Link href="/admin/courses">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Manage Courses</Button>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <Settings className="h-5 w-5" />
          </Button>
          <Link href="/profile">
            <Image
              src="/Images/profile-image.png"
              alt="Profile Picture"
              width={45}
              height={45}
              className="rounded-full ml-2"
            />
          </Link>
        </div>
      </header>

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, Admin</h1>
        <p className="text-gray-600 mb-4">Use the options above to manage users and courses.</p>
      </main>
    </div>
  );
};

export default AdminPage;
