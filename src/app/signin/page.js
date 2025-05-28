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

    try {
      const response = await axios.post(
        'http://localhost:5000/api/signin',
        { email, password },
        { withCredentials: true }
      );

      const user = response.data;
      console.log('User role received:', user.role);

      const role = user.role;

      switch (role) {
        case 'customer':
          router.push('/Customer/home');
          break;
        case 'Director_General':
          router.push('/DirectorGeneral/dashboard');
          break;
        case 'Deputy_Director':
          router.push('/Deputy_Director/dashboard');
          break;
        case 'Directorate_Director1':
          router.push('/dashboard2');
          break;
        case 'Directorate_Director2':
          router.push('/dashboard3');
          break;
        case 'Division_Head_CSM':
          router.push('/dashboard4');
          break;
        case 'Division_Head_CSRM':
          router.push('/dashboard5');
          break;
        case 'Division_Head2':
          router.push('/dashboard6');
          break;
        case 'Expert':
        case 'Technical_Manager':
        case 'Project_Manager':
          router.push('/dashboard');
          break;
        default:
          setErrorMessage('Unauthorized role. Please contact support.');
          break;
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to sign in. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden p-6 md:p-10 mt-[-80px] bg-white shadow-md rounded-lg">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <img src="/backgroundimage.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h2 className="text-3xl font-bold text-gray-900">WELCOME</h2>
          </div>

          <p className="text-gray-600 text-center mb-6">Please enter your details to sign in.</p>

          {errorMessage && (
            <motion.div
              className="mb-4 text-red-600 text-center text-sm font-medium p-3 bg-red-100 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errorMessage}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                Email
              </label>
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
              <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                Password
              </label>
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

            <div className="flex justify-between items-center mt-4 text-sm">
              <a href="/Forget_Password" className="text-blue-600 hover:underline">
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
        <div className="hidden md:flex items-center justify-center w-1/2 p-4">
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
