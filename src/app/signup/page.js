// src/app/signup/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure you are using this import correctly
import axios from 'axios';

const SignupPage = () => { // Ensure the component name is capitalized (React convention)
  const router = useRouter(); // Call this inside the component function
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tinNumber: '',
    businessType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to the backend using axios or fetch
    axios.post('http://localhost:5000/api/signup', formData)
    .then((response) => {
      console.log('Signup successful', response.data);
      setSuccessMessage('🎉 You have signed up successfully!');
    })
    .catch((error) => {
      console.error('There was an error!', error.response); // Log the full error response
      if (error.response) {
        // Log the error details from the server
        console.log('Error Response:', error.response.data);
        setSuccessMessage(`❌ ${error.response.data.message || 'There was a problem with signup. Please try again.'}`);
      } else {
        // If no response is received
        setSuccessMessage('❌ Network error. Please try again later.');
      }
    });
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className="rounded-lg shadow-lg p-8 w-full max-w-4xl mt-8" 
        style={{
          backgroundImage: 'url("/backgroundimage1.png")', // Use url() for background image
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/logo.png" // Replace with your logo URL
            alt="Logo"
            className="mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        </div>
        <p className="text-center mb-4 text-gray-700">Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="organization">Name of Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="phone">Company Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="tinNumber">Tin Number</label>
              <input
                type="text"
                id="tinNumber"
                name="tinNumber"
                value={formData.tinNumber}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2" htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-lg p-2 w-full text-gray-800"
              >
                <option value="">Select Business Type</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
                <option value="Type3">Type 3</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4">
            Sign Up
          </button>
        </form>

         {/* Success Message */}
         {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center">
            {successMessage}
          </div>
        )}
        <p className="text-center mt-4 text-gray-700">
          Already Registered? <a href="/signin
          " className="text-blue-600">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
