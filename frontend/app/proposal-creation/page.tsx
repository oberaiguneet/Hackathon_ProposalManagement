'use client'

import { useState } from 'react'
import { Bell, User, ChevronDown, Paperclip, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ProposalCreationPageComponent() {
  const router = useRouter();
  const [tasks, setTasks] = useState([{ id: 1, name: '', description: '' }])

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, name: '', description: '' }])
  }

  const handleUserProfile = () => {
    router.push('/profile-page');  // Redirects to the proposal application page
  };
  const handleNotification = () => {
    router.push('/notification-page');  // Redirects to the proposal notification page
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
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
            <Bell onClick = {handleNotification}className="h-6 w-6 cursor-pointer" />
            <User onClick = {handleUserProfile}className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New Proposal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="proposalName">Proposal Name</Label>
              <Input id="proposalName" placeholder="Enter proposal name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposalDetails">Proposal Details</Label>
              <Textarea id="proposalDetails" placeholder="Enter proposal details" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Sector</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select Sectors
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="retail" />
                      <label htmlFor="retail">Retail</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="finance" />
                      <label htmlFor="finance">Finance</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="healthcare" />
                      <label htmlFor="healthcare">Healthcare</label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Technical Skills Required</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select Technical Skills
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ai" />
                      <label htmlFor="ai">AI</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cloud" />
                      <label htmlFor="cloud">Cloud</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cybersecurity" />
                      <label htmlFor="cybersecurity">Cybersecurity</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="blockchain" />
                      <label htmlFor="blockchain">Blockchain</label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <div className="flex items-center space-x-2">
                <Input id="attachments" type="file" multiple className="hidden" />
                <Button variant="outline" onClick={() => document.getElementById('attachments').click()}>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Attachments
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Task Details</Label>
              {tasks.map((task, index) => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">Task {index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeTask(task.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Task Name" value={task.name} onChange={(e) => {
                      const newTasks = [...tasks]
                      newTasks[index].name = e.target.value
                      setTasks(newTasks)
                    }} />
                    <Textarea placeholder="Task Description" value={task.description} onChange={(e) => {
                      const newTasks = [...tasks]
                      newTasks[index].description = e.target.value
                      setTasks(newTasks)
                    }} />
                  </div>
                </Card>
              ))}
              <Button variant="outline" onClick={addTask} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Publish Proposal
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