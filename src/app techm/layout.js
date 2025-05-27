// src/app/layout.js
'use client'
import { usePathname } from 'next/navigation'; // Use usePathname to get the current path
import Sidebar from './sidebar/page'; // Sidebar component
import './globals.css'; // Include global styles

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current pathname
  const isSignInPage = pathname === '/signin'; // Check if it's the sign-in page
  const isHomePage = pathname === '/'; // Check if it's the home page
  const isResponsePage = pathname === '/response'; // Check if it's the response page

  // Hide the sidebar if we're on the home, sign-in, or response page
  const showSidebar = !(isSignInPage || isHomePage || isResponsePage);

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {showSidebar && <Sidebar />}
          <main
            className={`
              flex-1
              transition-all
              duration-300
              ${showSidebar ? 'ml-16 md:ml-64' : ''}
            `}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
