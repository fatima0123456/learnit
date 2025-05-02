'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Settings } from "lucide-react"

const groups = [
  {
    id: "web-dev",
    name: "Web Developers",
    description: "Share your frontend and backend knowledge with peers.",
    image: "/Images/WD.png",
  },
  {
    id: "js-mastery",
    name: "JavaScript Mastery",
    description: "Deep-dive into JS concepts and advanced tricks.",
    image: "/JS mastery.png",
  },
  {
    id: "python-club",
    name: "Python Club",
    description: "Discuss data science, AI, and everything Python.",
    image: "/PC.png",
  },
]

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full">
        <div className="flex items-center px-5 my-2.5">
          <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
        </div>
        <div className="flex items-center gap-3 my-2.5 flex-wrap">
          <nav className="flex items-center">
            <Link href="/courses">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
                Courses
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
                Practice
              </Button>
            </Link>
            <Link href="/groups">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
                Groups
              </Button>
            </Link>
          </nav>
          <Input
            type="text"
            placeholder="Search Groups"
            className="ml-2 w-40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

      {/* Group Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Join a Group</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <div key={group.id} className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
                <Image
                  src={group.image}
                  alt={group.name}
                  width={400}
                  height={200}
                  className="rounded-xl w-full object-cover"
                />
                <h2 className="text-xl font-semibold mt-4">{group.name}</h2>
                <p className="text-sm text-gray-600 mt-1 mb-3">{group.description}</p>
                <Button asChild className="w-full">
                  <Link href={`/groups/${group.id}`}>Visit Group</Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No groups found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
