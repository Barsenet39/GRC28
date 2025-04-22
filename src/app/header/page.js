"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter(); // Initialize the router
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    router.push("/signin"); // Redirect to the SignIn page
  };

  const handleSignUp = () => {
    router.push("/sign-up"); // Redirect to the SignUp page
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="./logo.png" // Replace with your logo URL
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Service</a>
            <a href="#how-to-apply" className="nav-link">Help</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="/Requests" className="nav-link">Requests</a> {/* Added Requests link */}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleGetStarted} // Redirect to SignIn
              className="btn-primary"
            >
              Get Started
            </button>
            <button 
              onClick={handleSignUp}
              className="btn-secondary"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-accent focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-4">
                <div className="flex-shrink-0">
                  <img 
                    src="./logo.png" // Replace with your logo URL
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-accent focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="/" className="nav-link px-4 py-2">Home</a>
                <a href="#services" className="nav-link px-4 py-2">Service</a>
                <a href="#how-to-apply" className="nav-link px-4 py-2">Help</a>
                <a href="#contact" className="nav-link px-4 py-2">Contact</a>
                <a href="/requests" className="nav-link px-4 py-2">Requests</a> {/* Added Requests link */}
                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-border">
                  <button 
                    onClick={handleGetStarted}
                    className="btn-primary w-full"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={handleSignUp}
                    className="btn-secondary w-full"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default View;