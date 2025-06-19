"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaTools, FaFlag, FaBuilding, FaFolder, FaCheckCircle, FaCog, FaInfoCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaProjectDiagram } from 'react-icons/fa'; // Importing icons

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
    type: "Technical Review",
    status: "Closed",
    priority: "High",
    assignedDate: "12 Dec, 2020",
    endDate: "12 Dec, 2020",
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-4 flex gap-4">
        {/* Left Side */}
        <div className="w-1/2 ">
          <div className="bg-white rounded-lg p-4 shadow mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              
              Company Information
            </h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaBuilding className="mr-1 text-blue-500" />
                  Company Name:
                </span>
                {companyInfo.name}
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaInfoCircle className="mr-1 text-gray-500" />
                  Company Address:
                </span>
                {companyInfo.address}
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaPhone className="mr-1 text-green-500" />
                  Company Phone:
                </span>
                {companyInfo.phone}
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaEnvelope className="mr-1 text-purple-500" />
                  Company Email:
                </span>
                {companyInfo.email}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              
              Request Details
            </h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaInfoCircle className="mr-1 text-gray-500" />
                  Request ID:
                </span>
                {requestDetails.id}
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaCalendarAlt className="mr-1 text-gray-500" />
                  Request Date:
                </span>
                {requestDetails.date}
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaProjectDiagram className="mr-1 text-red-500" />
                  Priority:
                </span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs inline-flex items-center">
                  <FaFlag className="mr-1 text-red-500" /> {requestDetails.priority}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaTools className="mr-1 text-gray-500" />
                  Request Type:
                </span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs inline-flex items-center">
                  <FaTools className="mr-1 text-gray-500" /> {requestDetails.type}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaCheckCircle className="mr-1 text-yellow-500" />
                  Request Status:
                </span>
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Closed</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaCalendarAlt className="mr-1 text-gray-500" />
                  Assigned Date :
                </span>
                <span className="ml-2">{requestDetails.assignedDate}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold flex items-center mr-1">
                  <FaCalendarAlt className="mr-1 text-gray-500" />
                  End Date :
                </span>
                <span className="ml-2">{requestDetails.endDate}</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              
              Request Service
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
        <div className="w-1/2  flex flex-col gap-4">
          {/* Request Letter */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Request Letter
            </h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>Organizational Cyber Management Policy.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDocumentView("Organizational_Cyber_Management_Policy.pdf")}
                  aria-label="View"
                >
                  <FaEye className="text-blue-600" />
                </button>
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

          {/* Documents Section */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              
              Documents
            </h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>Organizational Cyber Management Policy.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDocumentView("Organizational_Cyber_Management_Policy.pdf")}
                  aria-label="View"
                >
                  <FaEye className="text-blue-600" />
                </button>
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
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Approval Status
            </h2>
            <div className="space-y-3 text-sm">
              {approvalStatus.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="flex items-center"><FaInfoCircle className="mr-1 text-gray-500" />{status.role}</span>
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
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Service Agreement and Payment Instructions
            </h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>Letter to BAYDO.corporation.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDocumentView("Letter to BAYDO.corporation.pdf")}
                  aria-label="View"
                >
                  <FaEye className="text-blue-600" />
                </button>
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

          {/* Closure Letter */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">

              Closure Letter
            </h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>BAYDO corporation risk management report.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDocumentView("BAYDO_corporation_risk_management_report.pdf")}
                  aria-label="View"
                >
                  <FaEye className="text-blue-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDownload("BAYDO_corporation_risk_management_report.pdf")}
                  aria-label="Download"
                >
                  <FaDownload className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects */}
          {[1, 2].map((num) => (
            <div key={num} className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              
                Project {num}
              </h2>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <FaFileAlt className="text-gray-500 mr-2" />
                  <span>Letter to BAYDO.corporation.pdf</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 hover:bg-gray-200 rounded-full"
                    onClick={() => handleDocumentView("Letter to BAYDO.corporation.pdf")}
                    aria-label="View"
                  >
                    <FaEye className="text-blue-600" />
                  </button>
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
          ))}
        </div>
      </div>

      {/* Modal for document preview or approval status */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">
                {selectedDocument ? 'Document Preview' : selectedRole}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            {selectedDocument ? (
              <div className="mb-3 h-[70vh] overflow-auto">
                <iframe
                  src={`/documents/${selectedDocument}`}
                  className="w-full h-full"
                  title="Document Preview"
                />
              </div>
            ) : (
              <div className="mb-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">
                    {approvalStatus.find(status => status.role === selectedRole)?.comment}
                  </p>
                </div>
              </div>
            )}
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
  );
};

export default View;