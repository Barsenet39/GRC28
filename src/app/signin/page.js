'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sign-in data:', { email, password });

    try {
      // Send the POST request for signing in
      const response = await axios.post(
        'http://localhost:5000/api/signin', 
        { email, password },
        { withCredentials: true }
      );
      console.log('Sign-in response:', response);

      // After successful sign-in, fetch user info
      const meResponse = await axios.get('http://localhost:5000/api/me', {
        withCredentials: true,
      });

      const user = meResponse.data.user;
      const firstLetter = user.fullName?.charAt(0).toUpperCase();

      if (firstLetter) {
        Cookies.set('firstLetter', firstLetter);
        window.dispatchEvent(new Event('firstLetterUpdated'));
      }

      // Navigate to Package page after successful login and data fetch
      router.push('/Package'); // Direct navigation

    } catch (error) {
      console.error('Sign-in error:', error);

      // Handle errors (e.g. incorrect credentials, server error)
      if (error.response) {
        console.error('Response error data:', error.response.data);
        setErrorMessage(error.response.data.message || 'Invalid credentials, please try again.');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden relative z-10 p-6 md:p-10 mt-[-80px]">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <img
              src="/backgroundimage.png"
              alt="Insa Logo"
              className="h-10 w-10 object-contain"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              WELCOME
            </h2>
          </div>

          <p className="text-gray-600 text-center mb-6">Please enter your details to sign in.</p>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-center text-sm">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-center items-center space-x-12 mt-4 text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
              <p className="text-gray-700">
                Don’t have an account?{' '}
                <a href="/signup" className="text-purple-600 hover:underline font-semibold">
                  Sign up
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500 transition mt-6"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Section - Animated Image */}
        <div className="hidden md:flex items-center justify-center bg-white w-1/2 p-4">
          <motion.img
            src="/signin1.png"
            alt="Signin Illustration"
            className="w-72 h-72 object-cover"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
