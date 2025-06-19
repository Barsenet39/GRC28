"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter();

  const initialRequests = [
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', type: 'Pending Review' },
    { id: 'REG/978365', companyName: 'Another University', type: 'Returned for Revision' },
    { id: 'REG/978366', companyName: 'Tech University', type: 'Pending Review' },
    { id: 'REG/978367', companyName: 'Global Institute of Technology', type: 'Returned for Revision' },
    { id: 'REG/978368', companyName: 'City College', type: 'Pending Review' },
    { id: 'REG/978369', companyName: 'National University', type: 'Returned for Revision' },
    { id: 'REG/978370', companyName: 'Innovation Academy', type: 'Pending Review' },
    { id: 'REG/978371', companyName: 'Future Tech University', type: 'Returned for Revision' },
    { id: 'REG/978372', companyName: 'E-Learning Institute', type: 'Pending Review' },
    { id: 'REG/978373', companyName: 'Digital College', type: 'Returned for Revision' },
    { id: 'REG/978374', companyName: 'Open Learning University', type: 'Resubmitted' },
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleViewMore = (phase) => {
    let redirectPath = "/";
  
    switch (phase) {
      case "Pending Review":
        redirectPath = "/pending";
        break;
      case "Returned for Revision":
        redirectPath = "/revision";
        break;
      case "Resubmitted":
        redirectPath = "/resubmitted";
        break;
      default:
        redirectPath = "/";
    }
  
    router.push(redirectPath);
  };
  
  const getPhaseColor = (type) => {
    switch (type) {
      case 'Pending Review':
        return 'bg-blue-100 text-blue-600';
      case 'Returned for Revision':
        return 'bg-yellow-100 text-yellow-600';
      case 'Resubmitted':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Requests Phase</h1>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
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
            <thead className="bg-gray-100">
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Request ID</th>
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Company Name</th>
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Phase</th>
                <th className="py-3 px-4 text-center whitespace-nowrap font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-4 text-left font-semibold">{request.id}</td>
                  <td className="py-3 px-4 text-left">{request.companyName}</td>
                  <td className="py-3 px-4 text-left">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPhaseColor(request.type)}`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200 whitespace-nowrap"
                      onClick={() => handleViewMore(request.type)}
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