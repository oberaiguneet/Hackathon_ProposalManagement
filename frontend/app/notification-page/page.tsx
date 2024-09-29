'use client'

import { useState } from 'react'
import { Bell, User, FileText, UserPlus, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function NotificationPageComponent() {
    const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_attachment',
      message: 'Alice Johnson added a new attachment to "Digital Transformation for Retail" proposal.',
      timestamp: '2023-11-15T10:30:00Z',
      read: false,
    },
    {
      id: 2,
      type: 'proposal_update',
      message: 'The proposal "Financial Services Cybersecurity" you applied for has been updated.',
      timestamp: '2023-11-14T15:45:00Z',
      read: false,
    },
    {
      id: 3,
      type: 'task_assignment',
      message: 'You have been assigned a new task in the "Healthcare Data Analytics" proposal.',
      timestamp: '2023-11-13T09:00:00Z',
      read: true,
    },
    {
      id: 4,
      type: 'new_teammate',
      message: 'Bob Smith has joined the "Digital Transformation for Retail" proposal team.',
      timestamp: '2023-11-12T14:20:00Z',
      read: true,
    },
    {
      id: 5,
      type: 'task_completion',
      message: 'The task "Market Analysis" in "Digital Transformation for Retail" has been marked as complete.',
      timestamp: '2023-11-11T11:10:00Z',
      read: true,
    },
  ])
  const handleUserProfile = () => {
    router.push('/profile-page');  // Redirects to the proposal application page
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'new_attachment':
        return <FileText className="h-6 w-6 text-blue-500" />
      case 'proposal_update':
        return <RefreshCw className="h-6 w-6 text-green-500" />
      case 'task_assignment':
        return <UserPlus className="h-6 w-6 text-purple-500" />
      case 'new_teammate':
        return <User className="h-6 w-6 text-orange-500" />
      case 'task_completion':
        return <CheckCircle className="h-6 w-6 text-teal-500" />
      default:
        return <Bell className="h-6 w-6 text-gray-500" />
    }
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
            <Bell className="h-6 w-6 cursor-pointer" />
            <User  className="h-6 w-6 cursor-pointer" />
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
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`hover:shadow-md transition-shadow duration-200 ${notification.read ? 'bg-gray-50' : 'bg-white'}`}>
                  <CardContent className="flex items-start p-4">
                    <div className="mr-4 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <p className={`${notification.read ? 'text-gray-600' : 'text-gray-800 font-semibold'}`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      {!notification.read && (
                        <Badge variant="secondary" className="mr-2">New</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className={notification.read ? 'invisible' : ''}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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