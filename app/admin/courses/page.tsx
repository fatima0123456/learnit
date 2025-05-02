"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  description: string;
};

const mockCourses: Course[] = [
  {
    id: "intro-to-javascript",
    title: "Intro to JavaScript",
    description: "Learn the basics of JavaScript, the language of the web.",
  },
  {
    id: "mastering-react",
    title: "Mastering React",
    description: "Dive deep into building dynamic user interfaces with React.",
  },
  {
    id: "next.js-crash-course",
    title: "Next.js Crash Course",
    description: "Build full-stack apps with Next.js, the React framework.",
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Deep dive into advanced Python features for efficient programming.",
  },
  {
    id: "javascript-for-web-development",
    title: "JavaScript for Web Development",
    description: "Build dynamic web pages with JavaScript.",
  },
  {
    id: "ux-design-fundamentals",
    title: "UX Design Fundamentals",
    description: "Learn how to design user-friendly digital products.",
  },
  {
    id: "ui-animation-principles",
    title: "UI Animation Principles",
    description: "Master UI animation principles to enhance user experience and engagement.",
  },
  {
    id: "product-strategy-and-planning",
    title: "Product Strategy and Planning",
    description: "Develop effective product strategies and planning techniques to drive market success.",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn to analyze data and apply machine learning for actionable insights.",

  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master online strategies to promote brands and engage customers effectively.",

  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn to protect systems and data from cyber threats and vulnerabilities.",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Explore algorithms and techniques to create intelligent systems that learn and adapt.",
  }
];

const isAdmin = true; // ✅ Replace this with actual admin auth check

export default function AdminCourseDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized");
    }
  }, []);

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: (Math.random() * 100000).toFixed(0),
      title,
      description,
    };
    setCourses([...courses, newCourse]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Course Dashboard (Admin)</h1>

      {/* 🔧 Create New Course */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <div className="space-y-4">
          <Input
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleCreateCourse}>Create Course</Button>
        </div>
      </div>

      {/* 📚 Existing Courses */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
                <Link
                  href={`/dashboard/courses/${course.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
