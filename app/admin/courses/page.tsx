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
  imageUrl: string;
  instructor: string;
  duration: string;
  studentsEnrolled: number;
};

const isAdmin = true; // Replace this with actual admin auth check

export default function AdminCourseDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized");
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/auth/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Error fetching courses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const response = await fetch("/api/auth/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          instructor,
          duration,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCourses([...courses, data]);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setInstructor("");
        setDuration("");
      } else {
        console.error("Error creating course:", data.error);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Course Dashboard (Admin)</h1>

      {/* Create New Course */}
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
          <Input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Input
            placeholder="Instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
          <Input
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Button onClick={handleCreateCourse}>Create Course</Button>
        </div>
      </div>

      {/* Existing Courses */}
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