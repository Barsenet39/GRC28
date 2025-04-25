"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const View = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => router.push("/signin");
  const handleSignUp    = () => router.push("/sign-up");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
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
              ["Home",    "/"],
              ["Service", "#services"],
              ["Help",    "#how-to-apply"],
              ["Contact", "#contact"],
              ["Requests","/requests"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative nav-link text-gray-700 hover:text-purple-600 transition-colors"
              >
                {label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 transition"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col px-4 pb-4 space-y-3 border-t border-gray-200">
                {[
                  ["Home",    "/"],
                  ["Service", "#services"],
                  ["Help",    "#how-to-apply"],
                  ["Contact", "#contact"],
                  ["Requests","/requests"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {label}
                  </a>
                ))}
                <div className="pt-4 space-y-2">
                  <button
                    onClick={handleGetStarted}
                    className="w-full btn-primary bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full btn-secondary border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50"
                  >
                    Sign Up
                  </button>
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
