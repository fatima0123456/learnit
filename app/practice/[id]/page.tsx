'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Bell, Settings } from "lucide-react"
import Confetti from "react-confetti"

const practiceData: Record<string, {
  title: string
  questions: {
    question: string
    options: string[]
    answer: string
  }[]
}> = {
  "1": {
    title: "Intro to JavaScript",
    questions: [
      {
        question: "What is the correct syntax to print something in JavaScript?",
        options: ["print('Hello')", "echo('Hello')", "console.log('Hello')", "printf('Hello')"],
        answer: "console.log('Hello')"
      },
      {
        question: "Which method is used to add an element to an array?",
        options: ["push()", "add()", "insert()", "append()"],
        answer: "push()"
      }
    ]
  },
  "2": {
    title: "Mastering React",
    questions: [
      {
        question: "What hook is used to manage state in React?",
        options: ["useData()", "useState()", "useContext()", "setState()"],
        answer: "useState()"
      },
      {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "JavaScript Extended", "Java Syntax", "JavaScript Element"],
        answer: "JavaScript XML"
      }
    ]
  }
}

export default function PracticeDetailPage() {
  const params = useParams()
  const id = params?.id?.toString() ?? ""
  const set = practiceData[id]

  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const question = set?.questions[questionIndex]

  useEffect(() => {
    if (isCorrect === true) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    }
  }, [isCorrect])

  if (!set) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Practice Set Not Found</h1>
        <Button className="mt-4" asChild>
          <Link href="/practice">Back to Practice</Link>
        </Button>
      </div>
    )
  }

  const checkAnswer = () => {
    const correct = selectedOption === question.answer
    setIsCorrect(correct)
    if (correct) setScore((prev) => prev + 1)
  }

  const nextQuestion = () => {
    if (questionIndex < set.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      setSelectedOption("")
      setIsCorrect(null)
    }
  }

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
      setSelectedOption("")
      setIsCorrect(null)
    }
  }

  

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
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Courses</Button>
            </Link>
            <Link href="/practice">
              <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Practice</Button>
            </Link>
            <Button variant="ghost" className="mx-2 px-3 py-1.5 text-sm font-bold">Groups</Button>
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

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Practice Content */}
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{set.title}</h1>
        <div className="text-lg mb-4">Score: {score}/{set.questions.length}</div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Question {questionIndex + 1} of {set.questions.length}
          </h2>
          <p className="mb-4">{question.question}</p>

          <div className="space-y-2 mb-4">
            {question.options.map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="mr-2"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  checked={selectedOption === option}
                />
                {option}
              </label>
            ))}
          </div>

          <Button onClick={checkAnswer} className="mb-4">
            Check Answer
          </Button>

          {isCorrect === true && (
            <p className="text-green-600 font-semibold">✅ Correct!</p>
          )}
          {isCorrect === false && (
            <p className="text-red-600 font-semibold">❌ Incorrect. Try again.</p>
          )}

          <div className="flex justify-between mt-4">
            <Button onClick={prevQuestion} disabled={questionIndex === 0}>Previous</Button>
            <Button onClick={nextQuestion} disabled={questionIndex === set.questions.length - 1}>Next</Button>
          </div>

          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/practice">← Back to Practice</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
