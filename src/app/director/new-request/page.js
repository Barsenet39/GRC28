"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaTools } from 'react-icons/fa';
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

        // Fetch decisions and filter for Accepted and BDPD/Both
        const filteredRequests = await Promise.all(
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
                if (decision.status === 'Accepted' && ['BDPD', 'Both'].includes(decision.priority)) {
                  return {
                    ...request,
                    priority: decision.priority,
                    numberOfServices: request.services
                      ? request.services.reduce((sum, s) => sum + (s.items?.length || 0), 0)
                      : 0,
                  };
                }
              }
              return null;
            } catch (err) {
              console.error(`Error fetching decision for ${request.requestId}:`, err.message);
              return null;
            }
          })
        );

        // Remove null entries
        setRequests(filteredRequests.filter((req) => req !== null));
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);

        // Fallback to default data
        const defaultRequests = [
          {
            requestId: 'REG/978364',
            companyName: 'Adama Science and Technology University',
            date: new Date('2020-12-12'),
            type: 'Project',
            services: [{ items: [{}] }],
            priority: 'BDPD',
            numberOfServices: 1,
          },
          {
            requestId: 'REG/978370',
            companyName: 'Innovation Academy',
            date: new Date('2021-05-05'),
            type: 'Project',
            services: [{ items: [{}] }, { items: [{}] }],
            priority: 'Both',
            numberOfServices: 2,
          },
        ];
        setRequests(defaultRequests);
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
    router.push(`../director/view-request?id=${encodeURIComponent(id)}`);
  };

  const getIconColor = (type) => {
    return type === 'Project' ? 'text-orange-400' : 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Requests Status</h1>

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
            className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
          />
          <select
            className="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 text-xs"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left whitespace-nowrap">Request ID</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Company Name</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request Date</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Number of Services</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request Type</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Priority</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests
                .filter((request) => (
                  request.requestId.toLowerCase().includes(searchQuery) ||
                  request.companyName.toLowerCase().includes(searchQuery)
                ))
                .map((request, index) => (
                  <tr
                    key={request.requestId}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="py-3 px-6 text-left font-semibold">{request.requestId}</td>
                    <td className="py-3 px-6 text-left font-medium">{request.companyName}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <FaCalendarAlt className="inline-block mr-1 text-gray-400" />
                        {format(new Date(request.date), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">{request.numberOfServices}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <FaTools className={`inline-block mr-1 ${getIconColor(request.type)}`} />
                        <span>{request.type}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left font-semibold">
                      <span
                        className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                          request.priority === 'BDPD' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200 whitespace-nowrap"
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