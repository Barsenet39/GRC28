"use client";
import Link from "next/link";

// Define the shape of an expert
interface Expert {
  name: string;
  id: string;
  expertise: string;
}

export default function RequestOverviewsPage() {
  // Mock data for experts (static data for display only)
  const experts: Expert[] = [
    { name: "Barsenet Asfaw", id: "20004342", expertise: "TM" },
    { name: "Barsenet Asfaw", id: "20004345", expertise: "PM" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Content */}
      <div className="w-64 bg-white shadow-md flex flex-col min-h-screen">
        <div className="p-4 flex-1">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
            
          </div>
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 rounded hover:bg-purple-100"
                >
                  <span className="mr-2 text-gray-600">📊</span>
                  <span className="text-gray-800">Dashboard</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/new-request"
                  className="flex items-center p-2 rounded hover:bg-purple-100"
                >
                  <span className="mr-2 text-gray-600">📝</span>
                  <span className="text-gray-800">New Request</span>
                  <span className="ml-auto bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    8
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/request-status"
                  className="flex items-center p-2 rounded bg-purple-200"
                >
                  <span className="mr-2 text-gray-600">🔄</span>
                  <span className="text-gray-800">Request Status</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/returned-requests"
                  className="flex items-center p-2 rounded hover:bg-purple-100"
                >
                  <span className="mr-2 text-gray-600">↩️</span>
                  <span className="text-gray-800">Returned Requests</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <img
              src="/user-avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold text-gray-800">Barsenet Asfaw</p>
              <p className="text-sm text-gray-500">Division Head</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button className="mr-2 text-gray-600">
              <span role="img" aria-label="Globe">🌐</span> EN
            </button>
            <button className="mr-2 text-gray-600">
              <span role="img" aria-label="Dark Mode">🌙</span> Dark Mode
            </button>
            <button className="text-gray-600">
              <span role="img" aria-label="Settings">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Request Overview</h1>

        {/* Company Information and Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Company Information</h2>
            <div className="space-y-2 text-gray-800">
              <p><strong>Company Name:</strong> BAYOFD Corporation</p>
              <p><strong>Company Address:</strong> 123 Meskel Adebabay, Addis Ababa</p>
              <p><strong>Company Phone:</strong> +251-965-661-679</p>
              <p><strong>Company Email:</strong> barasfaw20@gmail.com</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Request Details</h2>
            <div className="space-y-2 text-gray-800">
              <p className="flex items-center">
                <strong>Request ID:</strong>
                <span className="ml-2">REQ/8675454534/54</span>
              </p>
              <p className="flex items-center">
                <strong>Request Date:</strong>
                <span className="ml-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  12 Dec, 2020
                </span>
              </p>
              <p className="flex items-center">
                <strong>Request Type:</strong>
                <span className="ml-2 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-pink-500 mr-2"></span>
                  Project
                </span>
              </p>
              <p className="flex items-center">
                <strong>Request Status:</strong>
                <span className="ml-2">In Progress</span>
              </p>
              <p className="flex items-center">
                <strong>Assigned Date:</strong>
                <span className="ml-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  12 Dec, 2020
                </span>
              </p>
              <p className="flex items-center">
                <strong>End Date:</strong>
                <span className="ml-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  12 Dec, 2020
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Request Service */}
        <div className="bg-purple-50 p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Request Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-gray-800">Cyber Security Risk Management Service</h3>
              </div>
              <div className="ml-6 space-y-2 text-gray-800">
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Strategic Level Risk Assessment
                  <span className="ml-auto">600,000</span>
                </p>
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Tactical Level Risk Assessment
                  <span className="ml-auto">780,000</span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-gray-800">Cyber Security Management Service</h3>
              </div>
              <div className="ml-6 space-y-2 text-gray-800">
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Governance Document Development
                  <span className="ml-auto">879,000</span>
                </p>
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Cyber Security Risk Quantification
                  <span className="ml-auto">900,000</span>
                </p>
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Tactical Level Risk Assessment
                  <span className="ml-auto">900,000</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Request Documents and Assigned Experts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Request Documents</h2>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="text-gray-800">Organizational Cyber Management Policy.pdf</p>
              <button className="ml-auto text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Assigned Experts</h2>
            <div className="flex space-x-4">
              {experts.map((expert, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={`w-4 h-4 rounded-full mr-2 ${
                      expert.expertise === "TM" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  <div>
                    <p className="text-gray-800">{expert.name}</p>
                    <p className="text-sm text-gray-800">{expert.id}</p>
                    <p className="text-sm text-gray-800">Expertise: {expert.expertise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Approval Status and Service Agreement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Approval Status</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="font-semibold text-gray-800">Director General Approval</p>
                <span className="ml-auto text-gray-800">TBA</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="font-semibold text-gray-800">Deputy Director Approval</p>
                <span className="ml-auto text-gray-800">TBA</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="font-semibold text-gray-800">Directorate Director Approval</p>
                <span className="ml-auto text-gray-800">TBA</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="font-semibold text-gray-800">Division Head Approval</p>
                <span className="ml-auto text-gray-800">TBA</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Service Agreement and Payment Instruction</h2>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="text-gray-800">Letter to BAYOFD corporation.pdf</p>
              <button className="ml-auto text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Assign Additional Experts */}
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Assign Additional Experts if the Current Experts are Insufficient</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Add Experts
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Re Assign Experts
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Remove Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}