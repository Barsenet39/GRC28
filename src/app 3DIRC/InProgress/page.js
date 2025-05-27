"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileAlt, FaEye, FaDownload, FaCalendarAlt, FaProjectDiagram, FaBuilding, FaInfoCircle, FaPhone, FaEnvelope, FaTools, FaCheckCircle, FaUserTie, FaComment, FaRegFileAlt } from 'react-icons/fa'; // Importing icons

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
    id: "REQ/867544534/54",
    date: "12 Dec, 2020",
    type: "Project",
    status: "In progress",
    assignedDate: "12 Dec, 2020",
    endDate: "12 Dec, 2020",
  };

  const requestServices = [
    {
      title: "Cyber Security Risk Management Service",
      services: [
        { name: "Strategic Level Risk Assessment", cost: "900,000" },
        { name: "Tactical Level Risk Assessment", cost: "850,000" },
      ],
    },
    {
      title: "Cyber Security Management Service",
      services: [
        { name: "Governance Document Development", total: "Total cost", cost: "600,000" },
        { name: "Cyber Security Risk Quantification Document", cost: "680,000" },
        { name: "Tactical Level Risk Assessment", cost: "680,000" },
      ],
    },
  ];

  const approvalStatus = [
    { role: "Director General Approval", status: "pending", comment: "Pending review of security assessment details" },
    { role: "Deputy Director Approval", status: "pending", comment: "Awaiting initial approval from Director General" },
    { role: "Directorate Director Approval", status: "pending", comment: "Technical evaluation in progress" },
    { role: "Division Head Approval", status: "pending", comment: "Technical evaluation in progress" },
  ];

  const projectDocuments = [
    { project: "Project 1", from: "CSM", filename: "Letter to BAYDD.corporation.pdf" },
    { project: "Project 2", from: "CSRM", filename: "Letter to BAYDD.corporation.pdf" },
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
                <FaCheckCircle className="mr-1 text-blue-500" />
                <span className="font-semibold">Request Status:</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{requestDetails.status}</span>
              </p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-1 text-teal-500" />
                <span className="font-semibold">Assigned Date:</span> {requestDetails.assignedDate}
              </p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-1 text-teal-500" />
                <span className="font-semibold">End Date:</span> {requestDetails.endDate}
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

          {/* Assigned Experts */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Assigned Experts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-700">Bereket Adisu</p>
                <p className="text-xs text-gray-500">20002548</p>
                <p className="text-xs text-green-600">Expertise: TM</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-700">Birhanu Aleka</p>
                <p className="text-xs text-gray-500">20002552</p>
                <p className="text-xs text-green-600">Expertise: PM</p>
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

          {/* Project Documents */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              Project Documents
            </h2>
            {projectDocuments.map((doc, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">{doc.project}</p>
                    <p className="text-xs text-gray-500">From {doc.from}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/documents/${doc.filename}`}
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEye className="mr-1" />
                    </a>
                    <a
                      href={`/documents/${doc.filename}`}
                      className="text-blue-600 hover:text-blue-800"
                      download
                    >
                      <FaDownload className="mr-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <button className="bg-blue-100 text-blue-700 rounded-md py-2 px-4 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex items-center">
                <FaComment className="mr-2" />
                View Comment
              </button>
              <button className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 text-sm" disabled>
                Approved
              </button>
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