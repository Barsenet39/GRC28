import './globals.css'; // global styles

export const metadata = {
  title: 'Cyber Risk Management',
  description: 'Modern cyber risk management platform for enterprises',
};

export const viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
