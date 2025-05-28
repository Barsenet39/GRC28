"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaDownload, FaEye, FaFileAlt,FaCalendarAlt } from "react-icons/fa";
const View = () => {
  const router = useRouter();
  
  const handleAddRequest = () => {
    router.push('/Package'); // Redirect to the /Package page
  };

  const requestDetails = {
    id: "REG/867544534/54",
    date: "12 Dec, 2020",
    type: "Project",
    status: "Accepted",
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

  const [comment, setComment] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = (fileName) => {
    alert(`Downloading: ${fileName}`); // Placeholder for actual download logic
  };

  const handleView = (fileName) => {
    window.open(`/path/to/${fileName}`, "_blank"); // Update with actual path
  };

  const handleAddComment = () => {
    setIsCommentVisible(true);
  };

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleSubmitComment = () => {
    setIsSubmitted(true);
    setIsCommentVisible(false);
    setComment("");
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
    <span className="w-2/3 text-left"><FaCalendarAlt className="inline-block mr-1 text-primary" />
    {requestDetails.date}</span>
  </div>
 <div className="flex justify-between mb-2">
    <strong className="w-1/3">Request Type:</strong>
    <span className="flex items-center w-2/3 text-left">
    <FaFileAlt className="inline-block mr-1 text-green-500" /> 
      {requestDetails.type}
    </span>
  </div>
  <div className="flex justify-between mb-2">
    <strong className="w-1/3">Request Status:</strong>
    <span className={`w-2/3 text-left ${requestDetails.status === 'Accepted' ? 'text-blue-600' : ''}`}>
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
          
          <h2 className="text-lg font-semibold mt-6 text-black">Service Agreement and Payment Instructions</h2>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
            <span className="text-black">Letter to BAYDD.corportion.pdf</span>
            <div className="flex items-center">
              <FaEye 
                className="text-blue-600 cursor-pointer mr-2" 
                onClick={() => handleView("Letter_to_BAYDD_corportion.pdf")} 
              />
              <FaDownload 
                className="text-blue-600 cursor-pointer" 
                onClick={() => handleDownload("Letter_to_BAYDD_corportion.pdf")} 
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
          <p className="mt-6 text-black">* If you received a service recommendation from the technical manager, click below to add it to your request.</p>
          <button
  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
  onClick={handleAddRequest}
>
  Add Request
</button>
        </div>
      </div>

      {/* New UI Section for Projects */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-6xl mt-6">
        <h2 className="text-lg font-semibold text-black mb-4">Project Details</h2>
        <p className="mb-4 text-gray-600">We will complete the service per your request, send it to you for approval, and finalize or return it based on your confirmation.</p>

        <div className="border border-gray-300 rounded-md mb-4 p-4">
          <h3 className="font-semibold text-black">Project 1</h3>
          <div className="flex justify-between items-center">
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
          <p className="text-green-600 mt-2">Approved</p>
        </div>

        <div className="border border-gray-300 rounded-md mb-4 p-4">
          <h3 className="font-semibold text-black">Project 2</h3>
          <div className="flex justify-between items-center mb-6">
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
          {isApproved ? (
            <p className="text-green-600 mt-2">Approved</p>
          ) : (
            <>
              {isSubmitted ? (
                <p className="text-green-600 mt-2">Submitted</p>
              ) : (
                <>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 mr-2" onClick={handleAddComment}>
                    Add Comment
                  </button>
                  <button className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700" onClick={handleApprove}>
                    Approve
                  </button>
                </>
              )}
            </>
          )}
          {isCommentVisible && (
            <div className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment here..."
                className="w-full border p-2 rounded-md text-black bg-white"
                rows="3"
              />
              <button 
                className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
                onClick={handleSubmitComment}
              >
                Submit Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;