import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function AddUserPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value

  if (!sessionCookie) {
    redirect("/login")
  }

  const userData = JSON.parse(sessionCookie)
  
  if (userData.role !== "ADMIN") {
    redirect("/profile")
  }

  return (
    <div className="font-sans p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Add New User</h1>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <Input type="text" id="name" placeholder="Enter full name" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <Input type="email" id="email" placeholder="Enter email address" />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="role">
            Role
          </label>
          <Input type="text" id="role" placeholder="Enter role (e.g., student, admin)" />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <Input type="password" id="password" placeholder="Create password" />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add User
        </Button>
      </form>
    </div>
  )
}
