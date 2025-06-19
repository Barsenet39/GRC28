"use client"; // Required for interactive client-side components

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFileAlt, FaEye, FaDownload } from 'react-icons/fa'; // Importing icons

const View = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id');

  const [request, setRequest] = useState(null);
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Fetch data from API
  useEffect(() => {
    if (!requestId) {
      setError('No request ID provided');
      setLoading(false);
      return;
    }

    const fetchRequest = async () => {
      try {
        const response = await fetch(`/api/requests/${encodeURIComponent(requestId)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(`Failed to fetch request: ${errorData.error || 'Not found'}`);
        }

        const data = await response.json();
        setRequest(data);
      } catch (err) {
        console.error('Fetch request error:', err.message);
        setError(`Unable to load request: ${err.message}`);
      }
    };

    const fetchDecision = async () => {
      try {
        const response = await fetch(`/api/decisions/${encodeURIComponent(requestId)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok && response.status !== 404) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(`Failed to fetch decision: ${errorData.error || 'Not found'}`);
        }

        if (response.ok) {
          const data = await response.json();
          setDecision(data);
        }
      } catch (err) {
        console.error('Fetch decision error:', err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRequest(), fetchDecision()]);
      setLoading(false);
    };

    fetchData();
  }, [requestId]);

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

  // Construct approval status from decision data
  const approvalStatus = [
    {
      role: "Director General Approval",
      status: decision ? decision.status.toLowerCase() : "pending",
      comment: decision?.comments || "Pending review",
    },
    {
      role: "Deputy Director Approval",
      status: decision ? decision.status.toLowerCase() : "pending",
      comment: decision?.commentsdd || "Awaiting approval",
    },
    {
      role: "Directorate Director Approval",
      status: "pending",
      comment: "Technical evaluation in progress",
    },
  ];

  // Static company info (adjust if stored in database)
  const companyInfo = {
    name: request?.companyName || "N/A",
    address: "123 Mashel Abed, Addis Ababa",
    email: "barawsfa20@gmail.com",
    phone: "+251-965-686-679",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-4">
        <div className="bg-white p-4 rounded shadow">{error}</div>
      </div>
    );
  }

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
              <p><span className="text-gray-600">Request ID:</span> {request?.requestId || 'N/A'}</p>
              <p><span className="text-gray-600">Request Date:</span> {request?.date ? new Date(request.date).toLocaleDateString() : 'N/A'}</p>
              <p><span className="text-gray-600">Request Type:</span> {request?.type || 'N/A'}</p>
              <p><span className="text-gray-600">Request Status:</span> 
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {request?.status || 'N/A'}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Request Services</h2>
            {request?.services?.length > 0 ? (
              request.services.map((category, idx) => (
                <div key={idx} className="mb-2">
                  <h3 className="font-medium text-gray-800 mb-2">{category.mainTitle}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-center">
                        <span className="text-blue-600">{item.name}</span>
                        <span className="text-gray-700">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No services found.</p>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 pl-4">
          <div className="bg-white rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Request Letter</h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FaFileAlt className="text-gray-500 mr-2" />
                <span>{request?.file?.filename || 'No file available'}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDocumentView(request?.file?.filename || "No file") }
                >
                  <FaEye className="text-blue-600" />
                </button>
                {request.file && (
                  <button
                    className="p-2 hover:bg-gray-200 rounded-full"
                    onClick={() => handleDownload(request.file.filename)}
                  >
                    <FaDownload className="text-blue-600" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {modalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{selectedRole || "Document View"}</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="mb-4">
                  {selectedRole ? (
                    <p className="text-gray-600">
                      {approvalStatus.find(status => status.role === selectedRole)?.comment || "No comment available"}
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      Viewing document: {selectedDocument || "No document selected"}
                    </p>
                  )}
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
      </div>
    </div>
  );
};

export default View;