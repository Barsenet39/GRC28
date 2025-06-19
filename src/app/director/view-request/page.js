"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaDownload, FaEye, FaFileAlt, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa";
import { format } from 'date-fns';

const RequestOverview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id');

  const [request, setRequest] = useState(null);
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeComment, setActiveComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [showApprovalComment, setShowApprovalComment] = useState(false);
  const [priority, setPriority] = useState('');
  const [commentsText, setCommentsText] = useState('');
  const [showSentPopup, setShowSentPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId) {
        setError('No request ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        // Fetch Request
        const requestResponse = await fetch(`${apiUrl}/api/requests/${encodeURIComponent(requestId)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!requestResponse.ok) {
          const text = await requestResponse.text();
          throw new Error(`Failed to fetch request: ${requestResponse.status} ${text.slice(0, 200)}`);
        }

        const requestData = await requestResponse.json();
        setRequest(requestData);

        // Fetch Decision
        const decisionResponse = await fetch(`${apiUrl}/api/decisions/${encodeURIComponent(requestId)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (decisionResponse.ok) {
          const decisionData = await decisionResponse.json();
          setDecision(decisionData);
          setPriority(decisionData.priority || '');
          setCommentsText(decisionData.comments || '');
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
        // Fallback to static data
        setRequest({
          requestId: 'REG/987454543/2020',
          companyName: 'BAYDO Corporation',
          companyAddress: '123 Mashel Abed, Addis Ababa',
          companyPhone: '+251-965-686-679',
          companyEmail: 'barawsfa20@gmail.com',
          date: new Date('2020-12-12'),
          type: 'Project',
          services: [
            {
              mainTitle: 'Cyber Security Risk Management Service',
              items: [
                { name: 'Strategic Level Risk Assessment', cost: '1500.00' },
                { name: 'Tactical Level Risk Assessment', cost: '1500.00' },
              ],
            },
            {
              mainTitle: 'Cyber Security Management Service',
              items: [
                { name: 'Governance Document Development', cost: '1500.00' },
                { name: 'Roles and Responsibilities for Management', cost: '1500.00' },
              ],
            },
          ],
          file: { filename: 'Organizational Cyber Management Policy.pdf' },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  const handleView = (role) => {
    if (role === 'Director General Approval') {
      setShowApprovalComment(true);
    }
    console.log(`Viewing details for: ${role}`);
  };

  const comments = decision ? {
    DivisionHead: (
      <>
        <div className="text-center">Request {decision.status.toLowerCase()}</div>
        { <div className="text-center">Date: {format( Date(decision.createdAt), 'dd MMM, yyyy')}</div> }
        <div className="text-center">By: Division Head</div>
      </>
    ),
  } : {};

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

  const handleUpload = async () => {
    if (!file) return alert('No file selected');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/requests/${encodeURIComponent(requestId)}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to upload file: ${response.status} ${text.slice(0, 200)}`);
      }

      alert(`Uploaded: ${file.name}`);
      setRequest((prev) => ({ ...prev, file: { filename: file.name } }));
      setIsModalOpen(false);
      setFile(null);
    } catch (err) {
      console.error('Upload error:', err.message);
      alert(`Upload failed: ${err.message}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  const handleCloseApprovalComment = () => setShowApprovalComment(false);

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    const priorityMap = {
      CSRM: 'Assurance',
      CSM: 'BDPD',
      BOTH: 'Both',
    };
    setPriority(priorityMap[value] || '');
  };

  const handleCommentsChange = (e) => setCommentsText(e.target.value);

  const handleSend = async () => {
    if (!priority) return alert('Please select a priority');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/decisions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: 'Accepted', // Assuming Director General approves
          priority,
          comments: commentsText,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to save decision: ${response.status} ${text.slice(0, 200)}`);
      }

      setShowSentPopup(true);
      setTimeout(() => setShowSentPopup(false), 3000);

      // Update decision state
      const decisionData = await response.json();
      setDecision(decisionData);
    } catch (err) {
      console.error('Send error:', err.message);
      alert(`Failed to save decision: ${err.message}`);
    }
  };

  const handleDownload = () => {
    if (!request?.file?.filename) return alert('No file available');

    const fileUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${request.file.filename}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = request.file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  if (!request) {
    return <div className="text-center p-4">No request found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 text-sm">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Request Overview</h1>

      {showSentPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-400 text-white py-2 px-4 rounded-md shadow-md z-50">
          Sent it!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">Company Information</h2>
          <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Company Name:</strong> {request.companyName}</p>
          <p className="text-gray-600 flex items-center mb-1"><FaMapMarkerAlt className="mr-2 text-red-500" /> <strong>Company Address:</strong> {request.companyAddress || 'N/A'}</p>
          <p className="text-gray-600 flex items-center mb-1"><FaPhone className="mr-2 text-green-500" /> <strong>Company Phone:</strong> <span className="text-gray-700">{request.companyPhone || 'N/A'}</span></p>
          <p className="text-gray-600 flex items-center mb-1">
            <FaEnvelope className="mr-2 text-purple-500" />
            <strong>Company Email:</strong>
            <a href={`mailto:${request.companyEmail}`} className="text-blue-400 hover:underline"> {request.companyEmail || 'N/A'}</a>
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 flex items-center">Request Details</h2>
          <p className="text-gray-600 flex items-center mb-1"><FaIdCard className="mr-2 text-yellow-500" /> <strong>Request ID:</strong> {request.requestId}</p>
          <p className="text-gray-600 flex items-center mb-1"><FaCalendarAlt className="mr-2 text-blue-500" /> <strong>Request Date:</strong> {format(new Date(request.date), 'dd MMM, yyyy')}</p>
          <p className="text-gray-600 flex items-center mb-1"><FaFileAlt className="mr-2 text-gray-500" /> <strong>Request Type:</strong> <span className="text-purple-400">{request.type}</span></p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition duration-200 mb-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Request Service</h2>
        <div className="flex justify-between pb-8">
          {request.services?.map((service, index) => (
            <div key={index} className="w-1/2">
              <div className="flex items-center mb-2">
                <span className="text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l-8 8h5v8h6m1-5l5-5-5-5" />
                  </svg>
                </span>
                <span className="font-medium text-gray-600 ml-2">{service.mainTitle}</span>
              </div>
              <ul className="list-disc pl-5">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600"><strong>{item.name}</strong> - Up to {item.cost}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex flex-col bg-white p-3 rounded-md mt-2 w-1/2 shadow-md hover:scale-105 transition duration-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Request Letter</h3>
          <div className="flex items-center justify-between h-20">
            <span className="text-gray-600">{request.file?.filename || 'No file uploaded'}</span>
            <div className="flex items-center">
              {request.file?.filename && <FaDownload className="text-blue-400 cursor-pointer" onClick={handleDownload} />}
              <FaEye className="text-blue-400 cursor-pointer ml-2" onClick={handleUploadClick} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-1/2 ml-2 hover:scale-105 transition duration-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Decision on Request</h2>
          <p className="text-gray-600 mb-2">Please select a priority:</p>
          <div className="flex items-center mb-3">
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="CSRM" className="mr-1" onChange={handlePriorityChange} checked={priority === 'Assurance'} />
              <span className="text-gray-600"><b>CSRM</b></span>
            </label>
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="CSM" className="mr-1" onChange={handlePriorityChange} checked={priority === 'BDPD'} />
              <span className="text-gray-600"><b>CSM</b></span>
            </label>
            <label className="mr-3 flex items-center">
              <input type="radio" name="priority" value="BOTH" className="mr-1" onChange={handlePriorityChange} checked={priority === 'Both'} />
              <span className="text-gray-600"><b>BOTH</b></span>
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
            <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200 mr-2" onClick={() => setPriority('')}>Cancel</button>
            <button className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200" onClick={handleSend} disabled={!priority}>Send</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-3 rounded-lg shadow-lg w-11/12 md:w-[600px] h-[250px] flex flex-col items-center justify-between">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Upload Report</h2>
            <div
              className="border-4 border-dashed border-gray-300 rounded-lg h-20 w-full flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:border-blue-400 transition duration-200"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input type="file" id="file-input" onChange={handleFileChange} className="hidden" />
              {file ? <span className="text-gray-600">{file.name}</span> : <span>Drag & Drop or Click to Upload</span>}
            </div>
            <div className="flex justify-end mt-3">
              <button className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200" onClick={handleUpload}>Upload</button>
              <button className="bg-gray-200 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-200 ml-2" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverview;