"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

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
          {/* Card 1: Strategic Level Risk Assessment */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(0) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(0) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/role.png" alt="Card 1" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Roles and Responsibility for management, risk communication and mitigation document</h3>
              <p className="mb-4 text-gray-700">
                Identifies financial, operational, and technical risks, utilizing mitigation strategies for successful execution, costing <strong>600,000 - 1,500,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(0) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(0)}
            >
              {selectedCards.includes(0) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 2: Tactical Level Risk Assessment */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(1) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(1) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/security.png" alt="Card 2" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Risk Quantification Document</h3>
              <p className="mb-4 text-gray-700">
                Evaluates operational, technical, and financial risks, ensuring project viability costing <strong>680,000 - 1,700,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(1) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(1)}
            >
              {selectedCards.includes(1) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 3: Operational Level Risk Assessment */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(2) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(2) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/consulting.png" alt="Card 3" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Strategy Document</h3>
              <p className="mb-4 text-gray-700">
                Analyzes process, resource, and execution risks, ensuring efficiency through proactive strategies, costing <strong>760,000 - 1,900,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(2) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(2)}
            >
              {selectedCards.includes(2) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 4: CS Awareness & Cultural Assessment */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(3) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(3) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/security-policy.png" alt="Card 4" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Governance System Document</h3>
              <p className="mb-4 text-gray-700">
                Analyzes process, resource, and execution risks, costing <strong>760,000 - 1,900,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(3) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(3)}
            >
              {selectedCards.includes(3) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 5: Organizational Cyber Security Roadmap Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(4) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(4) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card5.jpg" alt="Card 5" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Organizational Cyber Security Roadmap Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, costing <strong>500,000 - 1,200,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(4) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(4)}
            >
              {selectedCards.includes(4) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 6: Corporate Cyber Security Policy Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(5) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(5) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card6.jpg" alt="Card 6" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Corporate Cyber Security Policy Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, costing <strong>700,000 - 1,800,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(5) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(5)}
            >
              {selectedCards.includes(5) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 7: Cyber Security Standards Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(6) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(6) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card7.jpg" alt="Card 7" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Standards Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, costing <strong>650,000 - 1,500,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(6) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(6)}
            >
              {selectedCards.includes(6) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 8: Cyber Security Programs Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(7) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(7) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card8.jpg" alt="Card 8" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Programs Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, costing <strong>800,000 - 2,000,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(7) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(7)}
            >
              {selectedCards.includes(7) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 9: Cyber Security Issue Specific Policy Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(8) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(8) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card9.jpg" alt="Card 9" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Issue Specific Policy Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, costing <strong>900,000 - 2,300,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(8) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(8)}
            >
              {selectedCards.includes(8) ? 'Selected' : 'Select'}
            </button>
          </div>

          {/* Card 10: Cyber Security System Specific Policy Document */}
          <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${selectedCards.includes(9) ? 'border-2 border-green-500' : ''}`}
            style={{ backgroundColor: selectedCards.includes(9) ? '#e6ffe6' : '#f5f5f5' }}
          >
            <div>
              <img src="/images/card10.jpg" alt="Card 10" className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security System Specific Policy Document</h3>
              <p className="mb-4 text-gray-700">
                Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, costing <strong>1,000,000 - 2,500,000 ETB</strong>.
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded ${selectedCards.includes(9) ? 'bg-green-600' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-200`}
              onClick={() => handleSelect(9)}
            >
              {selectedCards.includes(9) ? 'Selected' : 'Select'}
            </button>
          </div>
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
    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
  </div>
</div>
      </div>
    </div>
  );
};

export default View;