'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaDownload, FaEye, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const View = () => {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id');
  const requestId = decodeURIComponent(rawId || '');

  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRequests = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const foundRequest = data.find((req) => req.requestId === requestId);
        if (foundRequest) {
          setRequestDetails(foundRequest);
        } else {
          setError('Request not found.');
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch requests.');
        setLoading(false);
      }
    };

    if (requestId) {
      fetchRequests();
    } else {
      setError('Invalid request ID.');
      setLoading(false);
    }
  }, [requestId]);

  const handleDownload = (fileName) => {
    alert(`Downloading: ${fileName}`);
    // Example real usage:
    // window.open(`/uploads/${fileName}`, '_blank');
  };

  const handleView = (fileName) => {
    window.open(`/uploads/${fileName}`, '_blank');
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading request details...</div>;
  }

  if (error || !requestDetails) {
    return <div className="p-10 text-center text-red-600">{error || 'Request details not available.'}</div>;
  }

  const services = requestDetails.type === 'Project' ? requestDetails.services || [] : [];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-6xl flex flex-wrap gap-6">

        {/* Left: Request Details */}
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-3xl font-semibold mb-4 text-black">Request Details</h1>

          <div className="mb-6 text-black">
            <div className="flex justify-between mb-4">
              <strong className="w-1/3">Request ID:</strong>
              <span className="w-2/3 text-left">{requestDetails.requestId}</span>
            </div>
            <div className="flex justify-between mb-4">
              <strong className="w-1/3">Request Date:</strong>
              <span className="w-2/3 text-left flex items-center">
                <FaCalendarAlt className="mr-1 text-primary" />
                {requestDetails.date ? new Date(requestDetails.date).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request Type:</strong>
              <span className="flex items-center w-2/3 text-left">
                <FaEye className="mr-1 text-orange-500" />
                {requestDetails.type}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request Status:</strong>
              <span className="w-2/3 text-left">{requestDetails.status}</span>
            </div>
          </div>

          {/* Request Documents */}
          <h2 className="text-lg font-semibold mt-6 text-black">Request Documents</h2>

          {requestDetails.files?.letterFile && (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
              <span className="text-black">{requestDetails.files.letterFile.filename}</span>
              <div className="flex items-center">
                <FaEye className="text-blue-600 cursor-pointer mr-2" onClick={() => handleView(requestDetails.files.letterFile.filename)} />
                <FaDownload className="text-blue-600 cursor-pointer" onClick={() => handleDownload(requestDetails.files.letterFile.filename)} />
              </div>
            </div>
          )}

          {requestDetails.files?.projectFile && (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mt-2">
              <span className="text-black">{requestDetails.files.projectFile.filename}</span>
              <div className="flex items-center">
                <FaEye className="text-blue-600 cursor-pointer mr-2" onClick={() => handleView(requestDetails.files.projectFile.filename)} />
                <FaDownload className="text-blue-600 cursor-pointer" onClick={() => handleDownload(requestDetails.files.projectFile.filename)} />
              </div>
            </div>
          )}
        </div>

        {/* Right: Services */}
        {requestDetails.type === 'Project' && (
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-3xl font-semibold mb-3 text-black">Request Services</h2>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
