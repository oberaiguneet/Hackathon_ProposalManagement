'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

export default function UserSignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    employeeNumber: '',
    designation: '',
    sectors: [],
    skills: []
  })

  const designations = [
    'Analyst',
    'Associate',
    'Consultant',
    'Assistant Manager',
    'Manager',
    'Associate Director',
    'Director',
    'Partner'
  ]

  const sectors = [
    'Retail', 'Finance', 'Healthcare', 'Technology', 'Education',
    'Manufacturing', 'Energy', 'Telecommunications', 'Automotive',
    'Real Estate', 'Hospitality', 'Agriculture', 'Media', 'Transportation'
  ]

  const skills = [
    'AI', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Blockchain',
    'Data Analytics', 'DevOps', 'IoT', 'Robotic Process Automation', 'Big Data',
    '5G', 'AR/VR', 'Quantum Computing', 'Edge Computing', 'Digital Transformation'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSectorChange = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }))
  }

  const handleSkillChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleRemoveSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.filter(s => s !== sector)
    }))
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log('Sign up attempted with:', formData)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">KPMG Proposal Manager</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Preferred Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeNumber">Employee Number</Label>
                <Input
                  id="employeeNumber"
                  name="employeeNumber"
                  type="text"
                  placeholder="Enter your employee number"
                  value={formData.employeeNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Select
                  value={formData.designation}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, designation: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((designation) => (
                      <SelectItem key={designation} value={designation}>
                        {designation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sectors</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.sectors.map((sector) => (
                    <div key={sector} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                      {sector}
                      <button
                        type="button"
                        onClick={() => handleRemoveSector(sector)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {formData.sectors.length > 0 ? `${formData.sectors.length} selected` : 'Select Sectors'}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                      {sectors.map((sector) => (
                        <div key={sector} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sector-${sector.toLowerCase()}`}
                            checked={formData.sectors.includes(sector)}
                            onCheckedChange={() => handleSectorChange(sector)}
                          />
                          <label htmlFor={`sector-${sector.toLowerCase()}`}>{sector}</label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Technical Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {formData.skills.length > 0 ? `${formData.skills.length} selected` : 'Select Skills'}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={() => handleSkillChange(skill)}
                          />
                          <label htmlFor={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}>{skill}</label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center">
              <span>Already have an account? </span>
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                Log In
              </Link>
            </div>
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