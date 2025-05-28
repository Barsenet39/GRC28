"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  // Retrieve the token from the URL
  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    // const email = searchParams.get("email");
    const tokenParams = searchParams.get("token");
    const emailParams = searchParams.get("email");

    if (tokenParams && emailParams) {
      const decodedEmail = decodeURIComponent(emailParams);
      setToken(tokenParams);
      setEmail(decodeURIComponent(decodedEmail));
    } else {
      toast.error("Invalid or expired link.");
    }
  }, [searchParams]);
  console.log("token", token);
  console.log("email", email);
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (!newPassword || !confirmPassword) {
      toast.error("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check if the token exists

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/reset-password",
        { token, newPassword, confirmPassword, email }
      );
      toast.success("The password has been reset successfully."); // Custom success message

      router.push("/sign-in"); // Redirect to login page after password reset
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // Display error message as toast
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50 px-4 lg:px-8 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] bg-blue-300/50 blur-2xl rounded-full"></div>
      </div>

      <div className="flex flex-col items-center bg-gradient-to-r from-blue-100 via-white to-blue-50 p-6 shadow-2xl rounded-3xl z-10 w-full max-w-xs lg:max-w-md">
        <h1 className="text-xl lg:text-2xl font-bold mb-3">
          Reset Your Password
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mb-4">
          Enter your new password
        </p>

        <form
          className="w-full space-y-3 lg:space-y-4"
          onSubmit={handleResetPassword}
        >
          <div>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full flex justify-center mt-4">
            <button
              type="submit"
              className="w-auto bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ResetPassword;
