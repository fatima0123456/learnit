'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Settings } from "lucide-react"

export default function PracticePage() {
    const [searchTerm, setSearchTerm] = useState("")

    const practiceSets = [
        {
            id: "1",
            title: "Intro to JavaScript",
            description: "Learn the basics of JavaScript, the language of the web.",
            image: "/Images/Intro to js.png",
        },
        {
            id: "2",
            title: "Mastering React",
            description: "Dive deep into building dynamic user interfaces with React.",
            image: "/Images/Mastering react.png",
        },
        {
            id: "3",
            title: "Next.js Crash Course",
            description: "Build full-stack apps with Next.js, the React framework.",
            image: "/Images/Nextjs CC.jpeg",
        },
        {
            id: "4",
            title: "Advanced Python",
            description: "Deep dive into advanced Python features for efficient programming.",
            image: "/Images/2.png",
        },
        {
            id: "5",
            title: "JavaScript for Web Development",
            description: "Build dynamic web pages with JavaScript.",
            image: "/Images/JS.png",
        },
        {
            id: "6",
            title: "UX Design Fundamentals",
            description: "Learn how to design user-friendly digital products.",
            image: "/Images/UX.png",
        },
    ]

    // 🔍 Filter based on search term
    const filteredCourses = practiceSets.filter(
        (course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
                            Groups
                        </Button>
                    </nav>
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-2 w-40"
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

            {/* Main Content */}
            <div className="px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Practice Center</h1>
                <p className="text-gray-600 mb-10">
                    Choose a topic below and sharpen your skills with hands-on practice.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((set) => (
                            <div
                                key={set.id}
                                className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
                            >
                                <Image
                                    src={set.image}
                                    alt={set.title}
                                    width={300}
                                    height={150}
                                    className="rounded-xl w-full object-cover"
                                />
                                <h2 className="text-xl font-semibold mt-4">{set.title}</h2>
                                <p className="text-gray-600 text-sm mt-1 mb-2">{set.description}</p>
                                <Button asChild className="w-full mt-3">
                                    <Link href={`/practice/${set.id}`}>Start Practice</Link>
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No practice sets match your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
