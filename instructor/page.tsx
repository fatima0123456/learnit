"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Settings } from "lucide-react";

const InstructorPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const newCourse = { title, description, instructor, duration };

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        setMessage("✅ Course successfully created!");
        setTitle("");
        setDescription("");
        setInstructor("");
        setDuration("");
        router.refresh();
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error || "Unable to create course."}`);
      }
    } catch (err) {
      setMessage("❌ Network error. Try again later.");
    }
  };

  return (
    <div className="font-sans max-w-5xl mx-auto">
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

      {/* ✅ Course Creation Form */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Instructor - Create Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            placeholder="Instructor Name"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
          <Input
            placeholder="Duration (e.g., 4 weeks)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
};

export default InstructorPage;
