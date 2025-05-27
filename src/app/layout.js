import './globals.css'; // Global styles
import HeaderClient from './header/HeaderClient'; // Import the HeaderClient component
import ClientLayout from './ClientLayout'; // Ensure this import is correct

// Correct placement for themeColor and viewport
export const viewport = {
  themeColor: '#3b82f6', // This is the correct place for themeColor
 width: "device-width",
  initialScale: 1,

};

export const metadata = {
  title: 'Cyber Risk Management',
  description: 'Modern cyber risk management platform for enterprises',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background">
        <HeaderClient />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
