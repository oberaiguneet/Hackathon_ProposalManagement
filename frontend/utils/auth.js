import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  return { isAuthenticated, isLoading };
};

export const login = async (username, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user_id', data.user._id);
  return data.user;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id', data.user._id);
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  const user_id = localStorage.getItem('user_id');
  return {
    'Authorization': `Bearer ${token}`,
    'user_id': user_id
  };
};