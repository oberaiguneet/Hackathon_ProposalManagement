'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Search, User, Filter, ChevronDown,LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/auth'

interface Proposal {
  _id: string;
  title: string;
  details: string;
  dueDate: Date;
  listingDate: Date;
  sector: string;
  techSkills: string;
  coordinator: string;
  attachments: string;
}

export default function LandingPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
  //  const [proposals, setProposals] = useState([
  //   { id: 1, title: "Digital Transformation for Retail", dueDate: "2023-12-15", listingDate: "2023-11-01", sector: "Retail", techSkills: "AI, Cloud", coordinator: "John Doe" },
  //   { id: 2, title: "Financial Services Cybersecurity", dueDate: "2023-12-20", listingDate: "2023-11-05", sector: "Finance", techSkills: "Cybersecurity, Blockchain", coordinator: "Jane Smith" },
  //   { id: 3, title: "Healthcare Data Analytics", dueDate: "2023-12-25", listingDate: "2023-11-10", sector: "Healthcare", techSkills: "Big Data, Machine Learning", coordinator: "Alice Johnson" },
  // ])
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProposals();
    }
  }, [isAuthenticated]);

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/proposals', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
      if (!response.ok) {
        throw new Error('Failed to fetch proposals');
      }
      const data = await response.json();
      setProposals(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching proposals. Please try again later.');
      setLoading(false);
    }
  };

const handleUserProfile = () => {
    router.push('/profile-page');  // Redirects to the proposal application page
  };
  const handleNotification = () => {
    router.push('/notification-page');  // Redirects to the proposal notification page
  };
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative">
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
            <Bell onClick={handleNotification} className="h-6 w-6 cursor-pointer" />
            <User onClick={handleUserProfile} className="h-6 w-6 cursor-pointer" />
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
              <CardHeader  className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage onClick={handleUserProfile} src="/placeholder.svg" alt="John Doe" />
                  <AvatarFallback onClick={handleUserProfile}>JD</AvatarFallback>
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
          <div className="md:w-1/2">
            {proposals.map((proposal) => (
              <Card key={proposal._id} className="mb-4 hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{proposal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Due Date:</strong> {new Date(proposal.dueDate).toDateString()}</p>
                  <p><strong>Listed:</strong> {new Date(proposal.listingDate).toDateString()}</p>
                  <p><strong>Sector:</strong> {proposal.sector.toString()}</p>
                  <p><strong>Tech Skills:</strong> {proposal.techSkills.toString()}</p>
                  <p><strong>Coordinator:</strong> {proposal.coordinator}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href="/proposal-application" passHref>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Apply
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <aside className="md:w-1/4">
            <Card className="bg-white shadow-lg border-none">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="flex items-center">
                  <Filter className="mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Select Sector
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Select Tech Stack
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
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bigdata" />
                        <label htmlFor="bigdata">Big Data</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="machinelearning" />
                        <label htmlFor="machinelearning">Machine Learning</label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </aside>
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

      {/* Floating Create Button */}
      <Link href="/proposal-creation" passHref>
        <Button
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Create new proposal"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}