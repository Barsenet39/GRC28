// Correct way: Don't render <html> or <body> here.
export default function SignupLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {children}
    </div>
  );
}
