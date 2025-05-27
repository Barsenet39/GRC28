"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaTools, FaFlag } from 'react-icons/fa'; // Importing icons

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
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6 flex gap-6">
        {/* Left Side */}
        <div className="w-1/2 pr-4">
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Company Information</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Company Name:</span> {companyInfo.name}</p>
              <p><span className="font-semibold">Company Address:</span> {companyInfo.address}</p>
              <p><span className="font-semibold">Company Phone:</span> {companyInfo.phone}</p>
              <p><span className="font-semibold">Company Email:</span> {companyInfo.email}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Request Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Request ID:</span> {requestDetails.id}</p>
              <p><span className="font-semibold">Request Date:</span> {requestDetails.date}</p>
              <p>
                <span className="font-semibold">Priority:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-flex items-center">
                  <FaFlag className="mr-1" /> {requestDetails.priority}
                </span>
              </p>
              <p>
                <span className="font-semibold">Request Type:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-flex items-center">
                  <FaTools className="mr-1" /> {requestDetails.type}
                </span>
              </p>
              <p>
                <span className="font-semibold">Request Status:</span>
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Closed</span>
              </p>
              <p>
                <span className="font-semibold">Assigned Date :</span>
                <span className="ml-2">{requestDetails.assignedDate}</span>
              </p>
              <p>
                <span className="font-semibold">End Date :</span>
                <span className="ml-2">{requestDetails.endDate}</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Request Service</h2>
            {requestServices.map((category, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">{category.title}</h3>
                <div className="space-y-2">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="flex justify-between items-center">
                      <span className="text-blue-600 flex items-center">
                        <FaFileAlt className="mr-2" />
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
        <div className="w-1/2 pl-4 flex flex-col gap-4">
          {/* Request Letter */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Request Letter</h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Documents</h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
          <div className="bg-purple-50 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Approval Status</h2>
            <div className="space-y-3">
              {approvalStatus.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span>{status.role}</span>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Service Agreement and Payment Instructions</h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Closure Letter</h2>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Project {num}</h2>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {selectedDocument ? 'Document Preview' : selectedRole}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            {selectedDocument ? (
              <div className="mb-4 h-[70vh] overflow-auto">
                <iframe
                  src={`/documents/${selectedDocument}`}
                  className="w-full h-full"
                  title="Document Preview"
                />
              </div>
            ) : (
              <div className="mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">
                    {approvalStatus.find(status => status.role === selectedRole)?.comment}
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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