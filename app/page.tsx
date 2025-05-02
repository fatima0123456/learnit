"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
];

const CoursesPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstMatch = courses.find(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (firstMatch) {
      router.push(`/courses/${firstMatch.id}`);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between p-4 border-b border-gray-200 items-center w-full relative">
        <div className="flex items-center px-5 my-2.5">
          <Image
            src="/Images/Logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="cursor-pointer"
          />
        </div>
        

        <div className="flex items-center gap-3 my-2.5 flex-wrap relative">
          <nav className="flex items-center">
            <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">
              Courses
            </Button>
          </nav>

          <div className="relative">
            <Input
              type="text"
              placeholder="Search Courses"
              className="ml-2 w-40"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <div className="absolute bg-white border rounded shadow-md mt-1 z-10 w-40 max-h-60 overflow-y-auto">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => {
                        setSearchTerm("");
                        router.push(`/courses/${course.id}`);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {course.title}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No results</div>
                )}
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "928px",
          height: "480px",
          margin: "auto",
        }}
      >
        <Image
          src="/Images/start.png"
          alt="Start"
          width={928}
          height={480}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            width: "90%",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
              textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
              fontWeight: "bold"
            }}
          >
            Start your journey to become a Designer or a Developer
          </h1>
          
        </div>
      </section>

      {/* Course List */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Recommended Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {courses.map((course) => (
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
      </div>
    </div>
  );
};

export default CoursesPage;
