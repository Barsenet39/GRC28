'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaTools } from 'react-icons/fa';

const View = () => {
  const router = useRouter();

  const initialRequests = [
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', type: 'Project', status: 'Pending review' },
    { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', type: 'Technical Support', status: 'Returned for review' },
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', type: 'Project', status: 'Pending review' },
    { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', type: 'Technical Support', status: 'Returned for review' },
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...requests].sort((a, b) => {
      return order === 'oldest'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setRequests(sorted);
  };

  const statusStyles = {
    "Pending review": "bg-yellow-100 text-yellow-700",
    "Returned for review": "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Requests Status</h1>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 text-xs"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs leading-normal">
              <tr>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request ID</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Company Name</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request Type</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Status</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests.map((request, index) => (
                <tr
                  key={request.id + index}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-3 px-6 text-left font-semibold whitespace-nowrap">{request.id}</td>
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">{request.companyName}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      {request.type === 'Project' ? (
                        <FaEye className="inline-block mr-1 text-orange-400" />
                      ) : (
                        <FaTools className="inline-block mr-1 text-green-400" />
                      )}
                      <span>{request.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[request.status]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200"
    onClick={() => {
      if (request.status === "Pending review") {
        router.push("/pending-review");
      } else if (request.status === "Returned for review") {
        router.push("/returned-for-review");
      }
    }}
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
