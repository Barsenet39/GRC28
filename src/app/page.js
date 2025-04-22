// src/app/page.js
import SignIn from './home/page'; // Import SignIn page

export default function Home() {
  return (
    <div>
      {/* Render the SignIn page inside the Home page */}
      <SignIn />
    </div>
  );
}
