"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cyber Security Risk Management</h1>
        <h2 className="text-xl mb-8 text-center text-gray-800">Cyber Security Risk Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
          {/* Strategic Level Risk Assessment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-120 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Strategic Level Risk Assessment (SLRA)</h3>
            <p className="mb-4 text-gray-700">
              The Strategic Level Risk Assessment (SLRA) identifies financial, operational, and technical risks,
              utilizing mitigation strategies for successful execution, or a project costing
              <strong> 600,000 - 1,500,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Tactical Level Risk Assessment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-120 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Tactical Level Risk Assessment (TLRA)</h3>
            <p className="mb-4 text-gray-700">
              Tactical Level Risk Assessment (TLRA) evaluates operational, technical, and financial risks for a project,
              focusing on mitigation strategies to ensure project viability costing
              <strong> 680,000 - 1,700,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Operational Level Risk Assessment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-120 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Operational Level Risk Assessment (OLRA)</h3>
            <p className="mb-4 text-gray-700">
              Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, for a project costing
              <strong> 760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Select
            </button>
          </div>

          {/* CS Awareness & Cultural Assessment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-120 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">CS Awareness & Cultural Assessment</h3>
            <p className="mb-4 text-gray-700">
              CS Awareness & Cultural Assessment analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, for a project costing
              <strong> 760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Select
            </button>
          </div>
        </div>

        {/* Cyber Security Risk Template Section */}
        <h2 className="text-xl mt-12 mb-6 text-center text-gray-800">Cyber Security Risk Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4">
          {/* Asset Management Template Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-96 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Asset Management Template (AMT)</h3>
            <p className="mb-4 text-gray-700">
              Asset Management Template (AMT) analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, for a project costing
              <strong> 520,000 - 1,300,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Select
            </button>
          </div>

          {/* Risk Monitoring Dashboard Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-96 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Risk Monitoring Dashboard (RMD)</h3>
            <p className="mb-4 text-gray-700">
              Risk Monitoring Dashboard (RMD) analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, for a project costing
              <strong> 760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Select
            </button>
          </div>

          {/* CS Risk Register Template Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-96 h-80">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">CS Risk Register Template (CSRT)</h3>
            <p className="mb-4 text-gray-700">
              CS Risk Register Template (CSRT) analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies, for a project costing
              <strong> 760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Select
            </button>
          </div>
        </div>
  <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cyber Security Management</h1>
        <h2 className="text-xl mb-8 text-center text-gray-800">Governance Document Development</h2>
        
        {/* Risk Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          {/* Card 1: Strategic Level Risk Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Roles and Responsibility for management, risk communication and mitigation document</h3>
            <p className="mb-4 text-gray-700">
              Identifies financial, operational, and technical risks, utilizing mitigation strategies for successful execution, costing <strong>600,000 - 1,500,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Learn More</button>
          </div>

          {/* Card 2: Tactical Level Risk Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Rsk Quantification Document</h3>
            <p className="mb-4 text-gray-700">
              Evaluates operational, technical, and financial risks, ensuring project viability costing <strong>680,000 - 1,700,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Learn More</button>
          </div>

          {/* Card 3: Operational Level Risk Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Strategy Document</h3>
            <p className="mb-4 text-gray-700">
              Analyzes process, resource, and execution risks, ensuring efficiency through proactive strategies, costing <strong>760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 4: CS Awareness & Cultural Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Governance System Document </h3>
            <p className="mb-4 text-gray-700">
              Analyzes process, resource, and execution risks, costing <strong>760,000 - 1,900,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 5: New Risk Assessment Type 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Organizational Cyber Security Roadmap Document</h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>500,000 - 1,200,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 6: New Risk Assessment Type 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Corporate Cyber Secuirty Policy Document </h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>700,000 - 1,800,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 7: New Risk Assessment Type 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Standards Document</h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>650,000 - 1,500,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 8: New Risk Assessment Type 4 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Programs Document </h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>800,000 - 2,000,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 9: New Risk Assessment Type 5 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security Issue Specific Policy Document</h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>900,000 - 2,300,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>

          {/* Card 10: New Risk Assessment Type 6 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cyber Security System Specific Policy Document</h3>
            <p className="mb-4 text-gray-700">
            Operational Level Risk Assessment (OLRA) analyzes process, resource, and execution risks , ensuring efficiency through proactive mitigation strategies.  for a project costing<strong>1,000,000 - 2,500,000 ETB</strong>.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Select</button>
          </div>
        </div>

        {/* Request Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12 w-full max-w-9xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-gray-900">Request Form</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Request Type Selection */}
    <div className="flex flex-col">
      <label className="font-semibold text-gray-800 mb-2">Select your request type:</label>
      <div className="flex items-center mb-2">
        <input type="radio" name="requestType" value="Project" className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500" />
        <span className="text-gray-800">Project</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="requestType" value="Review" className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500" />
        <span className="text-gray-800">Review</span>
      </div>
    </div>

    {/* File Upload Area */}
    <div className="flex flex-col">
      <label className="font-semibold text-gray-800 mb-2">Attach your letter or any additional documents:</label>
      <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50">
        <p className="mb-2 text-gray-700">Drag & drop your files here or</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Browse Files</button>
        <p className="mt-2 text-gray-500">Upload Request Letter (PDF formats, up to 5MB)</p>
      </div>
    </div>
  </div>
</div>

        {/* Action Buttons Outside the Box */}
        <div className="flex justify-between mt-4 w-full">
          <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default View;