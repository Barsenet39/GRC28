"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaFileAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const View = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        console.log('Fetching from:', `${apiUrl}/api/requests`);

        // Fetch requests
        const response = await fetch(`${apiUrl}/api/requests`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch requests: ${response.status} ${text.slice(0, 200)}`);
        }

        const requestData = await response.json();

        // Fetch decisions for each request
        const requestsWithDecisions = await Promise.all(
          requestData.map(async (request) => {
            try {
              const decisionResponse = await fetch(
                `${apiUrl}/api/decisions/${encodeURIComponent(request.requestId)}`,
                {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
                }
              );

              if (decisionResponse.ok) {
                const decision = await decisionResponse.json();
                return { ...request, priority: decision.priority || 'N/A' };
              } else {
                return { ...request, priority: 'N/A' };
              }
            } catch (err) {
              console.error(`Error fetching decision for ${request.requestId}:`, err.message);
              return { ...request, priority: 'N/A' };
            }
          })
        );

        setRequests(requestsWithDecisions);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);

        // Fallback to localStorage or default data
        const stored = JSON.parse(localStorage.getItem("requests") || "[]");
        if (stored.length > 0) {
          setRequests(stored.map((req) => ({ ...req, priority: 'N/A' })));
        } else {
          setRequests([
            {
              requestId: 'REG/978364',
              companyName: 'Adama Science and Technology University',
              date: new Date('2020-12-12'),
              type: 'Project',
              status: 'Requested',
              services: [{ items: [{}] }],
              priority: 'N/A',
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem("requests", JSON.stringify(requests));
    }
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleViewMore = (id) => {
    router.push(`../DirectorGeneral/Requested?id=${encodeURIComponent(id)}`);
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

        {loading && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
            Loading requests...
          </div>
        )}

        {!loading && requests.filter((request) => (
          request.requestId.toLowerCase().includes(searchQuery) ||
          request.companyName.toLowerCase().includes(searchQuery)
        )).length === 0 && (
          <div className="text-center py-4 text-gray-600">No requests found.</div>
        )}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Request ID or Company Name..."
            value={searchQuery}
            onChange={handleSearch}
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
                <th className="py-3 px-6 text-center">Request Type</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Priority</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests
                .filter((request) => (
                  request.requestId.toLowerCase().includes(searchQuery) ||
                  request.companyName.toLowerCase().includes(searchQuery)
                ))
                .map((request) => (
                  <tr key={request.requestId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left font-semibold">{request.requestId}</td>
                    <td className="py-3 px-6 text-left font-bold">{request.companyName}</td>
                    <td className="py-3 px-6 text-left font-semibold">
                      <FaCalendarAlt className="inline-block mr-1 text-primary" />
                      {format(new Date(request.date), 'MMM dd, yyyy')}
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
                      <span
                        className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                          request.status === 'Requested'
                            ? 'bg-blue-600'
                            : request.status === 'Accepted'
                            ? 'bg-green-600'
                            : request.status === 'Rejected'
                            ? 'bg-red-600'
                            : request.status === 'Deputy_Rejected'
                            ? 'bg-red-600'
                            : 'bg-gray-400'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left font-semibold">
                      <span
                        className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                          request.priority === 'N/A'
                            ? 'bg-gray-400'
                            : request.priority === 'Assurance'
                            ? 'bg-green-500'
                            : request.priority === 'BDPD'
                            ? 'bg-blue-500'
                            : 'bg-purple-500'
                        }`}
                      >
                        {request.priority}
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