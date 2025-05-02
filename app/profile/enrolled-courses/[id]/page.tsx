"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const courses = [
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
];

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id.trim().toLowerCase() : "";

  const course = courses.find((c) => c.id.toLowerCase() === id);

  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);
  
    try {
      const res = await fetch(`/api/enrollments/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setIsDeleted(true);
        setTimeout(() => router.push("/profile"), 1500); // This returns to profile
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) return <div className="p-8 text-center text-xl">Loading...</div>;

  return (
    <div className="font-sans max-w-7xl mx-auto">
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

              <div className="mt-6">
                {isDeleted ? (
                  <p className="text-green-600 font-semibold">✅ Course deleted successfully</p>
                ) : (
                  <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700" disabled={loading}>
                    {loading ? "Deleting..." : "Delete Course"}
                  </Button>
                )}
              </div>

              <Link href="/profile" className="inline-block mt-6 text-blue-600 hover:underline text-sm">← Back to Profile</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
