'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  PlusIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  LogoutIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleLogout = () => setShowLogout(!showLogout);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear auth here if needed
    router.push('/signin');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-16'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} h-full fixed left-0 top-0 p-4 shadow-lg transition-all duration-300`}>
      <div className="flex flex-col justify-between h-full pb-4 w-full">
        <div>
          <div className="flex items-center justify-between mb-6 cursor-pointer">
            <img 
              src="./backgroundimage.png" 
              alt="Logo" 
              className={`h-16 w-auto transition-all duration-300 ${isOpen ? 'block' : 'hidden'} mx-auto`} 
            />
            <MenuIcon className={`w-6 h-6 cursor-pointer ${isOpen ? 'hidden' : 'block'} md:hidden`} onClick={toggleSidebar} />
            <XIcon className={`w-7 h-7 cursor-pointer ${isOpen ? 'block' : 'hidden'} md:hidden`} onClick={toggleSidebar} />
          </div>
          <ul>
            <li className="mb-4 flex items-center">
              <HomeIcon className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
              <a href="/DirectorGeneral/dashboard" className={`text-lg hover:text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>Dashboard</a>
            </li>
            <li className="mb-4 flex items-center">
              <PlusIcon className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-green-500'}`} />
              <a href="/DirectorGeneral/new-request" className={`text-lg hover:text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>New Request</a>
              {isOpen && <span className="ml-2 bg-red-500 rounded-full text-xs px-2 text-white">49</span>}
            </li>
            <li className="mb-4 flex items-center">
              <DocumentTextIcon className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
              <a href="/DirectorGeneral/request-status" className={`text-lg hover:text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>Requests Status</a>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className={`text-lg font-bold mb-2 ${isOpen ? 'block' : 'hidden'}`}>Settings</h3>
          <ul>
            <li className="mb-4 flex items-center relative">
              <GlobeAltIcon 
                className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-teal-500'}`} 
                onClick={toggleDropdown} 
              />
              <button className={`text-lg hover:text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>{selectedLanguage}</button>
              {isDropdownOpen && (
                <div className="absolute mt-1 w-32 bg-white rounded-md shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => handleLanguageChange('EN')}
                  >
                    English
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => handleLanguageChange('AMH')}
                  >
                    Amharic
                  </button>
                </div>
              )}
            </li>
            <li className="mb-4 flex items-center">
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 mr-2 text-yellow-500" onClick={toggleDarkMode} />
              ) : (
                <MoonIcon className="w-6 h-6 mr-2 text-gray-400" onClick={toggleDarkMode} />
              )}
              <span className={`text-lg hover:text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </li>

            <li className="mb-4 flex flex-col items-start">
              <div className="flex items-center justify-between w-full cursor-pointer" onClick={toggleLogout}>
                <div className="flex items-center">
                  <UserIcon className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-purple-600'}`} />
                  <div className={`${isOpen ? 'block' : 'hidden'}`}>
                    <div className="text-lg hover:text-gray-600">Barenet Asfaw</div>
                    <div className="text-sm">Director General</div>
                  </div>
                </div>
                {isOpen && (
                  <LogoutIcon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-red-600'}`} />
                )}
              </div>

              {isOpen && showLogout && (
                <button
                  onClick={handleLogout}
                  className="mt-2 ml-8 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
