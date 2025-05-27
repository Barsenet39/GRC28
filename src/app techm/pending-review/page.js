"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDownload } from "react-icons/fa";
import { FaFileAlt } from 'react-icons/fa'; // Import the document icon
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa"; // More Icons
import { FaEye, FaCommentDots, FaTimes } from 'react-icons/fa';

const RequestOverview = () => {
  const router = useRouter();
  const [activeComment, setActiveComment] = useState(null);
  const [file, setFile] = useState(null);
  const [showApprovalComment, setShowApprovalComment] = useState(false);
  const [decision, setDecision] = useState(null);
  const [priority, setPriority] = useState(null);
  const [commentsText, setCommentsText] = useState('');
  const [showSentPopup, setShowSentPopup] = useState(false);
  const [selectedTab, setSelectedTab] = useState('requestLetters');


  

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
  const requestLetters = ['1730273674023-RequestLetter.pdf']; 
 ;


  const toggleComment = (index) => { 
  setActiveComment(activeComment === index ? null : index);
 };

 const approvalStatus = [
{ role: 'Directorate Director Comment', comment: 'Reviewed and approved.' },
{ role: 'Division Head Comment', comment: 'No issues found.' }, 
 ];

const [assignedDate, setAssignedDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [comment, setComment] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [searchName, setSearchName] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('');
  const [filterTaskLoad, setFilterTaskLoad] = useState('');

  const expertsData = [
    { id: 1, name: 'Fikir Tadese', email: 'tadefik@example.com', taskLoad: 2, expertise: 'TM' },
    { id: 2, name: 'Jalane Tasfaye', email: 'jane@example.com', taskLoad: 3, expertise: 'Expert' },
    { id: 3, name: 'Seenaa Limane', email: 'senaa@example.com', taskLoad: 1, expertise: 'TM' },
    { id: 4, name: 'Rahel Turi', email: 'turise@example.com', taskLoad: 4, expertise: 'Expert' },
    { id: 5, name: 'Biniyam Jibril', email: 'biniji@example.com', taskLoad: 3, expertise: 'TM' },
    { id: 6, name: 'Birahane Biru', email: 'biru@example.com', taskLoad: 1, expertise: 'Expert' },
    { id: 7, name: 'Eden Henok', email: 'edenheni@example.com', taskLoad: 2, expertise: 'TM' },
    { id: 8, name: 'Fiona Bahilu', email: 'fiona@example.com', taskLoad: 4, expertise: 'TM' },
    { id: 9, name: 'Girma Alemu', email: 'girmalam@example.com', taskLoad: 2, expertise: 'TM' },
    { id: 10, name: 'Hannah Worku', email: 'hannah@example.com', taskLoad: 1, expertise: 'TM' },
  ];
    
 // Now you can safely filter
const filteredExperts = expertsData.filter((expert) => {
  // Filter by Name (case-insensitive)
  const matchesName = expert.name.toLowerCase().includes(searchName.toLowerCase());

  // Filter by Expertise (if a filter is selected)
  const matchesExpertise = filterExpertise ? expert.expertise === filterExpertise : true;

  // Filter by Task Load (if a filter is selected, compare it as a string)
  const matchesTaskLoad = filterTaskLoad ? expert.taskLoad.toString() === filterTaskLoad : true;

  // Return only experts that match all active filters
  return matchesName && matchesExpertise && matchesTaskLoad;
});
const handleAssign = (requestId) => {
    setSelectedRequest(requestId);
    setIsModalOpen(true);
  };
  
  // Close Modal and Reset State
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
    setComment('');
  };

  const handleFileUpload = (file) => {
  if (!file) return;
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB.");
    return;
  }

  // Proceed with upload (e.g., send to server or handle locally)
  console.log("Uploaded file:", file.name);
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
       <div className="bg-white p-6 rounded-lg shadow-lg">
  {/* Increased padding for better spacing */}
  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    <FaBuilding className="mr-3 text-blue-500 text-xl" />
    Company Information
  </h2>
  
  {/* Company Name */}
  <p className="text-gray-700 flex items-center mb-2">
    <FaIdCard className="mr-3 text-yellow-500 text-lg" />
    <strong className="w-40 text-gray-800">Company Name:</strong> {/* Fixed width for gap */}
    <span className="text-gray-800">BAYDO Corporation</span>
  </p>
  
  {/* Company Address */}
  <p className="text-gray-700 flex items-center mb-2">
    <FaMapMarkerAlt className="mr-3 text-red-500 text-lg" />
    <strong className="w-40 text-gray-800">Company Address:</strong> {/* Fixed width for gap */}
    <span className="text-gray-800">123 Mashel Abed, Addis Ababa</span>
  </p>
  
  {/* Company Phone */}
  <p className="text-gray-700 flex items-center mb-2">
    <FaPhone className="mr-3 text-green-500 text-lg" />
    <strong className="w-40 text-gray-800">Company Phone:</strong> {/* Fixed width for gap */}
    <span className="text-gray-800">+251-965-686-679</span>
  </p>
  
  {/* Company Email */}
  <p className="text-gray-700 flex items-center mb-2">
    <FaEnvelope className="mr-3 text-purple-500 text-lg" />
    <strong className="w-40 text-gray-800">Company Email:</strong> {/* Fixed width for gap */}
    <a href="mailto:barawsfa20@gmail.com" className="text-blue-500 hover:underline">
      barawsfa20@gmail.com
    </a>
  </p>
</div>


      {/* Request Details Section */}
<div className="bg-white p-4 rounded-lg shadow-md ">
  {/* Reduced padding, added transition */}
  <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">
    <FaProjectDiagram className="mr-2 text-indigo-500" /> Request Details
  </h2>

  {/* Request ID */}
  <p className="text-gray-600 flex items-center mb-3"> {/* Increased margin-bottom to mb-3 */}
    <FaIdCard className="mr-2 text-yellow-500" />
    <strong className="w-40 text-gray-800">Request ID:</strong> {/* Fixed width for gap */}
    <span className="text-gray-800">REG/987454543/2020</span>
  </p>

  {/* Request Date */}
  <p className="text-gray-600 flex items-center mb-3"> {/* Increased margin-bottom to mb-3 */}
    <FaCalendarAlt className="mr-2 text-blue-500" />
    <strong className="w-40 text-gray-800">Request Date:</strong> {/* Fixed width for gap */}
    <span className="text-gray-800">12 Dec, 2020</span>
  </p>

  {/* Request Type */}
  <p className="text-gray-600 flex items-center mb-3"> {/* Increased margin-bottom to mb-3 */}
    <FaFileAlt className="mr-2 text-gray-500" />
    <strong className="w-40 text-gray-800">Request Type:</strong> {/* Fixed width for gap */}
    <span className="text-purple-400">Project</span> {/* Softer purple */}
  </p>
</div>




      </div>


<div className="flex gap-6 mt-6">
  {/* Left Column: Request Service + Approval Status */}
  <div className="w-1/2">
    {/* Request Service Section */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">Request Service</h2>

      <div className="flex items-center mb-5">
        <span className="text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
          </svg>
        </span>
        <span className="font-medium text-gray-600 ml-3">Cyber Security Risk Management Service</span>
      </div>

      <ul className="list-disc pl-6">
        <li className="text-gray-600 mb-4 flex">
          <strong className="text-gray-800 flex-shrink-0">Strategic Level Risk Assessment:</strong>
          <span className="text-gray-800 ml-4">Up to 1,500.00</span>
        </li>
        <li className="text-gray-600 mb-4 flex">
          <strong className="text-gray-800 flex-shrink-0">Tactical Level Risk Assessment:</strong>
          <span className="text-gray-800 ml-6">Up to 1,500.00</span>
        </li>
        <li className="text-gray-600 mb-4 flex">
          <strong className="text-gray-800 flex-shrink-0">Governance Document Development:</strong>
          <span className="text-gray-800 ml-16">Up to 1,500.00</span>
        </li>
        <li className="text-gray-600 mb-4 flex">
          <strong className="text-gray-800 flex-shrink-0">Roles and Responsibilities for Management:</strong>
          <span className="text-gray-800 ml-8">Up to 1,500.00</span>
        </li>
      </ul>
    </div>

    {/* Approval Status Section - Now under Request Service */}
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black mb-4">Approval Status</h3>
      {approvalStatus.map((status, index) => (
        <div
          key={index}
          className="flex justify-between items-center mt-2 bg-[#F5EFEF] p-3 rounded-lg"
        >
          <p className="text-sm font-medium text-black flex-1">
            <strong>{status.role}:</strong>
          </p>
          <div className="relative flex items-center space-x-2">
            <FaCommentDots
              className="text-blue-500 cursor-pointer"
              onClick={() => toggleComment(index)}
              title="View Comment"
            />
            {activeComment === index && (
              <div className="absolute bg-white p-4 rounded-lg shadow-lg mt-2 right-0 w-64 z-10">
                <FaTimes
                  className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  onClick={() => toggleComment(index)}
                  title="Close Comment"
                />
                <p className="text-sm">{status.comment}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

  </div>

  {/* Right Column: Documents */}
  <div className="w-2/4 flex flex-col gap-4">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black mb-4">Documents</h3>
      <ul className="mt-2">
        {requestLetters.map((doc, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="text-sm">{doc}</span>
            <div className="flex space-x-2">
              <a href={`/path/to/${doc}`} target="_blank" rel="noopener noreferrer">
                <FaEye className="text-blue-500" title="View" />
              </a>
              <a href={`/path/to/${doc}`} download>
                <FaDownload className="text-blue-500" title="Download" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>

<div className="bg-white p-6 rounded-lg shadow-md">
  <h3 className="text-center font-bold text-md sm:text-lg md:text-xl text-black mb-4">
   Please upload the revised letter 
  </h3>
  
  <div
    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-400 transition cursor-pointer"
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }}
  >
    <p className="text-center mb-2">Drag & drop your PDF here</p>
    <p className="text-sm text-gray-400">or click to upload</p>
    <input
      type="file"
      accept="application/pdf"
      className="hidden"
      id="pdfUpload"
      onChange={(e) => handleFileUpload(e.target.files[0])}
    />
    <label htmlFor="pdfUpload" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
      Choose File
    </label>
  </div>
</div>



  </div>


</div>




 {/* Modal for Expert Selection */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-10 z-50">
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl ">
      <h2 className="text-sm font-semibold mb-3">Assign Expert for Request ID: {selectedRequest}</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search by Name */}
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        />

        {/* Filter by Expertise */}
        <select
          value={filterExpertise}
          onChange={(e) => setFilterExpertise(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        >
          <option value="">All Expertise</option>
          <option value="Mobile">Mobile</option>
          <option value="Network">Network</option>
          <option value="Website">Website</option>
        </select>

        {/* Filter by Task Load */}
        <select
          value={filterTaskLoad}
          onChange={(e) => setFilterTaskLoad(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        >
          <option value="">All Task Loads</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* Experts List */}
      <div className="overflow-y-auto max-h-48 mb-3 border rounded-md">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-1 px-2">Name</th>
              <th className="py-1 px-2">Email</th>
              <th className="py-1 px-2">Task Load</th>
              <th className="py-1 px-2">Expertise</th>
              <th className="py-1 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExperts.map((expert) => (
              <tr key={expert.id} className="border-b">
                <td className="py-1 px-2">{expert.name}</td>
                <td className="py-1 px-2">{expert.email}</td>
                <td className="py-1 px-2">{expert.taskLoad}</td>
                <td className="py-1 px-2">{expert.expertise}</td>
                <td className="py-1 px-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs"
                    onClick={() => setSelectedExpert(expert)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Expert and Comment */}
      {selectedExpert && (
        <div className="mt-2">
          <h3 className="text-sm font-medium mb-1">
            Selected Expert: {selectedExpert.name} ({selectedExpert.expertise})
          </h3>
          <textarea
            className="w-full border rounded-md p-2 text-xs"
            rows="3"
            placeholder="Write a comment for the expert"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      )}

      {/* Assigned and End Date */}
      {selectedExpert && (
        <div className="mt-3 flex gap-4">
          <div className="w-full">
            <label className="block text-xs font-semibold mb-1">Assigned Date</label>
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-semibold mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full"
            />
          </div>
        </div>
      )}

      {/* Modal Actions */}
      <div className="flex justify-center space-x-2 mt-3 flex-wrap">
        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md w-full sm:w-auto text-xs"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md w-full sm:w-auto text-xs"
          onClick={() => {
            alert(
              `Expert Assigned:\nName: ${selectedExpert?.name}\nComment: ${comment}\nAssigned Date: ${assignedDate}\nEnd Date: ${endDate}`
            );
            closeModal();
          }}
          disabled={!selectedExpert || !comment || !assignedDate || !endDate}
        >
          Confirm Assignment
        </button>
      </div>
    </div>
  </div>
)}
   
    </div>
  );
};

export default RequestOverview;