// ClientLayout.js
'use client'; // This file is a client component
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
    useEffect(() => {
        // Client-specific logic here
    }, []);

    return <>{children}</>; // Just render children or add client-specific UI
}