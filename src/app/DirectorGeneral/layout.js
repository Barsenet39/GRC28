'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar/page'; // Adjust path as needed
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isSignInPage = pathname === '/signin';
  const isHomePage = pathname === '/';
  const isResponsePage = pathname === '/response';

  const showSidebar = !(isSignInPage || isHomePage || isResponsePage);

  return (
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
  );
}
