"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt, FaEye, FaFileAlt } from 'react-icons/fa'; // Importing icons

const View = () => {
  const router = useRouter();

  const initialRequests = [
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', numberOfServices: 2, type: 'Technical Support' },
    { id: 'REG/978366', companyName: 'Tech University', date: '2021-01-20', numberOfServices: 3, type: 'Project' },
    { id: 'REG/978367', companyName: 'Global Institute of Technology', date: '2021-02-25', numberOfServices: 4, type: 'Technical Support' },
    { id: 'REG/978368', companyName: 'City College', date: '2021-03-10', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978369', companyName: 'National University', date: '2021-04-15', numberOfServices: 2, type: 'Technical Support' },
    { id: 'REG/978370', companyName: 'Innovation Academy', date: '2021-05-05', numberOfServices: 3, type: 'Project' },
    { id: 'REG/978371', companyName: 'Future Tech University', date: '2021-06-18', numberOfServices: 4, type: 'Technical Support' },
    { id: 'REG/978372', companyName: 'E-Learning Institute', date: '2021-07-22', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978373', companyName: 'Digital College', date: '2021-08-30', numberOfServices: 2, type: 'Technical Support' },
  ];

  // Initialize state
  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to handle redirection to view-request page
  const handleViewMore = () => {
    router.push('/DirectorGeneral/view-request');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-6 bg-white h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Requests Status</h1>

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
                <th className="py-3 px-6 text-center">Number of Services</th>
                <th className="py-3 px-6 text-center">Request Type</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left font-semibold">{request.id}</td>
                  <td className="py-3 px-6 text-left font-bold">{request.companyName}</td>
                  <td className="py-3 px-6 text-left font-semibold">
                    <FaCalendarAlt className="inline-block mr-1 text-primary" />
                    {request.date}
                  </td>
                  <td className="py-3 px-6 text-center font-semibold">{request.numberOfServices}</td>
                  <td className="py-3 px-6 text-left font-semibold">
                    {request.type === 'view request' ? (
                      <FaFileAlt className="inline-block mr-1 text-green-500" />
                    ) : (
                      <FaEye className="inline-block mr-1 text-orange-500" />
                    )}
                    {request.type}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="bg-blue-500 text-white py-1.5 px-3 text-xs rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
                      onClick={handleViewMore}
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