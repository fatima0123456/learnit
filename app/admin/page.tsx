import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Settings, MoreHorizontal } from "lucide-react"


async function getCourses() {
  const response = await fetch("http://localhost:3000/api/auth/courses");
  const data = await response.json();
  return data;
}

export default async function adminPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value

  if (!sessionCookie) {
    redirect("/login")
  }

  const userData = JSON.parse(sessionCookie)

  if (userData.role !== "ADMIN") {
    redirect("/profile")
  }

  const courses = await getCourses();

  const users = [
    { id: 1, name: 'Molly Brown', lastSeen: '2 days ago', image: '/Images/user1.png' },
    { id: 2, name: 'John Davis', lastSeen: '4 days ago', image: '/Images/user2.png' },
    { id: 3, name: 'Lucy Johnson', lastSeen: '6 days ago', image: '/Images/user3.png' },
    { id: 4, name: 'Bob Smith', lastSeen: '8 days ago', image: '/Images/user4.png' },
  ]

  // const courses = [
  //   { id: 1, title: 'JavaScript for Web Development', lastUpdated: '2 days ago', lessons: '5 lessons', image: '/Images/JS.png' },
  //   { id: 2, title: 'Python for Data Science and AI', lastUpdated: '4 days ago', lessons: '7 lessons', image: '/Images/python1.png' },
  //   { id: 3, title: 'User Research Methods', lastUpdated: '6 days ago', lessons: '3 lessons', image: '/Images/URM.png' },
  //   { id: 4, title: 'UX Design Fundamentals', lastUpdated: '8 days ago', lessons: '9 lessons', image: '/Images/UX.png' },
  // ]

  return (
    <div className="font-sans p-5 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
        </div>
        <div className="flex items-center gap-5 font-bold">
          {/* Navbar Buttons */}
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/courses">Courses</Link>
          </Button>
          

          <Input type="text" placeholder="Search" className="ml-5 w-40" />
          <Button variant="ghost" size="icon" className="ml-2.5">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2.5">
            <Settings className="h-5 w-5" />
          </Button>
          <Image
            src="/Images/admin-profile.png"
            alt="Profile Picture"
            width={45}
            height={45}
            className="rounded-full ml-2.5"
          />
        </div>
      </header>

      {/* All Users Section */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-bold">All Users</h2>
        </div>

        <div className="flex justify-between items-center mt-4 mb-8">
          <Input type="text" placeholder="Search users" className="py-2.5 mb-0 w-full max-w-lg" />
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg ml-4">
            <Link href="/admin/add-user">Add Users</Link>
          </Button>
        </div>

        <ul className="list-none p-0">
          {users.map((user) => (
            <li key={user.id} className="flex items-center p-4 border-b border-gray-200">
              <Image
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <strong>{user.name}</strong>
                <p className="m-0 text-gray-500 text-sm">Last seen: {user.lastSeen}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* Courses Section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-5">Courses</h2>

        <Input type="text" placeholder="Search courses" className="py-2.5 mb-5 w-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {courses.map((course) => (
            <Link key={course.id} href={`/admin/courses/${course.id}`}>
              <div className="border border-gray-200 rounded-lg overflow-hidden p-2.5 hover:shadow-md transition">
                <Image
                  src={course.imageUrl || "/placeholder.svg"}
                  alt={course.title}
                  width={250}
                  height={150}
                  className="w-full h-[150px] object-cover rounded-lg"
                />
                <div className="p-2.5">
                  <strong>{course.title}</strong>
                  <p className="m-0 text-gray-500 text-sm">Last updated: {course.lastUpdated}</p>
                  <p className="m-0 text-gray-500 text-sm">{course.lessons}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Logout */}
      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="sm">
          <Link href="/api/auth/logout">Logout</Link>
        </Button>
      </div>
    </div>
  )
}
