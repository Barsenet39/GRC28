"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDownload, FaEye } from "react-icons/fa";
import { FaFileAlt } from 'react-icons/fa'; // Import the document icon
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa"; // More Icons

const RequestOverview = () => {
  const router = useRouter();
  const [activeComment, setActiveComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [showApprovalComment, setShowApprovalComment] = useState(false);
  const [decision, setDecision] = useState(null);
  const [priority, setPriority] = useState(null);
  const [commentsText, setCommentsText] = useState('');
  const [showSentPopup, setShowSentPopup] = useState(false);


  // Single approvalStatus declaration
  const approvalStatus = [
    { role: 'Director General Approval', status: 'pending', comment: 'Pending review of security assessment details' }
  ];

  const handleView = (role) => {
    if (role === 'Director General Approval') {
      setShowApprovalComment(true);
    }
    console.log(`Viewing details for: ${role}`);
  };

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

  const handleCloseApprovalComment = () => setShowApprovalComment(false);

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setCommentsText(e.target.value);
  };
  const handleSend = () => {
    setShowSentPopup(true);
    setTimeout(() => {
      setShowSentPopup(false);
    }, 3000); // Hide after 3 seconds

    // Here you would typically send the data to your backend
    console.log("Decision:", decision);
    console.log("Priority:", priority);
    console.log("Comments:", commentsText);
  };

  const handleDownload = () => {
    // Replace 'your_file_url' with the actual URL of the PDF file
    const fileUrl = 'your_file_url'; // e.g., '/files/Organizational_Cyber_Management_Policy.pdf'

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrl;

    // Set the download attribute and the filename
    link.download = 'Organizational Cyber Management Policy.pdf'; // Set the desired filename

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };


  return (
    <div className="container mx-auto p-4 bg-gray-50 text-sm">
      {/* Reduced padding, lighter background, base font size */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Request Overview</h1>

      {showSentPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white py-2 px-4 rounded-md shadow-md z-50">
          {/* Softer green */}
          Sent it!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Reduced gap and margin */}
        {/* Company Information Section */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
          {/* Reduced padding, added transition */}
          <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">Company Information</h2>
          {/* Smaller header, added icon */}
          <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Company Name:</strong> BAYDO Corporation</p>
          {/* Reduced text color, added icon */}
          <p className="text-gray-600 flex items-center mb-1"><FaMapMarkerAlt className="mr-2 text-red-500" /> <strong>Company Address:</strong> 123 Mashel Abed, Addis Ababa</p>
          <p className="text-gray-600 flex items-center mb-1"><FaPhone className="mr-2 text-green-500" /> <strong>Company Phone:</strong> <span className="text-gray-700">+251-965-686-679</span></p>
          <p className="text-gray-600 flex items-center mb-1">
            <FaEnvelope className="mr-2 text-purple-500" />
            <strong>Company Email:</strong>
            <a href="mailto:barawsfa20@gmail.com" className="text-blue-400 hover:underline"> barawsfa20@gmail.com</a>
            {/* Softer blue */}
          </p>
        </div>

        {/* Request Details Section */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
          {/* Reduced padding, added transition */}
          <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center"> Request Details</h2>
          {/* Smaller header, added icon */}
          <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Request ID:</strong> REG/987454543/2020</p>
          <p className="text-gray-600 flex items-center mb-1"><FaCalendarAlt className="mr-2 text-blue-500" /> <strong>Request Date:</strong> 12 Dec, 2020</p>
          <p className="text-gray-600 flex items-center mb-1"><FaFileAlt className="mr-2 text-gray-500" /> <strong>Request Type:</strong> <span className="text-purple-400">Project</span></p>
          {/* Softer purple */}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
        {/* Reduced padding and margin, added transition */}
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Request Service</h2>
        <div className="flex justify-between pb-8">
          {/* Reduced padding */}
          {/* First Service */}
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <span className="text-green-400">
                {/* Softer green */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                </svg>
              </span>
              <span className="font-medium text-gray-600 ml-2">Cyber Security Risk Management Service</span>
            </div>
            <ul className="list-disc pl-5">
              <li className="text-gray-600"><strong>Strategic Level Risk Assessment</strong> - Up to 1,500.00</li>
              <li className="text-gray-600"><strong>Tactical Level Risk Assessment</strong> - Up to 1,500.00</li>
            </ul>
          </div>

          {/* Second Service */}
          <div className="w-1/2">
            <div className="flex items-center mb-2">
              <span className="text-green-400">
                {/* Softer green */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                </svg>
              </span>
              <span className="font-medium text-gray-600 ml-2">Cyber Security Management Service</span>
            </div>
            <ul className="list-disc pl-5">
              <li className="text-gray-600"><strong>Governance Document Development</strong> - Up to 1,500.00</li>
              <li className="text-gray-600"><strong>Roles and Responsibilities for Management</strong> - Up to 1,500.00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Request Letter and Approval Status with Decision on Request */}
      <div className="flex justify-between mb-4">
        {/* Reduced margin */}
        {/* Request Letter Section */}
        <div className="flex flex-col bg-white p-3 rounded-md mt-2 w-1/2 shadow-md hover:scale-105 transition duration-200">
          {/* Reduced padding, added shadow, hover effect, and transition */}
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Request Letter</h3>
          <div className="flex items-center justify-between h-20">
            <span className="text-gray-600">Organizational Cyber Management Policy.pdf</span>
            <div className="flex items-center">
              <FaDownload className="text-blue-400 cursor-pointer" onClick={handleDownload} />
            </div>
          </div>

          {/* Approval Status Section - ADDED HERE */}
          <div className="bg-purple-50 rounded-lg p-3 mt-2">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Approval Status</h2>
            <div className="space-y-3">
              {approvalStatus.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-gray-600">{status.role}</span>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleView(status.role)}
                  >
                    <FaEye className="text-blue-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decision on Request Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-1/2 ml-2 hover:scale-105 transition duration-200">
          {/* Reduced padding, added shadow, hover effect, and transition */}
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Decision on Request</h2>
          <p className="text-gray-600 mb-2">Please select an option:</p>
          <div className="flex items-center mb-3">
            <label className="mr-3 flex items-center">
              <input type="radio" name="decision" value="accept" className="mr-1" onChange={handleDecisionChange} />
              <span className="text-gray-600">Accept</span>
            </label>
            <label className="mr-3 flex items-center">
              <input type="radio" name="decision" value="reject" className="mr-1" onChange={handleDecisionChange} />
              <span className="text-gray-600">Reject</span>
            </label>
          </div>
          <p className="text-gray-600 mb-2">Please select priority:</p>
          <div className="flex items-center mb-3">
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="high" className="mr-1" onChange={handlePriorityChange} disabled={!decision} />
              <span className="text-gray-600">High</span>
            </label>
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="medium" className="mr-1" onChange={handlePriorityChange} disabled={!decision} />
              <span className="text-gray-600">Medium</span>
            </label>
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="low" className="mr-1" onChange={handlePriorityChange} disabled={!decision} />
              <span className="text-gray-600">Low</span>
            </label>
          </div>
          <textarea
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md resize-none text-gray-600"
            placeholder="Add comments here..."
            value={commentsText}
            onChange={handleCommentsChange}
          />
          <div className="flex justify-end mt-3">
            {/* Reduced margin */}
            <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200 mr-2">Cancel</button>
            {/* Softer gray */}
            <button className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200" onClick={handleSend} disabled={!decision || !priority}>Send</button>
            {/* Softer blue */}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-3 rounded-lg shadow-lg w-11/12 md:w-[600px] h-[250px] flex flex-col items-center justify-between">
            {/* Reduced padding and height */}
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Upload Report</h2>
            <div
              className="border-4 border-dashed border-gray-300 rounded-lg h-20 w-full flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:border-blue-400 transition duration-200"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input').click()}
            >
              {/* Softer colors */}
              <input type="file" id="file-input" onChange={handleFileChange} className="hidden" />
              {file ? <span className="text-gray-600">{file.name}</span> : <span>Drag & Drop or Click to Upload</span>}
            </div>
            <div className="flex justify-end mt-3">
              {/* Reduced margin */}
              <button className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200" onClick={handleUpload}>Upload</button>
              {/* Softer blue */}
              <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200 ml-2" onClick={handleCloseModal}>Cancel</button>
              {/* Softer gray */}
            </div>
          </div>
        </div>
      )}

      {showApprovalComment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-[400px]">
            {/* Reduced padding and width */}
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Director General Approval Comment</h2>
            <p className="text-gray-600">{approvalStatus[0].comment}</p>
            <div className="flex justify-end mt-3">
              {/* Reduced margin */}
              <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200" onClick={handleCloseApprovalComment}>Close</button>
              {/* Softer gray */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverview;