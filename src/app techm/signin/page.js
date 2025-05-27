// src/app/signin/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your sign-in logic here (e.g., authentication)
    // After successful sign-in, navigate to the response page
    router.push('/response');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Background Image */}
      <img 
        src="/backgroundimage.png" // Update with the correct image path
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      />

      {/* Container for Form and Image */}
      <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden relative z-10 p-6 md:p-8">
        {/* Left Side: Sign In Form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="/backgroundimage.png" // Update with the correct logo path
              alt="Insa Logo"
              className="h-10 mb-2"
            />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              WELCOME
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-6">Please enter your details.</p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500 transition">
              Log In
            </button>
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          </form>
        </div>

        {/* Right Side: Centered Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 p-4">
          <img 
            src="/backgroundimage.png" 
            alt="Description of the image" 
            className="w-32 h-32 object-cover" 
          />
        </div>
      </div>
    </div>
  );
}