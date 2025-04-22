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
    router.push('/questionnaires-response'); // Adjust the path if necessary
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Request Overview</h1>

      {/* Flexbox for Company Information and Request Service */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Company Information */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
          <p className="text-gray-700"><strong>Company Name:</strong> {requestDetails.companyName}</p>
          <p className="text-gray-700"><strong>Address:</strong> {requestDetails.address}</p>
          <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${requestDetails.email}`} className="text-blue-600 hover:underline">{requestDetails.email}</a></p>
        </div>

        {/* Request Service */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Request Details */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Request Details</h2>
          <p className="text-gray-700"><strong>Request ID:</strong> {requestDetails.requestId}</p>
          <p className="text-gray-700"><strong>Priority:</strong> {requestDetails.priority}</p>
          <p className="text-gray-700"><strong>Request Date:</strong> {requestDetails.requestDate}</p>
          <p className="text-gray-700"><strong>Assigned Date:</strong> {requestDetails.assignedDate}</p>
        </div>

        {/* Combined Request Documents and Questionnaires Response */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Request Documents</h2>
          <ul className="list-disc pl-5 mb-4">
            {requestDetails.documents.map((doc, index) => (
              <li key={index} className="text-gray-700">
                <a href={doc.link} download className="text-blue-600 hover:underline">{doc.name}</a>
              </li>
            ))}
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800">Questionnaires Response</h2>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleViewQuestionnaires}
          >
            View Questionnaires Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;