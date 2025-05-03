"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

// Services data
const services = [
  {
    id: 0,
    name: "Roles and Responsibility for management, risk communication and mitigation document",
    cost: "600,000 - 1,500,000 ETB",
    image: "/role.png"
  },
  {
    id: 1,
    name: "Cyber Security Risk Quantification Document",
    cost: "680,000 - 1,700,000 ETB",
    image: "/security.png"
  },
  {
    id: 2,
    name: "Cyber Security Strategy Document",
    cost: "760,000 - 1,900,000 ETB",
    image: "/consulting.png"
  },
  {
    id: 3,
    name: "Cyber Security Governance System Document",
    cost: "760,000 - 1,900,000 ETB",
    image: "/security-policy.png"
  },
  {
    id: 4,
    name: "Organizational Cyber Security Roadmap Document",
    cost: "500,000 - 1,200,000 ETB",
    image: "/images/card5.jpg"
  },
  {
    id: 5,
    name: "Corporate Cyber Security Policy Document",
    cost: "700,000 - 1,800,000 ETB",
    image: "/images/card6.jpg"
  },
  {
    id: 6,
    name: "Cyber Security Standards Document",
    cost: "650,000 - 1,500,000 ETB",
    image: "/images/card7.jpg"
  },
  {
    id: 7,
    name: "Cyber Security Programs Document",
    cost: "800,000 - 2,000,000 ETB",
    image: "/images/card8.jpg"
  },
  {
    id: 8,
    name: "Cyber Security Issue Specific Policy Document",
    cost: "900,000 - 2,300,000 ETB",
    image: "/images/card9.jpg"
  },
  {
    id: 9,
    name: "Cyber Security System Specific Policy Document",
    cost: "1,000,000 - 2,500,000 ETB",
    image: "/images/card10.jpg"
  }
];

const View = () => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState([]); // State to track selected cards

  const handleSelect = (index) => {
    setSelectedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    ); // Toggle selection
  };

  const handleSubmit = () => {
    // Add any form validation or submission logic here
    alert("Form submitted!"); // Placeholder for actual submission logic
    router.push('/success'); // Redirect to a success page
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cyber Security Management</h1>
        <h2 className="text-xl mb-8 text-center text-gray-800">Governance Document Development</h2>
        
        {/* Risk Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(service.id) ? 'border-2 border-green-500' : ''}`}
              style={{ backgroundColor: selectedCards.includes(service.id) ? '#e6ffe6' : '#f5f5f5' }}
            >
              <div>
                <img src={service.image} alt={service.name} className="mb-4 rounded" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{service.name}</h3>
                <p className="mb-4 text-gray-700">
                  Identifies financial, operational, and technical risks, utilizing mitigation strategies for successful execution, costing <strong>{service.cost}</strong>.
                </p>
              </div>
              <button
                className={`py-2 px-4 rounded ${selectedCards.includes(service.id) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
                onClick={() => handleSelect(service.id)}
              >
                {selectedCards.includes(service.id) ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>

        {/* Request Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12 w-full max-w-9xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Request Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            {/* File Upload Area */}
            <div className="flex flex-col items-center w-full">
              <label className="font-semibold text-gray-800 mb-2 text-center">Attach your letter or any additional documents:</label>
              <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50 w-full">
                <p className="mb-2 text-gray-700">Drag & drop your files here or</p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Browse Files</button>
                <p className="mt-2 text-gray-500">Upload Request Letter (PDF formats, up to 5MB)</p>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
