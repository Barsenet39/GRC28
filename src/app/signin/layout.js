// app/signin/layout.js (or app/signin/layout.jsx)

export const viewport = {
  themeColor: '#ffffff', // Set your desired theme color here
};

export default function SignUpLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
