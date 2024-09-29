'use client'

import { useState } from 'react'
import { Bell, User, Paperclip, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ProposalApplicationComponent() {
  const router = useRouter();
  const [selectedTasks, setSelectedTasks] = useState([])

  const proposal = {
    id: 1,
    title: "Digital Transformation for Retail",
    postedBy: "John Doe",
    details: "This proposal aims to revolutionize the retail sector through cutting-edge digital solutions.",
    sectors: ["Retail", "E-commerce"],
    techSkills: ["AI", "Cloud Computing", "Big Data"],
    dueDate: "2023-12-15",
    postingDate: "2023-11-01",
    attachments: ["project_brief.pdf", "technical_requirements.docx"],
    tasks: [
      { id: 1, name: "Market Analysis", description: "Conduct a comprehensive market analysis of the retail sector." },
      { id: 2, name: "Technology Stack Selection", description: "Choose appropriate technologies for the digital transformation." },
      { id: 3, name: "Prototype Development", description: "Develop a prototype of the proposed digital solution." },
      { id: 4, name: "User Testing", description: "Conduct user testing and gather feedback on the prototype." },
    ]
  }

  const handleUserProfile = () => {
    router.push('/profile-page');  // Redirects to the proposal application page
  };
  const handleNotification = () => {
    router.push('/notification-page');  // Redirects to the proposal notification page
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">KPMG Proposal Manager</h1>
            <nav className="hidden md:flex space-x-4">
              <Link href="/landing-page" className="hover:text-blue-200">Home</Link>
              <Link href="/my-listed-proposals" className="hover:text-blue-200">My Listed Proposals</Link>
              <Link href="/active-proposals" className="hover:text-blue-200">Active Proposals</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Bell onClick = {handleNotification} className="h-6 w-6 cursor-pointer" />
            <User onClick = {handleUserProfile} className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{proposal.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Posted by: {proposal.postedBy}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 flex items-center justify-end">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted on: {proposal.postingDate}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Proposal Details</h3>
              <p>{proposal.details}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {proposal.sectors.map((sector, index) => (
                  <Badge key={index} variant="secondary">{sector}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Technical Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {proposal.techSkills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold mb-2">Due Date</h3>
                <p>{proposal.dueDate}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Attachments</h3>
                <ul className="list-disc list-inside">
                  {proposal.attachments.map((attachment, index) => (
                    <li key={index} className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2" />
                      {attachment}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tasks</h3>
              <div className="space-y-4">
                {proposal.tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedTasks.includes(task.id) ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => toggleTaskSelection(task.id)}
                  >
                    <CardHeader className="py-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                        />
                        <CardTitle className="text-lg">{task.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p>{task.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={selectedTasks.length === 0}
            >
              Apply for Selected Tasks
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-blue-700 mb-2">KPMG Proposal Manager</h2>
              <p>Simplifying Project Proposals and Team Collaboration</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="font-bold mb-2">Contact Us</h3>
              <p>Email: contact@kpmg.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-700 hover:text-blue-900">LinkedIn</a>
                <a href="#" className="text-blue-700 hover:text-blue-900">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="text-blue-700 hover:text-blue-900 mr-4">Privacy Policy</a>
            <a href="#" className="text-blue-700 hover:text-blue-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}