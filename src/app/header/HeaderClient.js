'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './page'; // Your existing Header component

export default function HeaderClient() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Set isMounted to true after the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define routes where the header should NOT show
  const hideHeaderRoutes = ['/signin', '/signup'];

  if (!isMounted) {
    return null; // Don't render until after mounting
  }

  return (
    <div className={hideHeaderRoutes.includes(pathname) ? 'hidden' : ''}>
      <Header /> {/* Always render the header but hide on specific routes */}
    </div>
  );
}
