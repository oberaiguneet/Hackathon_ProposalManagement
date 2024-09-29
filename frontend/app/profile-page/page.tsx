'use client'

import { useState } from 'react'
import { Bell, User, Plus, X,LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ProfilePageComponent() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@kpmg.com",
    employeeNumber: "EMP12345",
    designation: "Senior Consultant",
    username: "johndoe",
    sectors: ["Retail", "Finance", "Healthcare"],
    technicalSkills: ["AI", "Cloud Computing", "Big Data", "Cybersecurity"]
  })

  const handleNotification = () => {
    router.push('/notification-page');  // Redirects to the proposal notification page
  };

  const [newSector, setNewSector] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const addSector = () => {
    if (newSector && !profile.sectors.includes(newSector)) {
      setProfile({ ...profile, sectors: [...profile.sectors, newSector] })
      setNewSector("")
    }
  }

  const removeSector = (sector) => {
    setProfile({ ...profile, sectors: profile.sectors.filter(s => s !== sector) })
  }

  const addSkill = () => {
    if (newSkill && !profile.technicalSkills.includes(newSkill)) {
      setProfile({ ...profile, technicalSkills: [...profile.technicalSkills, newSkill] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill) => {
    setProfile({ ...profile, technicalSkills: profile.technicalSkills.filter(s => s !== skill) })
  }

  const saveChanges = () => {
    // Implement save functionality here
    console.log("Saving profile changes:", profile)
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
            <User className="h-6 w-6 cursor-pointer" />
            <Link href="/login" passHref>
            <Button variant="ghost" size="icon" className="text-white hover:text-blue-200">
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Logout</span>
            </Button>
          </Link>
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
                  <AvatarImage src="/placeholder.svg" alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{profile.name}</CardTitle>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile.email} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="employeeNumber">Employee Number</Label>
                    <Input id="employeeNumber" value={profile.employeeNumber} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" value={profile.designation} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={profile.username} readOnly />
                  </div>
                </div>

                <div>
                  <Label>Sectors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.sectors.map((sector, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {sector}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => removeSector(sector)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <Input
                      placeholder="Add new sector"
                      value={newSector}
                      onChange={(e) => setNewSector(e.target.value)}
                      className="mr-2"
                    />
                    <Button onClick={addSector}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Technical Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.technicalSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <Input
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="mr-2"
                    />
                    <Button onClick={addSkill}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveChanges} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
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