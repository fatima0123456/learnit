"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
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
  },
  {
    id: "mastering-react",
    title: "Mastering React",
    description: "Dive deep into building dynamic user interfaces with React.",
    imageUrl: "/Images/Mastering react.png",
  },
  {
    id: "next.js-crash-course",
    title: "Next.js Crash Course",
    description: "Build full-stack apps with Next.js, the React framework.",
    imageUrl: "/Images/Nextjs CC.jpeg",
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Deep dive into advanced Python features for efficient programming.",
    imageUrl: "/Images/2.png",
  },
  {
    id: "javascript-for-web-development",
    title: "JavaScript for Web Development",
    description: "Build dynamic web pages with JavaScript.",
    imageUrl: "/Images/JS.png",
  },
  {
    id: "ux-design-fundamentals",
    title: "UX Design Fundamentals",
    description: "Learn how to design user-friendly digital products.",
    imageUrl: "/Images/UX.png",
  },
  {
    id: "ui-animation-principles",
    title: "UI Animation Principles",
    description: "Master UI animation principles to enhance user experience and engagement.",
    imageUrl: "/Images/UI.png",
  },
  {
    id: "product-strategy-and-planning",
    title: "Product Strategy and Planning",
    description: "Develop effective product strategies and planning techniques to drive market success.",
    imageUrl: "/Images/PSP.png",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn to analyze data and apply machine learning for actionable insights.",
    imageUrl: "/Images/DS.jpg",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master online strategies to promote brands and engage customers effectively.",
    imageUrl: "/Images/DM.jpeg",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn to protect systems and data from cyber threats and vulnerabilities.",
    imageUrl: "/Images/cybersecurity.jpg",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Explore algorithms and techniques to create intelligent systems that learn and adapt.",
    imageUrl: "/Images/AI.jpg",
  },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans max-w-7xl mx-auto">
      {/* ✅ Header Section */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full">
        <div className="flex items-center px-5 my-2.5">
        <Link href="/profile">
        <Image src="/Images/Logo.png" alt="Logo" width={120} height={30} />
        </Link>
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

          <Input
            type="text"
            placeholder="Search"
            className="ml-2 w-40"
            value={searchTerm}
            onChange={handleSearchChange}
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

      {/* ✅ Main Content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">All Courses</h1>

        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500">No courses found for "{searchTerm}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="rounded-lg p-2 m-2 text-left shadow-md w-[250px]"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-block mt-4 text-blue-600 hover:underline text-sm"
                  >
                    View Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
