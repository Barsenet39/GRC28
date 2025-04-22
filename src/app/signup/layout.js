"use client"; // Required for interactive client-side components

import { useEffect, useState } from 'react';
import HeaderClient from '../header/HeaderClient'; // Adjust the path if necessary

const RootLayout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background">
        <HeaderClient />
        {isClient && <div>{children}</div>} {/* Render children only on the client */}
      </body>
    </html>
  );
};

export default RootLayout;