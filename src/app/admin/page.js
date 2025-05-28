'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

const roles = [
    'customer',
  'Director_General',  // <--- use spaces, matching backend enum
  'Deputy_Director',
  'Directorate_Director1',
  'Directorate_Director2',
  'Division_Head_CSM',
  'Division_Head_CSRM',
  'Division_Head2',
  'Expert',
  'Technical_Manager',
  'Project_Manager',
];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const normalizedEmail = email.toLowerCase();

    try {
      console.log('📤 Sending admin register data:', {
        firstName,
        lastName,
        email: normalizedEmail,
        role,
      });

      const response = await axios.post(
        'http://localhost:5000/api/signup',
        {
          firstName,
          lastName,
          email: normalizedEmail,
          password,
          confirmPassword,
          role,
        },
        { withCredentials: true }
      );

      console.log('✅ Admin register response:', response.data);
      setSuccessMessage(`${role === 'customer' ? 'User' : 'Admin'} registered successfully!`);
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (error) {
      console.error('❌ Registration error:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Admin Registration</h2>

        {errorMessage && (
          <motion.div
            className="mb-4 text-red-600 text-center bg-red-100 p-3 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errorMessage}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            className="mb-4 text-green-700 text-center bg-green-100 p-3 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-black"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
