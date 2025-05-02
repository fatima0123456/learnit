import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Edit, LogOut } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  const userData = JSON.parse(sessionCookie);

  // ✅ Fetch enrolled courses from the database
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: userData.id },
    include: { course: true },
  });

  return (
    <div className="font-sans max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full">
        <div className="flex items-center px-5 my-2.5">
          <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
        </div>

        <div className="flex items-center gap-3 my-2.5 flex-wrap">
          <nav className="flex items-center">
            <Button asChild variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
              <Link href="/courses">Courses</Link>
            </Button>
            <Button asChild variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
              <Link href="/practice">Practice</Link>
            </Button>
            <Button asChild variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
              <Link href="/groups">Groups</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="ml-2">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Profile Image & Buttons */}
      <div className="flex items-center mb-5 mt-10 px-5">
        <div className="mr-5">
          <Image
            src="/Images/profile-image.png?height=100&width=100"
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>

        <div>
          <Button variant="outline" className="mr-2.5 font-bold">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>

          <Button asChild className="font-bold bg-blue-500 hover:bg-blue-600">
            <Link href="/api/auth/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Link>
          </Button>
        </div>
      </div>

      {/* User Information */}
      <div className="max-w-3xl mt-5 mx-auto p-5">
        <h2 className="text-left text-lg font-bold mb-4">User Information</h2>
        <div className="flex flex-wrap justify-between">
          <div className="w-[48%] pb-2 border-b border-gray-200 mb-2">
            <p className="text-gray-500">Username</p>
            <p className="font-bold">{userData.name.toUpperCase().replace(/\s+/g, " ")}</p>
          </div>
          <div className="w-[48%] pb-2 border-b border-gray-200 mb-2">
            <p className="text-gray-500">Email</p>
            <p className="font-bold">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="p-5 text-left">
        <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
        <div className="flex flex-wrap justify-around">
          {enrollments.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven’t enrolled in any courses yet.</p>
          ) : (
            enrollments.map(({ course }) => (
              <div key={course.id} className="rounded-lg p-2 m-2 text-left shadow-md w-[250px]">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={250}
                  height={135}
                  className="rounded-lg"
                />
                <p className="font-bold mt-2">{course.title}</p>
                <p className="text-sm">{course.}</p>
                <Link
                  href={`/profile/enrolled-courses/${course.id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline text-sm"
                >
                  View Course →
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
