"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  BriefcaseIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  ClipboardListIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import Cookies from "js-cookie";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState(null);

  useEffect(() => {
    const storedLetter = Cookies.get("firstLetter");
    if (storedLetter) setFirstLetter(storedLetter);

    const handleUpdate = () => {
      const updated = Cookies.get("firstLetter");
      if (updated) setFirstLetter(updated);
    };

    window.addEventListener("firstLetterUpdated", handleUpdate);
    return () => window.removeEventListener("firstLetterUpdated", handleUpdate);
  }, []);

  const handleLogout = () => {
    Cookies.remove("firstLetter");
    setFirstLetter(null);
    router.push("/");
 };

  const handleMyAccount = () => {
    router.push("/account");
   };

   const navLinks = [
    ["Home", "/Customer/home", HomeIcon],
    ["Service", "#services", BriefcaseIcon],
    ["Help", "#how-to-apply", QuestionMarkCircleIcon],
    ["Contact", "#contact", PhoneIcon],
    ...(firstLetter
      ? [
          ["Requests", "/Customer/Requests", ClipboardListIcon],
          
        ]
      : []),
   ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 dark:text-white dark:hover:text-purple-400 transition"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button
                  onClick={() => router.push("/Customer/Package")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
                >
                  Get Started
                </button>
            {firstLetter ? (
              <div className="relative group">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {firstLetter}
                </div>

                {/* Dropdown */}
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50"
                  >
                    <button
                      onClick={handleMyAccount}
                      className="w-full text-left text-sm px-4 py-2 text-gray-700 hover:bg-purple-50 dark:text-white dark:hover:bg-gray-700 transition"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-sm px-4 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                
               
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ rotate: 0 }}
                animate={{ rotate: isMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 rounded-lg mt-2 shadow-lg space-y-3"
            >
              {navLinks.map(([label, href, Icon]) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </a>
              ))}
              <div className="pt-4">
                {firstLetter ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 py-2 px-4 rounded-full transition"
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={handleMyAccount}
                      className="w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-purple-50 dark:text-white dark:hover:bg-gray-700 py-2 px-4 rounded-full transition"
                    >
                      My Account
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/signin")}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() => router.push("/signup")}
                      className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition mt-2"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
