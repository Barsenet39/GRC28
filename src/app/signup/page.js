"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaLock, FaIdCard } from 'react-icons/fa';

const SignupPage = () => {
  const router = useRouter();

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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('❌ Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      const { userId } = response.data;

      if (userId) {
        setSuccessMessage('🎉 You have signed up successfully!');
        setErrorMessage('');
        // Redirect to View page with userId in query parameter
        router.push(`/view?userId=${encodeURIComponent(userId)}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.response?.data?.message || '❌ Signup failed. Try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative rounded-lg shadow-xl p-8 w-full max-w-4xl bg-white border border-gray-200">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Create Your Account</h2>
          </div>
          <p className="text-lg text-gray-600">Please enter your details to sign up.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "fullName", icon: FaUser, type: "text" },
              { label: "Company Name", name: "companyName", icon: FaBuilding, type: "text" },
              { label: "Email Address", name: "email", icon: FaEnvelope, type: "email" },
              { label: "Phone Number", name: "phone", icon: FaPhone, type: "tel" },
              { label: "Password", name: "password", icon: FaLock, type: "password" },
              { label: "Confirm Password", name: "confirmPassword", icon: FaLock, type: "password" },
              { label: "TIN Number", name: "tinNumber", icon: FaIdCard, type: "text" },
              { label: "Business Type", name: "businessType", icon: FaBuilding, type: "text" },
            ].map(({ label, name, icon: Icon, type }) => (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block text-gray-800 mb-2 text-sm">{label}</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-4">
                  <Icon className="text-gray-500 mr-3" />
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full mt-6"
          >
            Sign Up
          </button>
        </form>

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