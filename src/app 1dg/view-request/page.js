"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDownload, FaEye } from "react-icons/fa";

const RequestOverview = () => {
  const router = useRouter(); 
  const [activeComment, setActiveComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const comments = {
    DivisionHead: (
      <>
        <div className="text-center">Request accepted</div>
        <div className="text-center">Date: 18 Jan, 2021</div>
        <div className="text-center">By: Division Head</div>
      </>
    ),
  };

  const toggleComments = (role) => setActiveComment(role);
  const closeModal = () => setActiveComment(null);
  const handleNavigate = () => router.push('/template'); 
  const handleUploadClick = () => setIsModalOpen(true);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);
  
  const handleUpload = () => {
    alert(`Uploaded: ${file.name}`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Request Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* Company Information Section */}
  <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Company Information</h2>
    <p className="text-gray-700"><strong>Company Name:</strong> BAYDO Corporation</p>
    <p className="text-gray-700"><strong>Company Address:</strong> 123 Mashel Abed, Addis Ababa</p>
    <p className="text-gray-700"><strong>Company Phone:</strong> <span className="text-gray-800">+251-965-686-679</span></p>
    <p className="text-gray-700">
      <strong>Company Email:</strong>
      <a href="mailto:barawsfa20@gmail.com" className="text-blue-500 hover:underline"> barawsfa20@gmail.com</a>
    </p>
  </div>

  {/* Request Details Section */}
  <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Request Details</h2>
    <p className="text-gray-700"><strong>Request ID:</strong> REG/987454543/2020</p>
    <p className="text-gray-700"><strong>Request Date:</strong> 12 Dec, 2020</p>
    <p className="text-gray-700"><strong>Request Type:</strong> <span className="text-purple-600">Project</span></p>
  </div>
</div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Request Service</h2>
        <div className="flex justify-between pb-12">
          {/* First Service */}
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <span className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                </svg>
              </span>
              <span className="font-medium text-gray-700 ml-2">Cyber Security Risk Management Service</span>
            </div>
            <ul className="list-disc pl-5">
              <li className="text-gray-700"><strong>Strategic Level Risk Assessment</strong> - Up to 1,500.00</li>
              <li className="text-gray-700"><strong>Tactical Level Risk Assessment</strong> - Up to 1,500.00</li>
            </ul>
          </div>

          {/* Second Service */}
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <span className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                </svg>
              </span>
              <span className="font-medium text-gray-700 ml-2">Cyber Security Management Service</span>
            </div>
            <ul className="list-disc pl-5">
              <li className="text-gray-700"><strong>Governance Document Development</strong> - Up to 1,500.00</li>
              <li className="text-gray-700"><strong>Roles and Responsibilities for Management</strong> - Up to 1,500.00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Side-by-Side Request Letter and Decision on Request */}
      <div className="flex justify-between mb-6">
        {/* Request Letter Section */}
        <div className="flex items-center justify-between bg-white p-4 rounded-md mt-2 h-24">
          <span className="text-black">Organizational Cyber Management Policy.pdf</span>
          <div className="flex items-center">
            <FaEye className="text-blue-600 cursor-pointer mr-2" />
            <FaDownload className="text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Decision on Request Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-1/2 ml-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Decision on Request</h2>
          <p className="text-gray-700 mb-2">Please select an option and provide comments below.</p>
          <div className="flex items-center mb-4">
            <label className="mr-4">
              <input type="radio" name="decision" value="accept" className="mr-1" />
              Accept
            </label>
            <label className="mr-4">
              <input type="radio" name="decision" value="reject" className="mr-1" />
              Reject
            </label>
          </div>
          <textarea rows="4" className="w-full p-2 border border-gray-300 rounded-lg resize-none" placeholder="Add comments here..." />
          <div className="flex justify-end mt-4">
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 mr-2">Cancel</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Send</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-[700px] h-[300px] flex flex-col items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Report</h2>
            <div 
              className="border-4 border-dashed border-gray-400 rounded-lg h-24 w-full flex items-center justify-center text-gray-600 text-sm cursor-pointer hover:border-blue-500 transition duration-200"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input type="file" id="file-input" onChange={handleFileChange} className="hidden" />
              {file ? <span>{file.name}</span> : <span>Drag & Drop or Click to Upload</span>}
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200" onClick={handleUpload}>Upload</button>
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 ml-2" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverview;