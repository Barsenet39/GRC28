"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter();

  // Sample data
  const requestDetails = {
    companyName: "BAYDO Corporation",
    address: "123 Mekelakeya, Addis Ababa",
    email: "barawsfa20@gmail.com",
    requestId: "REG/987654343/54",
    priority: "High",
    requestDate: "12 Dec, 2020",
    assignedDate: "1 Dec, 2020",
    services: [
      {
        category: "Cyber Security Risk Management Service",
        items: [
          { name: "Strategic Level Risk Assessment", costRange: "600,000 - 1,500,000" },
          { name: "Tactical Level Risk Assessment", costRange: "680,000 - 1,700,000" },
          { name: "Operational Level Risk Assessment", costRange: "680,000 - 1,700,000" },
        ],
      },
      {
        category: "Cyber Security Risk Assessment",
        items: [
          { name: "Strategic Level Risk Assessment", costRange: "600,000 - 1,500,000" },
        ],
      },
    ],
    documents: [
      { name: "Organizational Cyber Management Policy.pdf", link: "/OrganizationalCyberManagementPolicy.pdf" },
    ],
  };

  const handleViewQuestionnaires = () => {
    router.push('/view-questionnaires'); // Redirect to the view-questionnaires page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Request Overview</h1>

        {/* Flexbox for Company Information and Request Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Company Information */}
          <div className="p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
            <p className="text-gray-700"><strong>Company Name:</strong> {requestDetails.companyName}</p>
            <p className="text-gray-700"><strong>Address:</strong> {requestDetails.address}</p>
            <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${requestDetails.email}`} className="underline">{requestDetails.email}</a></p>
          </div>

          {/* Request Service */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {requestDetails.services.map((service, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{service.category}</h2>
                <ul className="list-disc pl-5">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">
                      {item.name} - <strong>{item.costRange}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Flexbox for Request Details and Request Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Request Details</h2>
            <p className="text-gray-700"><strong>Request ID:</strong> {requestDetails.requestId}</p>
            <p className="text-gray-700"><strong>Priority:</strong> {requestDetails.priority}</p>
            <p className="text-gray-700"><strong>Request Date:</strong> {requestDetails.requestDate}</p>
            <p className="text-gray-700"><strong>Assigned Date:</strong> {requestDetails.assignedDate}</p>
          </div>

          {/* Request Documents Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Request Documents</h2>
            <ul className="space-y-4">
              {requestDetails.documents.map((doc, index) => (
                <li key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-300">
                  <a href={doc.link} download className="flex items-center text-gray-700 hover:underline w-full">
                    <i className="fas fa-file-pdf text-red-500 mr-3"></i> {/* PDF icon */}
                    {doc.name}
                  </a>
                  <a href={doc.link} download className="text-blue-600 hover:underline ml-3">
                    <i className="fas fa-download"></i> {/* Download icon */}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Questionnaires Response Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">Questionnaires Response</h2>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-300 transform hover:scale-105 w-1/2"
              onClick={handleViewQuestionnaires}
            >
              View Questionnaires Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;