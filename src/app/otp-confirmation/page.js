"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const OTPConfirmation = () => {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [enteredemail, setEnteredEmail] = useState("");
  const router = useRouter();
const token = Cookies.get("userToken")?.trim();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!enteredemail) {
      toast.error("Email is required.");
      return;
    }

    if (!enteredOtp) {
      toast.error("OTP is required.");
      return;
    }

    try {
      // Ensure OTP is treated as a string before sending it to backend
      const otpString = enteredOtp.toString();
      const emailString = enteredemail.toString();

      // Send OTP to the backend for verification (without email)
      const response = await axios.post(
        "http://127.0.0.1:8080/api/users/verify-email-otp", // Update your backend URL if necessary
        { otp: otpString, email: emailString },
        { headers: { Authorization: `Bearer ${token}` } } // Send token as Bearer token in headers
      );

      toast.success(response.data.message); // Display success message as toast
      router.push("/sign-in"); // Redirect to the sign-in page after success
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
        <h1 className="text-xl lg:text-2xl font-bold mb-3">OTP Confirmation</h1>

        {/* <p className="text-sm lg:text-base text-gray-600 mb-4">
          Enter your OTP passcode
        </p> */}

        <form
          className="w-full space-y-3 lg:space-y-4"
          onSubmit={handleVerifyOtp}
        >
          <div>
            <input
              type="text"
              placeholder="Enter your Email"
              value={enteredemail}
              onChange={(e) => setEnteredEmail(e.target.value)} // Capture OTP from user input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)} // Capture OTP from user input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-4">
            <button
              type="submit"
              className="w-auto bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
            >
              Confirm OTP
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

export default OTPConfirmation;
