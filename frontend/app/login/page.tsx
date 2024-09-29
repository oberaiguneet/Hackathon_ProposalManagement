'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { login } from '@/utils/auth';

export default function UserLoginPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password);
      router.push('/landing-page');
    } catch (e) {
      setError('Error fetching proposals. Please try again later.');
      setIsAuthenticated(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">KPMG Proposal Manager</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">User Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button onClick={handleLogin} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot Password?
            </Link>
            <div className="text-center">
              <span>Don't have an account? </span>
              <Link href="/signup" className="text-blue-600 hover:text-blue-800">
                Sign Up
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