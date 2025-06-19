'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(data);
      setLoading(false); // ✅ fix here
    } catch (error) {
      console.error(error);
      setError('Failed to fetch requests');
      setLoading(false); // ✅ also fix here
    }
  };

  fetchRequests();
}, []);


  const handleViewMore = (req) => {
    if (req.status === 'Requested') {
      router.push(`/Customer/Requested?id=${req.requestId}`);
    } 
    // Extend here for other statuses
    else if (req.status === 'Accepted') {
      router.push(`/Customer/Accepted?id=${req.requestId}`);
    }
  };

  if (loading) return <div className="p-6">Loading requests...</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.requestId} className="border-t text-sm text-gray-800">
                  <td className="px-4 py-3">{req.requestId}</td>
                  <td className="px-4 py-3">
                    {req.date ? new Date(req.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3">{req.companyName || 'N/A'}</td>
                  <td className="px-4 py-3">{req.type || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Requested'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.status === 'Accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {req.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewMore(req)}
                      className="bg-blue-600 text-white px-4 py-2 text-xs rounded hover:bg-blue-700"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;
