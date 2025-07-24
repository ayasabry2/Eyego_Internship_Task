'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/store';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(login(data));
        router.push('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-white overflow-hidden">
      <div className="relative hidden md:flex flex-col justify-center items-start px-12 w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 text-white z-10">
        <h1 className="text-5xl font-bold mb-6 leading-tight z-10">Eyego Internship Task</h1>
<p className="text-lg opacity-90 z-10">
  An interactive dashboard tailored for Eyego.
</p>


  
        <svg
          className="absolute top-0 right-0 h-full w-24 z-20"
          viewBox="0 0 100 500"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C40,100 60,400 100,500 L100,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-10 z-30">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Welcome Back</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-transparent outline-none w-full"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
