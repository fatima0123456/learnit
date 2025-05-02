'use client'

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Settings } from "lucide-react"

const groupData: Record<string, {
  name: string
  description: string
  image: string
}> = {
  "web-dev": {
    name: "Web Developers",
    description: "A place to collaborate on frontend, backend, and full-stack web projects.",
    image: "/Images/WD.png"
  },
  "js-mastery": {
    name: "JavaScript Mastery",
    description: "Dive into advanced JavaScript concepts, tips, and tricks with fellow enthusiasts.",
    image: "/JS mastery.png"
  },
  "python-club": {
    name: "Python Club",
    description: "Join discussions about Python, AI, ML, and data science trends.",
    image: "/PC.png"
  }
}

export default function GroupDetailPage() {
  const { id } = useParams()
  const group = groupData[id as string]

  if (!group) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Group Not Found</h1>
        <Button className="mt-4" asChild>
          <Link href="/groups">Back to Groups</Link>
        </Button>
      </div>
    )
  }

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
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Courses</Button>
            </Link>
            <Link href="/practice">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Practice</Button>
            </Link>
            <Link href="/groups">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Groups</Button>
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

      {/* Group Detail */}
      <div className="p-6 max-w-2xl mx-auto">
        <Image
          src={group.image}
          alt={group.name}
          width={400}
          height={200}
          className="rounded-xl w-full object-cover mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
        <p className="text-gray-700 text-lg mb-6">{group.description}</p>
        <Button variant="outline" asChild>
          <Link href="/groups">← Back to Groups</Link>
        </Button>
      </div>
    </div>
  )
}
