import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value

  if (!sessionCookie) {
    redirect("/login")
  }

  const userData = JSON.parse(sessionCookie)

  if (userData.role !== "ADMIN") {
    redirect("/profile")
  }

  // Sample stats
  const totalUsers = 120
  const totalCourses = 15
  const totalEnrollments = 350
  const pendingTasks = 7

  return (
    <div className="font-sans p-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>
        <div className="bg-green-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{totalCourses}</p>
        </div>
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Enrollments</h2>
          <p className="text-3xl font-bold mt-2">{totalEnrollments}</p>
        </div>
        <div className="bg-red-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-3xl font-bold mt-2">{pendingTasks}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-2xl font-bold mb-5">Recent Activities</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition">
            <p><strong>John Doe</strong> enrolled in <strong>JavaScript for Web Development</strong>.</p>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition">
            <p><strong>Admin</strong> added a new course <strong>UX Design Fundamentals</strong>.</p>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition">
            <p><strong>Jane Smith</strong> completed <strong>Python for Data Science</strong>.</p>
            <span className="text-gray-500 text-sm">3 days ago</span>
          </div>
        </div>
      </div>

    </div>
  )
}
