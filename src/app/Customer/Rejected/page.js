"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";

const View = () => {
  const router = useRouter();

  const requestDetails = {
    id: "REG/867544534/54",
    date: "12 Dec, 2020",
    type: "Technical Support",
    status: "Rejected",
  };

  const services = [
    {
      category: "Cyber Security Risk Management Service",
      subCategory: "Governance Document Development",
      items: [
        { name: "Strategic Level Risk Assessment", cost: "Up to 1,500,00" },
        { name: "Tactical Level Risk Assessment", cost: "Up to 1,700,00" },
      ],
    },
    {
      category: "Cyber Security Management Service",
      subCategory: "Governance Document Development",
      items: [
        { name: "Cyber Security Risk Quantification Document", cost: "Up to 1,500,00" },
        { name: "Tactical Level Risk Assessment", cost: "Up to 1,700,00" },
      ],
    },
  ];

  const handleDownload = (fileName) => {
    alert(`Downloading: ${fileName}`); // Placeholder for actual download logic
  };

  const handleView = (fileName) => {
    window.open(`/path/to/${fileName}`, "_blank"); // Update with actual path
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Content Section */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-6xl flex flex-wrap gap-6">
        {/* Left Section: Request Details & Documents */}
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-3xl font-semibold mb-4 text-black">Request Details</h1>
          <div className="mb-6 text-black">
  <div className="flex justify-between mb-4">
    <strong className="w-1/3">Request ID:</strong>
    <span className="w-2/3 text-left">{requestDetails.id}</span>
  </div>
  <div className="flex justify-between mb-4">
    <strong className="w-1/3">Request Date:</strong>
    <span className="w-2/3 text-left"><FaCalendarAlt className="inline-block mr-1 text-primary" />{requestDetails.date}</span>
  </div>
  <div className="flex justify-between mb-2">
      <strong className="w-1/3">Request Type:</strong>
      <span className="flex items-center w-2/3 text-left">
      <FaEye className="inline-block mr-1 text-orange-500" />
        {requestDetails.type}
      </span>
    </div>
    <div className="flex justify-between mb-2">
      <strong className="w-1/3">Request Status:</strong>
      <span className={`w-2/3 text-left ${requestDetails.status === 'Rejected' ? 'text-blue-600' : ''}`}>
        {requestDetails.status}
      </span>
    </div>
</div>

          <h2 className="text-lg font-semibold mt-6 text-black">Request Documents</h2>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
            <span className="text-black">Organizational Cyber Management Policy.pdf</span>
            <div className="flex items-center">
              <FaEye 
                className="text-blue-600 cursor-pointer mr-2" 
                onClick={() => handleView("Organizational_Cyber_Management_Policy.pdf")} 
              />
              <FaDownload 
                className="text-blue-600 cursor-pointer" 
                onClick={() => handleDownload("Organizational_Cyber_Management_Policy.pdf")} 
              />
            </div>
          </div>
        </div>

        {/* Right Section: Request Services */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-3xl font-semibold mb-3 text-black">Request Service</h2>
          {services.map((service, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-black">{service.category}</h3>
              <p className="text-black text-sm">{service.subCategory}</p>
              <ul className="mt-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b py-2">
                    <span className="text-black">{item.name}</span>
                    <span className="text-black font-medium">{item.cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Rejected Due to Comment Box */}
          <div className="mt-6 p-6 border border-red-300 bg-red-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Rejected Due To</h3>
            <p className="text-red-600">
              The request was rejected due to the failure to meet specific security requirements and compliance standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;