"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Optional: For navigation in Next.js

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/requests', {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch user requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-blue-100 text-gray-800">
          <tr>
            <th className="py-3 px-6 text-left">Request ID</th>
            <th className="py-3 px-6 text-left">Organization Name</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr
              key={req._id || idx}
              className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="py-3 px-6 text-gray-800 whitespace-nowrap">{req.requestId}</td>
              <td className="py-3 px-6 text-gray-800  whitespace-nowrap">{req.organizationName || "N/A"}</td>
              <td className="py-3 px-6 text-gray-800 whitespace-nowrap">{req.date}</td>
              <td className="py-3 px-6 text-gray-800 whitespace-nowrap">{req.type}</td>
              <td className="py-3 px-6 text-gray-800 whitespace-nowrap">{req.status}</td>
              <td className="py-3 px-6 text-gray-800 whitespace-nowrap">
                <Link
  href={`/Customer/Requested?id=${req.requestId}`}
  className="text-blue-600 underline hover:text-blue-800"
>
  View More
</Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
