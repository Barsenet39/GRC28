"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaCalendarAlt, FaProjectDiagram } from 'react-icons/fa'; // Importing icons

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
    id: "REG/987454543/2020",
    date: "12 Dec, 2020",
    type: "Project",
    status: "Requested",
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
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6 flex">
        {/* Left Side */}
        <div className="w-1/2 pr-4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-2">
              <p><span className="text-gray-600">Company Name:</span> {companyInfo.name}</p>
              <p><span className="text-gray-600">Company Address:</span> {companyInfo.address}</p>
              <p><span className="text-gray-600">Company Phone:</span> {companyInfo.phone}</p>
              <p><span className="text-gray-600">Company Email:</span> {companyInfo.email}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Request Details</h2>
            <div className="space-y-2">
              <p><span className="text-gray-600">Request ID:</span> {requestDetails.id}</p>
              <p>
                <span className="text-gray-600">Request Date:</span>
                <FaCalendarAlt className="text-green-500 inline-block ml-1 mr-1" />
                <span className="text-green-600">{requestDetails.date}</span> {/* Date color */}
              </p>
              <p>
                <span className="text-gray-600">Request Type:</span>
                <FaProjectDiagram className="text-purple-500 inline-block ml-1 mr-1" /> {/* Project icon color */}
                <span className="text-purple-600">{requestDetails.type}</span> {/* Type color */}
              </p>
              <p><span className="text-gray-600">Request Status:</span> 
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {requestDetails.status}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Request Services</h2>
            {requestServices.map((category, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">{category.title}</h3>
                <div className="space-y-3">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="flex justify-between items-center">
                      <span className="text-blue-600">{service.name}</span>
                      <span className="text-gray-700">{service.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 pl-4">
          <div className="bg-white rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Request Letter</h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>Organizational Cyber Management Policy.pdf</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDownload("Organizational_Cyber_Management_Policy.pdf")}
                >
                  <FaDownload className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {modalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{selectedRole}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    {approvalStatus.find(status => status.role === selectedRole)?.comment}
                  </p>
                </div>
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
          
          {/* Update the click handler in the Approval Status section */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
            <div className="space-y-4">
              {approvalStatus.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span>{status.role}</span>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => handleView(status.role)}
                  >
                    <FaEye className="text-blue-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal remains unchanged */}
      </div>
    </div>
  );
};

export default View;