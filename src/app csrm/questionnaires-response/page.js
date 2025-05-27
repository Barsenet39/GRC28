"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDownload, FaEye } from "react-icons/fa";
import { FaFileAlt } from 'react-icons/fa';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa";

const RequestOverview = () => {
  const router = useRouter();
  const [comments, setComments] = useState([
    "barasfaw20@gmail.com",
    "barasfaw20@gmail.com",
    "barasfaw20@gmail.com",
    "barasfaw20@gmail.com",
  ]);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const requestDetails = {
    companyName: "BAYDO Corporation",
    companyAddress: "123 Meskel Adebaby, Addis Ababa",
    companyPhone: "+251-965-661-679",
    companyEmail: "barasfaw20@gmail.com",
    requestId: "REQ/867544534/54",
    requestDate: "12 Dec, 2020",
    requestType: "Project",
    priority: "Project",
    assignedDate: "12 Dec, 2020",
    endDate: "12 Dec, 2020",
    services: [
      {
        category: "Cyber Security Risk Management Service",
        items: [
          { name: "Strategic Level Risk Assessment", costRange: "Up to 1,500,000" },
          { name: "Tactical Level Risk Assessment", costRange: "Up to 1,700,000" },
          { name: "Operational Level Risk Assessment", costRange: "Up to 1,700,000" },
        ],
      },
      {
        category: "Cyber Security Risk Assessment",
        items: [
          { name: "Strategic Level Risk Assessment", costRange: " Up to 1,500,000" },
        ],
      },
    ],
    documents: [
      { name: "Organizational Cyber Management Policy.pdf", link: "/OrganizationalCyberManagementPolicy.pdf" },
    ],
  };

  const handleCreateQuestionnaires = () => {
    router.push('/create-questionnaires');
  };

  const handleCustomizeTemplate = () => {
    router.push('/Template');
  };

  const handleDownload = () => {
    const fileUrl = requestDetails.documents[0].link;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = requestDetails.documents[0].name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileError(null);
    } else {
      setFile(null);
      setFileError('Only PDF files are allowed.');
    }
  };

  const handleSubmit = () => {
    if (file) {
      console.log("Uploading file:", file.name);
      // You would typically upload the file to a server here
    } else {
      console.log("No file selected");
      setFileError('Please select a PDF file.');
    }
  };

    const handleEyeClick = () => {
        router.push('/answer');
    };

  return (
    <div className="container mx-auto p-4 bg-gray-50 text-sm">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Request Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">Company Information</h2>
            <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Company Name:</strong> {requestDetails.companyName}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaMapMarkerAlt className="mr-2 text-red-500" /> <strong>Company Address:</strong> {requestDetails.companyAddress}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaPhone className="mr-2 text-green-500" /> <strong>Company Phone:</strong> <span className="text-gray-700">{requestDetails.companyPhone}</span></p>
            <p className="text-gray-600 flex items-center mb-1">
              <FaEnvelope className="mr-2 text-purple-500" />
              <strong>Company Email:</strong>
              <a href={`mailto:${requestDetails.companyEmail}`} className="text-blue-400 hover:underline"> {requestDetails.companyEmail}</a>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">Request Details</h2>
            <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Request ID:</strong> {requestDetails.requestId}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaCalendarAlt className="mr-2 text-red-500" /> <strong>Request Date:</strong> {requestDetails.requestDate}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaProjectDiagram className="mr-2 text-green-500" /> <strong>Priority:</strong> {requestDetails.priority}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaCalendarAlt className="mr-2 text-purple-500" /> <strong>Assigned Date:</strong> {requestDetails.assignedDate}</p>
            <p className="text-gray-600 flex items-center mb-1"><FaCalendarAlt className="mr-2 text-blue-500" /> <strong>End Date:</strong> {requestDetails.endDate}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Request Documents</h2>
            <div className="flex items-center justify-between h-20">
              <span className="text-gray-600">{requestDetails.documents[0].name}</span>
              <div className="flex items-center">
                <FaEye className="text-blue-400 cursor-pointer mr-2" />
                <FaDownload className="text-orange-400 cursor-pointer" onClick={handleDownload} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Request Service</h2>
            {requestDetails.services.map((service, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                  </svg>
                  </span>
                  <span className="font-medium text-gray-600 ml-2">{service.category}</span>
                </div>
                <ul className="list-disc pl-5">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600"><strong className="text-blue-500">{item.name}</strong> - {item.costRange}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Questionnaires Response</h2>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-gray-600">{comment}</span>
                  <FaEye className="text-blue-400 cursor-pointer" onClick={handleEyeClick} />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Upload Report</h2>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
              {file ? (
                <p className="text-gray-600">Selected file: {file.name}</p>
              ) : (
                <>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FaFileAlt className="mx-auto text-4xl text-gray-500" />
                    <p className="text-gray-500">Kindly upload your letter here.</p>
                    <p className="text-gray-500 text-xs">(Only PDF files are allowed)</p>
                  </label>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
                </>
              )}
            </div>
            {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4 w-full"
              onClick={handleSubmit}
              disabled={fileError !== null}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestOverview;