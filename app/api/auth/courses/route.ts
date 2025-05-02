import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataFilePath = path.join(dataDir, 'courses.json');

// Ensure data directory and file exist
async function ensureFileExists() {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(dataFilePath);
    } catch {
      // File doesn't exist, so create it with empty array
      await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
    }
  } catch (err) {
    console.error("Failed to ensure data file exists:", err);
  }
}

// Read all courses
async function readCourses() {
  try {
    await ensureFileExists();
    const file = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(file);
  } catch (err) {
    console.error("Error reading courses file:", err);
    return [];
  }
}

// Write updated courses to file
async function writeCourses(courses: any[]) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(courses, null, 2));
  } catch (err) {
    console.error("Error writing to courses file:", err);
  }
}

// Slugify title for use as ID
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-');     // Replace multiple - with single -
}

// GET: return all courses
export async function GET() {
  const courses = await readCourses();
  return NextResponse.json(courses);
}

// POST: add a new course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, imageUrl, instructor, duration, studentsEnrolled } = body;

    if (!title || !description || !imageUrl || !instructor || !duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const courses = await readCourses();
    const newCourse = {
      id: slugify(title),
      title,
      description,
      imageUrl,
      instructor,
      duration,
      studentsEnrolled: studentsEnrolled || 0,
    };

    courses.push(newCourse);
    await writeCourses(courses);

    return NextResponse.json(newCourse, { status: 201 });
  } catch (err) {
    console.error("Error handling POST /api/courses:", err);
    return NextResponse.json({ error: 'Failed to add course' }, { status: 500 });
  }
}
