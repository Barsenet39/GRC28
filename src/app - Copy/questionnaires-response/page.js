"use client"; // Required for interactive client-side components

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

// Sample initial requests data
const initialRequests = [
  { id: 'COMP/001', fullName: 'Abebe Hailu', phone: '0912345678', email: 'abebe@gmail.com' },
  { id: 'COMP/002', fullName: 'Biniam Tesfaye', phone: '0918765432', email: 'biniam@gmail.com' },
  { id: 'COMP/003', fullName: 'Chala Bekele', phone: '0923456789', email: 'chala@gmail.com' },
  { id: 'COMP/004', fullName: 'Dawit Mesfin', phone: '0934567890', email: 'dawit@gmail.com' },
  { id: 'COMP/005', fullName: 'Eyerusalem Fikru', phone: '0945678901', email: 'eyerusalem@gmail.com' },
  { id: 'COMP/006', fullName: 'Fikadu Alemu', phone: '0956789012', email: 'fikadu@gmail.com' },
  { id: 'COMP/007', fullName: 'Genet Abera', phone: '0967890123', email: 'genet@gmail.com' },
  { id: 'COMP/008', fullName: 'Habtamu Tadesse', phone: '0978901234', email: 'habtamu@gmail.com' },
  { id: 'COMP/009', fullName: 'Idiris Mohammed', phone: '0989012345', email: 'idiris@gmail.com' },
  { id: 'COMP/010', fullName: 'Kalkidan Tesema', phone: '0990123456', email: 'kalkidan@gmail.com' },
];


const View = () => {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);

  const handleViewMore = (id) => {
    router.push(`/view-request/${id}`); // Redirect to the view-request page with ID
  };

  return (
    <div className="container mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">View Requests Response</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Company ID</th>
              <th className="py-3 px-6 text-center">Full Name</th>
              <th className="py-3 px-6 text-center">Phone</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{request.id}</td>
                <td className="py-3 px-6 text-left font-bold">{request.fullName}</td>
                <td className="py-3 px-6 text-left">{request.phone}</td>
                <td className="py-3 px-6 text-left">{request.email}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                    onClick={() => handleViewMore(request.id)} // Pass the ID to the handler
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

export default View;