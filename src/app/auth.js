"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import jwtDecode from "jwt-decode"; // Ensure you have jwt-decode installed

export function Auth({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = Cookies.get("userToken")?.trim();

    // Define public paths that should not trigger a redirect if visited without a token
    const publicPaths = [
      "/sign-in",
      "/sign-up",
      "/otp-confirmation",
      "/reset-password",
      "/forget-password",
      "/landing-page"
    ];

    // Get the current path
    const currentPath = window.location.pathname;

    // If there's no token and we're on a restricted path, redirect to sign-in
    if (!token && !publicPaths.includes(currentPath)) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }

    // If the token exists, validate it with the backend
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.userType;

        // Redirect based on user role
        if (role === "Customer") {
          router.push("/customer");
        } else if (role === "GeneralD") {
          router.push("/generaldirector");
        } else if (role === "SubGeneralD") {
          router.push("/deputydirector");
        } else if (role === "DD") {
          router.push("/directoratedirector");
        } else if (role === "DH") {
          router.push("/divisionhead");
        } else {
          router.push("/error");
        }
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/sign-in");
      }
    }

    setLoading(false); // End loading state after all logic is done
  }, [router]);
  // If the component is still loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} color={"#123abc"} />
      </div>
    );
  }

  return <>{children}</>;
}
