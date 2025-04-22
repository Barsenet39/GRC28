// src/app/new-request/page.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

// Define initial requests here
const initialRequests = [
  {
    id: 'REG/978364',
    companyName: 'Adama Science and Technology University',
    date: '2020-12-12',
    service: 'Cybersecurity Audit',
    priority: 'Operational level',
    status: 'Urgent',
  },
  {
    id: 'REG/978365',
    companyName: 'Another University',
    date: '2020-12-15',
    service: 'Risk Assessment',
    priority: 'Strategic level',
    status: 'Standard',
  },
  {
    id: 'REG/978366',
    companyName: 'Tech University',
    date: '2021-01-20',
    service: 'Data Privacy Review',
    priority: 'Operational level',
    status: 'Urgent',
  },
  {
    id: 'REG/978367',
    companyName: 'Global Institute of Technology',
    date: '2021-02-25',
    service: 'IT Compliance Audit',
    priority: 'Tactical level',
    status: 'Standard',
  },
  {
    id: 'REG/978368',
    companyName: 'City College',
    date: '2021-03-10',
    service: 'Penetration Testing',
    priority: 'Strategic level',
    status: 'Urgent',
  },
  {
    id: 'REG/978369',
    companyName: 'National University',
    date: '2021-04-15',
    service: 'Vulnerability Assessment',
    priority: 'Operational level',
    status: 'Standard',
  },
  {
    id: 'REG/978370',
    companyName: 'Innovation Academy',
    date: '2021-05-05',
    service: 'Incident Response Plan',
    priority: 'Tactical level',
    status: 'Urgent',
  },
  {
    id: 'REG/978371',
    companyName: 'Future Tech University',
    date: '2021-06-18',
    service: 'Cyber Risk Assessment',
    priority: 'Strategic level',
    status: 'Standard',
  },
  {
    id: 'REG/978372',
    companyName: 'E-Learning Institute',
    date: '2021-07-22',
    service: 'Network Security Review',
    priority: 'Operational level',
    status: 'Urgent',
  },
  {
    id: 'REG/978373',
    companyName: 'Digital College',
    date: '2021-08-30',
    service: 'Cloud Security Assessment',
    priority: 'Tactical level',
    status: 'Standard',
  },
];

const NewRequests = () => {
  const router = useRouter(); // Initialize the router
  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);

    const sortedRequests = [...requests].sort((a, b) => {
      return value === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

    setRequests(sortedRequests);
  };

  const handleViewMore = () => {
    // Redirect to the view-request page without ID
    router.push('/view-request'); // Adjust the path if necessary
  };

  return (
    <div className="container mx-auto p-6 bg-white h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">New Requests</h1>
      <h2 className="text-lg mb-4 text-gray-800">Cyber Risk Management</h2>

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

      <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
    <thead>
      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-center">Request ID</th>
        <th className="py-3 px-6 text-center">Company Name</th>
        <th className="py-3 px-6 text-center">Request Date</th>
        <th className="py-3 px-6 text-center">Request Service</th>
        <th className="py-3 px-6 text-center">Priority</th>
        <th className="py-3 px-6 text-center">Action</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {requests.map((request) => (
        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left">{request.id}</td>
          <td className="py-3 px-6 text-left font-bold">{request.companyName}</td>
          <td className="py-3 px-6 text-left font-semibold">{request.date}</td>
          <td className="py-3 px-6 text-left font-semibold">{request.service}</td>
          <td className="py-3 px-6 text-left font-semibold">
            <span className={`inline-block px-2 py-1 text-white text-xs font-semibold rounded-full shadow ${request.status === 'Urgent' ? 'bg-red-600' : 'bg-green-600'}`}>
              {request.status}
            </span>
          </td>
          <td className="py-3 px-6 text-left">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
              onClick={handleViewMore} // Call the handler without ID
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
  );
};

export default NewRequests;