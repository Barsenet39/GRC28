"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FaDownload,
  FaEye,
  FaFileAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
} from 'react-icons/fa';

const RequestOverview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id');

  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [decision, setDecision] = useState(null);
  const [prioritydd, setPrioritydd] = useState('');
  const [commentsdd, setCommentsdd] = useState('');
  const [approvalComment, setApprovalComment] = useState('No comments provided');
  const [showSentModal, setShowSentModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const approvalStatus = [
    {
      role: 'Deputy Director',
      status: 'pending',
      comment: approvalComment,
    },
  ];

  useEffect(() => {
    if (!requestId) {
      setError('No request ID provided');
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
          throw new Error(`Failed to fetch request: ${response.status} - ${errorData.error || 'Not found'}`);
        }

        const data = await response.json();
        setRequest(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
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
          throw new Error(`Failed to fetch decision: ${response.status} - ${errorData.error || 'Not found'}`);
        }

        if (response.ok) {
          const data = await response.json();
         setDecision(
         data.status === 'Accepted' ? 'accept' :
         data.status === 'Rejected' ? 'reject' :
         data.status === 'Deputy_Rejected' ? 'deputy_reject' : null);
          setPrioritydd(data.prioritydd || '');
          setCommentsdd(data.commentsdd || '');
          setApprovalComment(data.comments || 'No comments provided');
        }
      } catch (err) {
        console.error('Fetch decision error:', err.message);
      }
    };

    fetchRequest();
    fetchDecision();
  }, [requestId]);

  const handleView = (role) => {
    if (role === 'Deputy Director') {
      setShowSubmissionModal(true);
    }
  };

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
    setSubmissionError(null);
  };

  const handlePriorityChange = (e) => {
    setPrioritydd(e.target.value);
    setSubmissionError(null);
  };

  const handleCommentsChange = (e) => {
    setCommentsdd(e.target.value);
    setSubmissionError(null);
  };

  const handleSubmission = async () => {
    setSubmissionError(null);

    if (!decision) {
      setSubmissionError('Please select a decision (Accept or Reject)');
      return;
    }
    if (!prioritydd) {
      setSubmissionError('Please select a priority (High, Medium, or Low)');
      return;
    }
    if (!commentsdd.trim()) {
      setSubmissionError('Please provide non-empty comments');
      return;
    }

    const payload = {
      requestId,
      status:
        decision === 'accept' ? 'Accepted' :
        decision === 'reject' ? 'Rejected' :
        decision === 'deputy_reject' ? 'Deputy_Rejected' : null,
      prioritydd,
      commentsdd: commentsdd.trim(),
    };
    console.log('Submitting decision:', payload);

    try {
      const response = await fetch('/api/decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Server error response:', errorData);
        throw new Error(`${errorData.error || 'Failed to save decision'}`);
      }

      const result = await response.json();
      console.log('Decision submission successful:', result);
      setShowSentModal(true);
      setTimeout(() => {
        setShowSentModal(false);
        setRequest((prev) => ({
          ...prev,
          status:
  decision === 'accept' ? 'Accepted' :
  decision === 'reject' ? 'Rejected' :
  decision === 'deputy_reject' ? 'Deputy_Rejected' : null,
        }));
      }, 3000);
      setDecision(null);
      setPrioritydd('');
      setCommentsdd('');
    } catch (err) {
      console.error('Submission error:', err.message);
      setSubmissionError(`Failed to submit decision: ${err.message}`);
    }
  };

  const handleDownload = () => {
    if (!request?.file?.filename) return;

    const link = document.createElement('a');
    link.href = `/documents/${request.file.filename}`;
    link.download = request.file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (file) {
      console.log(`Uploaded file: ${file.name}`);
      setIsSubmittingModal(false);
    }
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-4">
        <div className="bg-white p-4 rounded shadow">{error}</div>
      </div>
    );

  if (!request)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 p-4">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-4 text-sm bg-gray-50">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">Request Summary</h1>

      {showSentModal && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
          Decision Submitted!
        </div>
      )}

      {submissionError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{submissionError}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2 text-gray-700">Company Information</h2>
          <p className="text-gray-600"><FaIdCard className="inline mr-2 text-yellow-500" /> <strong>Name:</strong> {request.companyName}</p>
          <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-2 text-red-400" /> <strong>Address:</strong> 123 Mashel Abed, Addis Ababa</p>
          <p className="text-gray-600"><FaPhone className="inline mr-2 text-green-400" /> <strong>Phone:</strong> +251-965-686-679</p>
          <p className="text-gray-600"><FaEnvelope className="inline mr-2 text-blue-400" /> <strong>Email:</strong> <a href="mailto:barawsfa20@gmail.com" className="text-blue-500 hover:underline">barawsfa20@gmail.com</a></p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2 text-gray-700">Request Details</h2>
          <p className="text-gray-600"><FaIdCard className="inline mr-2 text-yellow-400" /> <strong>ID:</strong> {request.requestId}</p>
          <p className="text-gray-600"><FaCalendarAlt className="inline mr-2 text-blue-400" /> <strong>Date:</strong> {request.date}</p>
          <p className="text-gray-600"><FaFileAlt className="inline mr-2 text-gray-500" /> <strong>Type:</strong> <span className="text-purple-500">{request.type}</span></p>
          <p className="text-gray-600"><FaFileAlt className="inline mr-2 text-gray-500" /> <strong>Status:</strong> <span className="text-purple-500">{request.status}</span></p>
          {request.prioritydd && (
            <p className="text-gray-600"><FaFileAlt className="inline mr-2 text-gray-500" /> <strong>Priority:</strong> <span className="text-purple-500">{request.prioritydd}</span></p>
          )}
          {request.commentsdd && (
            <p className="text-gray-600"><FaFileAlt className="inline mr-2 text-gray-500" /> <strong>Comments:</strong> <span className="text-purple-500">{request.commentsdd}</span></p>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-medium mb-3 text-gray-700">Request Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {request.services.map((service, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-gray-600 mb-1">{service.mainTitle}</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {service.items.map((item, i) => (
                  <li key={i}><strong>{item.name}</strong> - {item.cost}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2 text-gray-700">Request Letter</h2>
          <div className="flex items-center justify-between border p-3 rounded mb-4">
            <span className="text-gray-600">{request.file?.filename || 'No file available'}</span>
            <FaDownload className="text-blue-400 cursor-pointer" onClick={handleDownload} />
          </div>

          <h3 className="text-lg font-medium mb-2 text-gray-700">Approval Status</h3>
          <div className="space-y-2">
            {approvalStatus.map((status, i) => (
              <div key={i} className="flex justify-between items-center bg-purple-50 p-2 rounded">
                <span className="text-gray-600">{status.role}</span>
                <FaEye className="text-blue-400 cursor-pointer" onClick={() => handleView(status.role)} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2 text-gray-700">Decision on Request</h2>
          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Decision</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="accept"
                  name="decision"
                  checked={decision === 'accept'}
                  onChange={handleDecisionChange}
                /> Accept
              </label>
              <label>
                <input
                  type="radio"
                  value="deputy_reject"
                  name="decision"
                  checked={decision === 'deputy_reject'}
                  onChange={handleDecisionChange}
                /> Deputy Reject
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Decision Priority</label>
            <div className="flex gap-4">
              {['high', 'medium', 'low'].map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    name="prioritydd"
                    value={level}
                    checked={prioritydd === level}
                    onChange={handlePriorityChange}
                  /> {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Deputy Decision Comments</label>
            <textarea
              placeholder="Add decision comments (required)..."
              rows={3}
              value={commentsdd}
              onChange={handleCommentsChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setDecision(null);
                setPrioritydd('');
                setCommentsdd('');
                setSubmissionError(null);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSubmission}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showSubmissionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Director Approval Comment</h3>
            <p className="text-gray-600 mb-4">{approvalComment}</p>
            <div className="text-right">
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isSubmittingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[400px] h-[200px]">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Upload Report</h2>
            <div
              className="border-2 p-2 border-gray-300 mb-4 flex text-center justify-center text-gray-500"
              onClick={() => document.getElementById('file-input').click()}
            >
              <input type="file" id="file-input" onChange={handleFileChange} className="hidden" />
              {file ? <span>{file.name}</span> : <span>Click to Upload</span>}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={() => setIsSubmittingModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverview;