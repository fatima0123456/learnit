"use client";

import { useParams } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Settings } from "lucide-react";

const courses = [
  {
    id: "intro-to-javascript",
    title: "Intro to JavaScript",
    description: "Learn the basics of JavaScript, the language of the web.",
    imageUrl: "/Images/Intro to js.png",
    instructor: "Alice Johnson",
    duration: "4 weeks",
    studentsEnrolled: 1200,
  },
  {
    id: "mastering-react",
    title: "Mastering React",
    description: "Dive deep into building dynamic user interfaces with React.",
    imageUrl: "/Images/Mastering react.png",
    instructor: "Bob Smith",
    duration: "6 weeks",
    studentsEnrolled: 980,
  },
  {
    id: "next.js-crash-course",
    title: "Next.js Crash Course",
    description: "Build full-stack apps with Next.js, the React framework.",
    imageUrl: "/Images/Nextjs CC.jpeg",
    instructor: "Carol Lee",
    duration: "3 weeks",
    studentsEnrolled: 760,
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Deep dive into advanced Python features for efficient programming.",
    imageUrl: "/Images/2.png",
    instructor: "David Kim",
    duration: "5 weeks",
    studentsEnrolled: 670,
  },
  {
    id: "javascript-for-web-development",
    title: "JavaScript for Web Development",
    description: "Build dynamic web pages with JavaScript.",
    imageUrl: "/Images/JS.png",
    instructor: "Emma Davis",
    duration: "4 weeks",
    studentsEnrolled: 1500,
  },
  {
    id: "ux-design-fundamentals",
    title: "UX Design Fundamentals",
    description: "Learn how to design user-friendly digital products.",
    imageUrl: "/Images/UX.png",
    instructor: "Frank Moore",
    duration: "2 weeks",
    studentsEnrolled: 820,
  },
  {
    id: "ui-animation-principles",
    title: "UI Animation Principles",
    description: "Master UI animation principles to enhance user experience and engagement.",
    imageUrl: "/Images/UI.png",
    instructor: "Alice",
    duration: "3 weeks",
    studentsEnrolled: 210,
  },
  {
    id: "product-strategy-and-planning",
    title: "Product Strategy and Planning",
    description: "Develop effective product strategies and planning techniques to drive market success.",
    imageUrl: "/Images/PSP.png",
    instructor: "Emma",
    duration: "2 weeks",
    studentsEnrolled: 150,
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn to analyze data and apply machine learning for actionable insights.",
    imageUrl: "/Images/DS.jpg",
    instructor: "William",
    duration: "4 weeks",
    studentsEnrolled: 100,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master online strategies to promote brands and engage customers effectively.",
    imageUrl: "/Images/DM.jpeg",
    instructor: "Charles",
    duration: "2 weeks",
    studentsEnrolled: 80,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn to protect systems and data from cyber threats and vulnerabilities.",
    imageUrl: "/Images/cybersecurity.jpg",
    instructor: "James",
    duration: "5 weeks",
    studentsEnrolled: 50,
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Explore algorithms and techniques to create intelligent systems that learn and adapt.",
    imageUrl: "/Images/AI.jpg",
    instructor: "Henry",
    duration: "3 weeks",
    studentsEnrolled: 120,
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id.trim().toLowerCase() : "";
  const course = courses.find((c) => c.id.toLowerCase() === id);

  const [searchTerm, setSearchTerm] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted:", searchTerm);
  };

  const handleEnroll = () => {
    // Simulate enrollment action
    setEnrolled(true);
  };

  if (!id) return <div className="p-8 text-center text-xl">Loading...</div>;

  return (
    <div className="font-sans max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full flex-wrap">
        <div className="flex items-center px-5 my-2.5">
          <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
        </div>
        <nav className="flex items-center my-2.5 flex-wrap gap-2">
          <Link href="/courses"><Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Courses</Button></Link>
          <Link href="/practice"><Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Practice</Button></Link>
          <Link href="/groups"><Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Groups</Button></Link>
        </nav>
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mt-2">
          <Input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} className="w-40" />
          <Button type="submit" variant="outline" size="sm">Search</Button>
        </form>
        <div className="flex items-center gap-2 ml-4 mt-2">
          <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
          <Link href="/profile">
            <Image src="/Images/profile-image.png" alt="Profile Picture" width={45} height={45} className="rounded-full" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      {!course ? (
        <div className="p-8 text-center">
          <h1 className="text-3xl font-semibold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the course you're looking for.</p>
          <Link href="/courses" className="text-blue-600 hover:underline text-sm">← Back to Courses</Link>
        </div>
      ) : (
        <div className="p-8 max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Course Overview</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Image src={course.imageUrl} alt={course.title} width={600} height={400} className="rounded-xl shadow-lg w-full object-cover" />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                <p className="text-gray-700 mt-2">{course.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Details</h2>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li><strong>Instructor:</strong> {course.instructor}</li>
                  <li><strong>Duration:</strong> {course.duration}</li>
                  <li><strong>Students Enrolled:</strong> {course.studentsEnrolled.toLocaleString()}</li>
                </ul>
              </div>

              {/* Enroll Button */}
              <div className="mt-6">
                {enrolled ? (
                  <p className="text-green-600 font-semibold">✅ You are enrolled in this course!</p>
                ) : (
                  <Button onClick={handleEnroll} className="bg-blue-600 text-white hover:bg-blue-700">
                    Enroll Now
                  </Button>
                )}
              </div>

              <Link href="/courses" className="inline-block mt-6 text-blue-600 hover:underline text-sm">← Back to Courses</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}