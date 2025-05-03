"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaLock, FaIdCard } from 'react-icons/fa';  // Importing icons

const SignupPage = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
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
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('❌ Passwords do not match.');
      return;
    }

    axios.post('http://localhost:5000/api/signup', formData)
      .then((response) => {
        // Store the first letter of full name in localStorage
        localStorage.setItem('companyName', formData.companyName);
        localStorage.setItem('firstLetter', formData.fullName.charAt(0).toUpperCase());
        setSuccessMessage('🎉 You have signed up successfully!');
        setErrorMessage('');
        router.push("/");  // Navigate to the home page after successful signup
      })
      .catch((error) => {
        console.error('There was an error!', error.response);
        setErrorMessage(error.response?.data?.message || '❌ There was a problem with signup. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative rounded-lg shadow-xl p-8 w-full max-w-4xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-0">Create Your Account</h2>
          </div>
          <p className="text-lg text-gray-600 mb-4">Please enter your details to sign up.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="fullName">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="companyName">Company Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaBuilding className="text-gray-500 mr-3" />
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="email">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="phone">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaPhone className="text-gray-500 mr-3" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="password">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="confirmPassword">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="tinNumber">TIN Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaIdCard className="text-gray-500 mr-3" />
                <input
                  type="text"
                  id="tinNumber"
                  name="tinNumber"
                  value={formData.tinNumber}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2 text-sm" htmlFor="businessType">Business Type</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaBuilding className="text-gray-500 mr-3" />
                <input
                  type="text"
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full mt-6"
          >
            Sign Up
          </button>
        </form>

        {/* Success/Failure Messages */}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <p className="text-center mt-6 text-gray-700 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:text-blue-800">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
