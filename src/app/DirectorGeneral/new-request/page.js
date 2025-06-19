"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaFileAlt } from 'react-icons/fa';

const View = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log('📤 Fetching requests from /api/requests');
        let response = await fetch('/api/requests', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          console.log('📥 Proxy failed, trying direct URL');
          response = await fetch('http://localhost:5000/api/requests', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!response.ok) {
          const text = await response.text();
          console.error('❌ Raw response:', text.slice(0, 200));
          throw new Error(`Failed to fetch requests: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log('📥 Received requests:', data);
        setRequests(data);
      } catch (err) {
        console.error('❌ Fetch error:', err.message);
        setError(err.message);

        // Fallback to localStorage or initial data
        const stored = JSON.parse(localStorage.getItem("requests") || "[]");
        if (stored.length > 0) {
          setRequests(stored);
        } else {
          setRequests([
            { requestId: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', type: 'Project', status: 'Requested', services: [{ items: [{}] }] },
          ]);
        }
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    setRequests((prev) =>
      [...prev].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === "newest" ? dateB - dateA : dateA - dateB;
      })
    );
  };

  const handleViewMore = (id) => {
    router.push(`../DirectorGeneral/view-request?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-6 bg-white h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Requests Status</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="border border-gray-300 rounded-full p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        <div className="overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Request ID</th>
                <th className="py-3 px-6 text-center">Company Name</th>
                <th className="py-3 px-6 text-center">Request Date</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Number of Services</th>
                <th className="py-3 px-6 text-center">Request Type</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests
                .filter((request) => request.status === 'Requested') // Filter for "Requested" status
                .map((request) => (
                  <tr key={request.requestId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left font-semibold">{request.requestId}</td>
                    <td className="py-3 px-6 text-left font-bold">{request.companyName}</td>
                    <td className="py-3 px-6 text-left font-semibold">
                      <FaCalendarAlt className="inline-block mr-1 text-primary" />
                      {request.date}
                    </td>
                    <td className="py-3 px-6 text-center font-semibold">
                      {request.services ? request.services.reduce((sum, s) => sum + (s.items?.length || 0), 0) : 0}
                    </td>
                    <td className="py-3 px-6 text-left font-semibold">
                      {request.type === 'Project' ? (
                        <FaFileAlt className="inline-block mr-1 text-green-500" />
                      ) : (
                        <FaEye className="inline-block mr-1 text-orange-500" />
                      )}
                      {request.type}
                    </td>
                    <td className="py-3 px-6 text-left font-semibold">
                      <span className="inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow bg-blue-600">
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <button
                        className="bg-blue-500 text-white py-1.5 px-3 text-xs rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
                        onClick={() => handleViewMore(request.requestId)}
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;