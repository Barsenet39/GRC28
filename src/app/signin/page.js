'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signin', {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      router.push('/response');
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 relative">
      <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden relative z-10 p-6 md:p-8">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="/backgroundimage.png"
              alt="Insa Logo"
              className="h-16 mb-2"
            />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              WELCOME
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-6">Please enter your details.</p>
          {errorMessage && (
            <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500 transition">
              Log In
            </button>
          </form>
        </div>
        <div className="hidden md:flex items-center justify-center w-1/2 p-4">
          <img 
            src="/signin.png" 
            alt="Description of the image" 
            className="w-68 h-68 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
