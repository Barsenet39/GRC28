"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeIcon, BriefcaseIcon, PhoneIcon, QuestionMarkCircleIcon, ClipboardListIcon } from '@heroicons/react/outline';

const View = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState(null);

  // When page loads, check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLetter = localStorage.getItem('firstLetter');
      if (storedLetter) {
        setFirstLetter(storedLetter);
      }
    }
  }, []);

  const handleGetStarted = () => router.push("/signin");
  const handleSignUp = () => router.push("/signup");

  const handleLogout = () => {
    localStorage.removeItem('firstLetter');  // Remove the firstLetter from localStorage
    setFirstLetter(null);                    // Update the local state
    router.push('/');                        // Go back to Home
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 md:h-12 w-auto"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              ["Home", "/", HomeIcon],
              ["Service", "#services", BriefcaseIcon],
              ["Help", "#how-to-apply", QuestionMarkCircleIcon],
              ["Contact", "#contact", PhoneIcon],
              ...(firstLetter ? [["Requests", "/Requests", ClipboardListIcon]] : []), // Show Requests only after login
            ].map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                className="relative nav-link text-gray-700 hover:text-purple-600 dark:text-white dark:hover:text-purple-400 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Icon className="text-gray-600 dark:text-white h-5 w-5" />
                <span>{label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Buttons or User Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {firstLetter ? (
              <div className="relative group">
                <div className="rounded-full bg-blue-600 text-white text-lg w-10 h-10 flex items-center justify-center cursor-pointer">
                  {firstLetter}
                </div>
                {/* Logout Button shown on hover */}
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleGetStarted}
                  className="btn-primary bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full shadow-sm transition"
                >
                  Get Started
                </button>
                <button
                  onClick={handleSignUp}
                  className="btn-secondary border border-purple-600 text-purple-600 px-5 py-2 rounded-full hover:bg-purple-50 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <motion.svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ rotate: 0 }}
                animate={{ rotate: isMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg"
            >
              <div className="flex flex-col px-6 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                {[
                  ["Home", "/", HomeIcon],
                  ["Service", "#services", BriefcaseIcon],
                  ["Help", "#how-to-apply", QuestionMarkCircleIcon],
                  ["Contact", "#contact", PhoneIcon],
                  ...(firstLetter ? [["Requests", "/requests", ClipboardListIcon]] : []),
                ].map(([label, href, Icon]) => (
                  <a
                    key={label}
                    href={href}
                    className="py-2 text-gray-700 hover:text-purple-600 dark:text-white dark:hover:text-purple-400 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <Icon className="text-gray-600 dark:text-white h-5 w-5" />
                    <span>{label}</span>
                  </a>
                ))}

                {/* Mobile buttons */}
                <div className="pt-4 space-y-2">
                  {firstLetter ? (
                    <button
                      onClick={handleLogout}
                      className="w-full btn-secondary border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleGetStarted}
                        className="w-full btn-primary bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition"
                      >
                        Get Started
                      </button>
                      <button
                        onClick={handleSignUp}
                        className="w-full btn-secondary border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};

export default View;
