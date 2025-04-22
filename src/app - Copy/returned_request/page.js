"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const requests = [
    { id: "REQ/45343/48", company: "Adama Science and Technology University", service: "Strategic Assessment" },
    { id: "REQ/45343/49", company: "Adama Science and Technology University", service: "Strategic Level Risk" },
    { id: "REQ/45343/50", company: "Adama Science and Technology University", service: "Strategic Assessment" },
    // Add more sample data as needed
  ];

  const filteredRequests = requests.filter((request) =>
    request.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">View Requests Response</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by request service"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Request No</th>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Request Service</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{request.id}</td>
              <td className="py-2 px-4 border-b">{request.company}</td>
              <td className="py-2 px-4 border-b">{request.service}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">Showing 1 to {filteredRequests.length} of {requests.length} entries</span>
        <div className="flex space-x-2">
          <button className="border border-gray-300 rounded-md px-4 py-1">1</button>
          <button className="border border-gray-300 rounded-md px-4 py-1">2</button>
          <button className="border border-gray-300 rounded-md px-4 py-1">3</button>
          <button className="border border-gray-300 rounded-md px-4 py-1">Next</button>
        </div>
      </div>
    </div>
  );
};

export default View;