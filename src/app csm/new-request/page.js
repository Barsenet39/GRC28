"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt, FaEye, FaFileAlt } from 'react-icons/fa'; // Updated icons

const View = () => {
  const router = useRouter();

 const initialRequests = [
  { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', type: 'Project' },
  { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', type: 'Review' },
  { id: 'REG/978366', companyName: 'Tech University', date: '2021-01-20', type: 'Project' },
  { id: 'REG/978367', companyName: 'Global Institute of Technology', date: '2021-02-25', type: 'Review' },
  { id: 'REG/978368', companyName: 'City College', date: '2021-03-10', type: 'Project' },
  { id: 'REG/978369', companyName: 'National University', date: '2021-04-15', type: 'Review' },
  { id: 'REG/978370', companyName: 'Innovation Academy', date: '2021-05-05', type: 'Project' },
  { id: 'REG/978371', companyName: 'Future Tech University', date: '2021-06-18', type: 'Review' },
  { id: 'REG/978372', companyName: 'E-Learning Institute', date: '2021-07-22', type: 'Project' },
  { id: 'REG/978373', companyName: 'Digital College', date: '2021-08-30', type: 'Review' },
];


  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleViewMore = () => {
    router.push('/view-request');
  };

  const getIconColor = (type) => {
    return type === 'Project' ? 'text-orange-400' : 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Requests Status</h1>

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
            <thead className="bg-gray-50">
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left whitespace-nowrap">Request ID</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Company Name</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request Date</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">Request Type</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {requests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-3 px-6 text-left font-semibold">{request.id}</td>
                  <td className="py-3 px-6 text-left font-medium">{request.companyName}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FaCalendarAlt className="inline-block mr-1 text-gray-400" />
                      <span>{request.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      {request.type === 'Project' ? (
                        <>
                          <FaEye className={`inline-block mr-1 ${getIconColor(request.type)}`} />
                          <span>{request.type}</span>
                        </>
                      ) : (
                        <>
                          <FaFileAlt className={`inline-block mr-1 ${getIconColor(request.type)}`} />
                          <span>{request.type}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200 whitespace-nowrap"
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
 