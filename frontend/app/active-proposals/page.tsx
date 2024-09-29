'use client'

import { useState } from 'react'
import { Bell, User, Paperclip, Calendar, Check, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ActiveProposalsComponent() {
    const router = useRouter();
  const [proposals, setProposals] = useState([
    {
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
        { id: 1, name: "Market Analysis", description: "Conduct a comprehensive market analysis of the retail sector.", assignedTo: "Alice Johnson", completed: true },
        { id: 2, name: "Technology Stack Selection", description: "Choose appropriate technologies for the digital transformation.", assignedTo: "You", completed: false },
        { id: 3, name: "Prototype Development", description: "Develop a prototype of the proposed digital solution.", assignedTo: "Bob Smith", completed: true },
        { id: 4, name: "User Testing", description: "Conduct user testing and gather feedback on the prototype.", assignedTo: null, completed: false },
      ]
    },
    // Add more active proposals here...
  ])
  const handleUserProfile = () => {
    router.push('/profile-page');  // Redirects to the proposal application page
  };
  const handleNotification = () => {
    router.push('/notification-page');  // Redirects to the proposal application page
  };
  
  const handleFileUpload = (proposalId, taskId) => {
    // Implement file upload logic here
    console.log(`Uploading file for proposal ${proposalId}, task ${taskId}`)
  }

  const toggleTaskCompletion = (proposalId, taskId) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        const updatedTasks = proposal.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed }
          }
          return task
        })
        return { ...proposal, tasks: updatedTasks }
      }
      return proposal
    }))
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="md:w-1/4">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage onClick = {handleUserProfile} src="/placeholder.svg" alt="John Doe" />
                  <AvatarFallback onClick = {handleUserProfile}>JD</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Proposals Created: 15</p>
                <p>Active Proposals: 5</p>
                <p>Completed Proposals: 10</p>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6">Proposals You are Working On</h2>
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="mb-6 hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Posted by: {proposal.postedBy}</p>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted on: {proposal.postingDate}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{proposal.details}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Sectors</h4>
                    <div className="flex flex-wrap gap-2">
                      {proposal.sectors.map((sector, index) => (
                        <Badge key={index} variant="secondary">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {proposal.techSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold mb-2">Due Date</h4>
                      <p>{proposal.dueDate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Attachments</h4>
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
                    <h4 className="font-semibold mb-2">Bandwidth Utilization</h4>
                    <Progress value={(proposal.tasks.filter(task => task.assignedTo).length / proposal.tasks.length) * 100} className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">
                      {proposal.tasks.filter(task => task.assignedTo).length} out of {proposal.tasks.length} tasks assigned
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Task Completion</h4>
                    <Progress value={(proposal.tasks.filter(task => task.completed).length / proposal.tasks.length) * 100} className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">
                      {proposal.tasks.filter(task => task.completed).length} out of {proposal.tasks.length} tasks completed
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tasks</h4>
                    <div className="space-y-4">
                      {proposal.tasks.map((task) => (
                        <Card key={task.id} className={`p-4 ${task.assignedTo ? 'bg-white' : 'bg-gray-50'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-lg font-semibold">{task.name}</h5>
                            {task.assignedTo && (
                              <Badge variant="secondary" className="ml-2">
                                <Check className="h-4 w-4 mr-1" />
                                Assigned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mb-2">{task.description}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            {task.assignedTo ? `Assigned to: ${task.assignedTo}` : 'Unassigned'}
                          </p>
                          {task.assignedTo === 'You' && (
                            <div className="flex justify-between items-center mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFileUpload(proposal.id, task.id)}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Attach Files
                              </Button>
                              <Button
                                variant={task.completed ? "secondary" : "default"}
                                size="sm"
                                onClick={() => toggleTaskCompletion(proposal.id, task.id)}
                              >
                                {task.completed ? 'Completed' : 'Mark as Complete'}
                              </Button>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
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