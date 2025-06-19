"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaIdCard,
} from "react-icons/fa";

const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "Non-Profit",
  "HSO",
  "TIT",
  "SPHONE",
  "Other",
];

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    password: "",
    confirmPassword: "",
    tinNumber: "",
    businessType: "",
    otherBusinessType: "",
    role: "customer",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showOtherBusinessType = formData.businessType === "Other";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s]/.test(value)) return;
    if (name === "companyPhone" && !/^[\d+\-]*$/.test(value)) return;
    if (name === "tinNumber" && /\D/.test(value)) return;
    if (formData.businessType === "HSO" && name === "otherBusinessType" && /\D/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]).{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const errors = {};
    const {
      firstName,
      lastName,
      companyName,
      companyAddress,
      companyEmail,
      companyPhone,
      password,
      confirmPassword,
      tinNumber,
      businessType,
      otherBusinessType,
    } = formData;

    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!companyName) errors.companyName = "Company name is required.";
    if (!companyAddress) errors.companyAddress = "Company address is required.";
    if (!companyEmail || (businessType === "TIT" && !validateEmail(companyEmail))) {
      errors.companyEmail = "Please enter a valid email address.";
    }
    if (!companyPhone || (businessType === "SPHONE" && !/^[\d+\-]+$/.test(companyPhone))) {
      errors.companyPhone = "Phone number must contain only digits, + and -.";
    }
    if (!validatePassword(password)) {
      errors.password = "Password must be 8+ chars with upper, lower, number & special char.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!/^\d+$/.test(tinNumber)) {
      errors.tinNumber = "TIN number must be numeric.";
    }
    if (!businessType) {
      errors.businessType = "Please select a business type.";
    }
    if (businessType === "Other" && !otherBusinessType.trim()) {
      errors.otherBusinessType = "Please specify your business type.";
    }
    if (businessType === "HSO" && !/^\d+$/.test(otherBusinessType.trim())) {
      errors.otherBusinessType = "HSO identifier must be numbers only.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      const { userId } = response.data;

      if (userId) {
        setSuccessMessage("🎉 You have signed up successfully!...");
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white border border-gray-200 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Create Your Account</h2>
          </div>
          <p className="text-lg text-gray-600">Please enter your details to sign up.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" name="firstName" icon={<FaUser />} value={formData.firstName} onChange={handleChange} error={formErrors.firstName} placeholder="e.g., Barsenet" />
            <InputField label="Last Name" name="lastName" icon={<FaUser />} value={formData.lastName} onChange={handleChange} error={formErrors.lastName} placeholder="e.g., Asfaw" />
            <InputField label="Company Name" name="companyName" icon={<FaBuilding />} value={formData.companyName} onChange={handleChange} error={formErrors.companyName} placeholder="e.g., PEACE Corp" />
            <InputField label="Company Address" name="companyAddress" icon={<FaBuilding />} value={formData.companyAddress} onChange={handleChange} error={formErrors.companyAddress} placeholder="e.g., Alem Bank, Addis Ababa, Ethiopia" />
            <InputField label="Company Email" name="companyEmail" icon={<FaEnvelope />} type="email" value={formData.companyEmail} onChange={handleChange} error={formErrors.companyEmail} placeholder="e.g., barsenetasfaw@.com" />
            <InputField label="Company Phone Number" name="companyPhone" icon={<FaPhone />} type="tel" value={formData.companyPhone} onChange={handleChange} error={formErrors.companyPhone} placeholder="e.g., +251911110000" />
            <InputField label="TIN Number" name="tinNumber" icon={<FaIdCard />} value={formData.tinNumber} onChange={handleChange} error={formErrors.tinNumber} placeholder="e.g., 123456789" />
            <InputField label="Password" name="password" icon={<FaLock />} type="password" value={formData.password} onChange={handleChange} error={formErrors.password} placeholder="e.g., StrongP@ssw0rd" />
            <InputField label="Confirm Password" name="confirmPassword" icon={<FaLock />} type="password" value={formData.confirmPassword} onChange={handleChange} error={formErrors.confirmPassword} placeholder="Re-enter your password" />

            <div className="mb-4">
              <label htmlFor="businessType" className="block text-sm text-gray-800 mb-2">Business Type</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-4">
                <FaBuilding className="text-gray-500 mr-3" />
                <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {formErrors.businessType && <p className="text-sm text-red-600 mt-1">{formErrors.businessType}</p>}
            </div>

            {showOtherBusinessType && (
              <div className="mb-4">
                <label htmlFor="otherBusinessType" className="block text-sm text-gray-800 mb-2">Specify your business type</label>
                <input type="text" id="otherBusinessType" name="otherBusinessType" value={formData.otherBusinessType} onChange={handleChange} required placeholder={formData.businessType === "HSO" ? "Numbers only" : "Specify your business type"} className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {formErrors.otherBusinessType && <p className="text-sm text-gray-800 mt-1">{formErrors.otherBusinessType}</p>}
              </div>
            )}
          </div>

          <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        {successMessage && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            {successMessage}
            <p className="text-sm mt-1">You’ll be redirected shortly...</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <p className="text-center mt-6 text-gray-700 text-sm">
          Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, name, icon, value, onChange, error, required, type = "text", placeholder = "" }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm text-gray-800 mb-2">{label}</label>
    <div className="flex items-center border border-gray-300 rounded-lg p-4">
      <span className="text-gray-500 mr-3">{icon}</span>
      <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default SignupPage;