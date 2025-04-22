"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, DownloadIcon } from '@heroicons/react/solid';

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

  const toggleComments = (role) => {
    setActiveComment(role);
  };

  const closeModal = () => {
    setActiveComment(null);
  };

  const handleNavigate = () => {
    router.push('/template'); 
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    alert(`Uploaded: ${file.name}`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateQuestionnaires = () => {
    router.push('/create-questionnaires'); 
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Request Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Company Information</h2>
          <p className="text-gray-700"><strong>Company Name:</strong> BAYDO Corporation</p>
          <p className="text-gray-700"><strong>Address:</strong> 123 Mashel Abed, Addis Ababa</p>
          <p className="text-gray-700">
            <strong>Email:</strong>
            <a href="mailto:barawsfa20@gmail.com" className="text-blue-500 hover:underline"> barawsfa20@gmail.com</a>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Request Details</h2>
          <p className="text-gray-700"><strong>Request ID:</strong> REG/987454543/2020</p>
          <p className="text-gray-700"><strong>Request Date:</strong> 12 Dec, 2020</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-start">
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Request Service</h2>
          <ul className="list-disc pl-5">
            <li className="text-gray-700">
              Cyber Security Risk Management Service
              <ul className="list-disc pl-5">
                <li className="text-gray-700">Strategic Level Risk Assessment - 680,000.00</li>
                <li className="text-gray-700">Technical Level Risk Assessment - 600,000.00</li>
                <li className="text-gray-700">Cyber Security Risk - 700,000.00</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
          <p className="text-gray-800 font-semibold text-lg text-center">Request Document:</p>
          <a
            href="/Organizational Cyber Management Policy.pdf"
            download
            className="flex items-center text-blue-600 hover:underline mt-2 transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <DownloadIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            <span className="font-medium">Organizational Cyber Management Policy.pdf</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0 md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Approval Status</h2>
          <div className="space-y-4 w-full">
            {Object.entries(comments).map(([role]) => (
              <div className="flex items-center justify-between w-full" key={role}>
                <span className="text-sm font-medium text-gray-800">{role.replace(/([A-Z])/g, ' $1')}</span>
                <EyeIcon
                  className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800 transition duration-200"
                  onClick={() => toggleComments(role)}
                />
              </div>
            ))}
          </div>

          {activeComment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 transition-transform transform scale-100">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {activeComment.replace(/([A-Z])/g, ' $1')} Comment
                  </h2>
                  <div className="text-gray-700">{comments[activeComment]}</div>
                </div>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Choose Your Final Task</h2>
          <div className="flex flex-col space-y-4">
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
              onClick={handleCreateQuestionnaires}
            >
              <EyeIcon className="h-5 w-5 inline-block mr-1" aria-hidden="true" />
              Create Questionnaires
            </button>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition"
              onClick={handleNavigate}
            >
              <EyeIcon className="h-5 w-5 inline-block mr-1" aria-hidden="true" />
              Customize a Template
            </button>
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
              onClick={handleUploadClick}
            >
              <EyeIcon className="h-5 w-5 inline-block mr-1" aria-hidden="true" />
              Upload the Report
            </button>
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
              <input 
                type="file" 
                id="file-input"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? <span>{file.name}</span> : <span>Drag & Drop or Click to Upload</span>}
            </div>
            <div className="flex justify-end mt-4">
              <button 
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200" 
                onClick={handleUpload}
              >
                Upload
              </button>
              <button 
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 ml-2" 
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverview;