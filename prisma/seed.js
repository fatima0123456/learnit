import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const instructorPassword = await bcrypt.hash('instructor123', 10)
  const studentPassword = await bcrypt.hash('student123', 10)

  // Create admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnit.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@learnit.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@learnit.com' },
    update: {},
    create: {
      name: 'Instructor One',
      email: 'instructor@learnit.com',
      password: instructorPassword,
      role: 'INSTRUCTOR'
    }
  })

  // Create student
  const student = await prisma.user.upsert({
    where: { email: 'student@learnit.com' },
    update: {},
    create: {
      name: 'Student One',
      email: 'student@learnit.com',
      password: studentPassword,
      role: 'USER'
    }
  })

  // Create course
  const course = await prisma.course.create({
    data: {
      title: 'Intro to Programming',
      description: 'Learn the basics of programming.',
      instructorId: instructor.id,
    }
  })

  // Enroll student in the course
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course.id
    }
  })

  // Optional: Add a lesson
  await prisma.lesson.create({
    data: {
      title: 'Lesson 1: Hello World',
      content: 'This is your first lesson!',
      courseId: course.id
    }
  })

  // Optional: Add a practice set with a question
  const practiceSet = await prisma.practiceSet.create({
    data: {
      title: 'Practice Set 1',
      courseId: course.id,
      questions: {
        create: [
          {
            text: 'What does HTML stand for?',
            options: ['HyperText Markup Language', 'HighText Machine Language', 'Hyperloop Machine Language', 'None of these'],
            correctAnswer: 'HyperText Markup Language'
          }
        ]
      }
    }
  })

  console.log('✅ Seeded: admin, instructor, student, course, lesson, practice set')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
