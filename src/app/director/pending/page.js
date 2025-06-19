"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaDownload, FaCalendarAlt, FaProjectDiagram, FaEye, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const View = () => {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [decision, setDecision] = useState(null);
  const [commentsText, setCommentsText] = useState("");
  const [priority, setPriority] = useState(true);

  const approvalDetails = {
    "Deputy Director Approval": {
      comment: "The request has been accepted.",
      priority: "low",
      date: "2012/09/03 12:00:98",
    },
  };

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setCommentsText(e.target.value);
  };

  const handleSend = () => {
    alert(`Decision: ${decision}, Comments: ${commentsText}`);
  };

  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setModalVisible(true);
  };

  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/documents/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRole(null);
    setSelectedDocument(null);
  };

  const companyInfo = {
    name: "BAYDO Corporation",
    address: "123 Mashel Abed, Addis Ababa",
    email: "barawsfa20@gmail.com",
    phone: "+251-965-686-679",
  };

  const requestDetails = {
    id: "REG/987454543/2020",
    date: "12 Dec, 2020",
    type: "Project",
    status: "Accepted",
  };

  const requestServices = [
    {
      title: "Cyber Security Risk Management Service",
      services: [
        { name: "Strategic Level Risk Assessment", cost: "UP to 1,500,000" },
        { name: "Tactical Level Risk Assessment", cost: "UP to 1,700,00" },
      ],
    },
    {
      title: "Cyber Security Management Service",
      services: [
        { name: "Governance Document Development", total: "Total cost", cost: "UP to 1,500,000" },
        { name: "Cyber Security Risk Quantification Document", cost: "UP to ,900,000" },
        { name: "Tactical Level Risk Assessment", cost: "UP to ,900,000" },
      ],
    },
  ];

  const approvalStatus = [
    { role: "Director General Approval", status: "pending", comment: "Pending review of security assessment details" },
    { role: "Deputy Director Approval", status: "pending", comment: "Awaiting initial approval from Director General" },
    { role: "Directorate Director Approval", status: "pending", comment: "Technical evaluation in progress" },
    { role: "Division Head Approval", status: "pending", comment: "Technical evaluation in progress" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 text-sm">
      <div className="container mx-auto flex gap-4 w-full">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Company Information</h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center"><FaBuilding className="mr-1 text-blue-400" /> <span className="font-semibold">Company Name:</span> {companyInfo.name}</p>
              <p className="flex items-center"><FaMapMarkerAlt className="mr-1 text-blue-400" /> <span className="font-semibold">Company Address:</span> {companyInfo.address}</p>
              <p className="flex items-center"><FaPhone className="mr-1 text-green-400" /> <span className="font-semibold">Company Phone:</span> {companyInfo.phone}</p>
              <p className="flex items-center"><FaEnvelope className="mr-1 text-purple-400" /> <span className="font-semibold">Company Email:</span> {companyInfo.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Request Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Request ID:</span> {requestDetails.id}</p>
              <p><span className="font-semibold">Request Date:</span> <FaCalendarAlt className="inline-block text-green-500 mr-1" />{requestDetails.date}</p>
              <p><span className="font-semibold">Request Type:</span> <FaProjectDiagram className="inline-block text-purple-500 mr-1" />{requestDetails.type}</p>
              <p><span className="font-semibold">Request Status:</span><span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">{requestDetails.status}</span></p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Request Service</h2>
            {requestServices.map((category, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">{category.title}</h3>
                <div className="space-y-2">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="flex justify-between items-center">
                      <span className="text-blue-600 flex items-center">
                        <FaFileAlt className="mr-2 text-blue-400" />
                        {service.name}
                      </span>
                      <span className="text-gray-700">{service.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-md font-semibold mb-2 text-gray-800">Request Letter</h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>Organizational Cyber Management Policy.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDownload("Organizational_Cyber_Management_Policy.pdf")}
                  aria-label="Download"
                >
                  <FaDownload className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>

      {/* Service Agreement and Payment Instructions */}
<div className="bg-white rounded-lg shadow-md p-4 relative">
  <h2 className="text-md font-semibold mb-2 text-gray-800 flex items-center">
    <span className="flex items-center">Service Agreement and Payment Instructions</span>
  </h2>
  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
    <div className="flex items-center">
      <FaFileAlt className="text-gray-500 mr-2" />
      <span>Letter to BAYDO.corporation.pdf</span>
    </div>
    <div className="flex space-x-2">
      <button
        className="p-2 hover:bg-gray-200 rounded-full"
        onClick={() => handleDownload("Letter to BAYDO.corporation.pdf")}
        aria-label="Download"
      >
        <FaDownload className="text-blue-600" />
      </button>
    </div>
  </div>

  {/* Approved Button */}
  <div className="flex justify-end mt-4">
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      onClick={() => alert("Request Approved")}
    >
      Approved
    </button>
  </div>
</div>


          <div className="bg-white p-4 rounded-lg shadow-md w-full hover:scale-105 transition duration-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Comment Section</h2>
            <p className="text-gray-600 mb-2">If You have any quetions write here</p>
           
            <textarea
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md resize-none text-gray-600"
              placeholder="Add comments here..."
              value={commentsText}
              onChange={handleCommentsChange}
            />
            <div className="flex justify-end mt-3">
              <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200 mr-2">Cancel</button>
              <button className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200" onClick={handleSend} disabled={!decision || !priority}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
