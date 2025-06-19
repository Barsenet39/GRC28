"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaCalendarAlt, FaProjectDiagram, FaBuilding, FaInfoCircle, FaPhone, FaEnvelope, FaTools, FaCheckCircle, FaUserTie } from 'react-icons/fa'; // Importing icons

const View = () => {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Handle document view
  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setModalVisible(true);
  };

  // Handle download
  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/documents/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle view for approval status
  const handleView = (role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedRole(null);
    setSelectedDocument(null);
  };

  // Sample data for demonstration
  const companyInfo = {
    name: "BAYDO Corporation",
    address: "123 Mashel Abed, Addis Ababa",
    email: "barawsfa20@gmail.com",
    phone: "+251-965-686-679",
  };

  const requestDetails = {
    id: "REG/867544534/54",
    date: "12 Dec, 2020",
    type: "Technical Support",
    status: "Expired",
  };

  const requestServices = [
    {
      title: "Cyber Security Risk Management Service",
      services: [
        { name: "Strategic Level Risk Assessment", cost: "900,000-1,500,000" },
        { name: "Tactical Level Risk Assessment", cost: "850,000-1,700,00" },
      ],
    },
    {
      title: "Cyber Security Management Service",
      services: [
        { name: "Governance Document Development", total: "Total cost", cost: "600,000-1,500,000" },
        { name: "Cyber Security Risk Quantification Document", cost: "680,000-1,900,000" },
        { name: "Tactical Level Risk Assessment", cost: "680,000-1,900,000" },
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-4 flex gap-4">
        {/* Left Side */}
        <div className="w-1/2">

          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Company Information
            </h2>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <FaInfoCircle className="mr-1 text-gray-500" />
                <span className="font-semibold">Company Name:</span> {companyInfo.name}
              </p>
              <p className="flex items-center">
                <FaInfoCircle className="mr-1 text-gray-500" />
                <span className="font-semibold">Company Address:</span> {companyInfo.address}
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-1 text-green-500" />
                <span className="font-semibold">Company Phone:</span> {companyInfo.phone}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-1 text-purple-500" />
                <span className="font-semibold">Company Email:</span> {companyInfo.email}
              </p>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            
              Request Details
            </h2>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <FaInfoCircle className="mr-1 text-gray-500" />
                <span className="font-semibold">Request ID:</span> {requestDetails.id}
              </p>
              <p className="flex items-center">
                <span className="font-semibold">Request Date:</span> <FaCalendarAlt className="mr-1 text-green-500" /><span className="text-green-500">{requestDetails.date}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold">Request Type:</span>  <FaProjectDiagram className="mr-1 text-purple-500" /><span className="text-purple-500">{requestDetails.type}</span>
              </p>
              <p className="flex items-center">
                <FaCheckCircle className="mr-1 text-red-500" />
                <span className="font-semibold">Request Status:</span>
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{requestDetails.status}</span>
              </p>
            </div>
          </div>

          {/* Request Services */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            
              Request Services
            </h2>
            {requestServices.map((category, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm">{category.title}</h3>
                <div className="space-y-2">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="flex justify-between items-center text-sm">
                      <span className="text-blue-600 flex items-center">
                        <FaFileAlt className="mr-2 text-gray-500" />
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

        {/* Right Side */}
        <div className="w-1/2">
          {/* Request Letter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            
              Request Letter
            </h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
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

          {/* Document Section */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Document
            </h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
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

          {/* Approval Status */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Approval Status
            </h2>
            <div className="space-y-3 text-sm">
              {approvalStatus.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="flex items-center">
                    <FaInfoCircle className="mr-1 text-gray-500" />{status.role}
                  </span>
                  <button
                    className="p-2 hover:bg-gray-200 rounded-full"
                    onClick={() => handleView(status.role)}
                    aria-label="View Approval"
                  >
                    <FaEye className="text-blue-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Service Agreement */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Service Agreement and Payment Instructions
            </h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
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
          </div>
        </div>

        {/* Modal for document preview or approval status */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{selectedRole}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="mb-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">
                    {approvalStatus.find(status => status.role === selectedRole)?.comment}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;