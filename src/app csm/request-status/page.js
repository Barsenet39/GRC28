"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react"; // Import useMemo
import { FaCalendarAlt, FaEye, FaFileAlt, FaTools } from 'react-icons/fa'; // Importing icons

const View = () => {
  const router = useRouter();

  const initialRequests = [
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', phase: 'Pending Review', type: 'Project' },
    { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', phase: 'Approved', type: 'Technical Support' },
    { id: 'REG/978366', companyName: 'Tech University', date: '2021-01-20', phase: 'Pending Review', type: 'Project' },
    { id: 'REG/978367', companyName: 'Global Institute of Technology', date: '2021-02-25', phase: 'Approved', type: 'Technical Support' },
    { id: 'REG/978368', companyName: 'City College', date: '2021-03-10', phase: 'Approved', type: 'Project' },
    { id: 'REG/978369', companyName: 'National University', date: '2021-04-15', phase: 'Pending Review', type: 'Technical Support' },
    { id: 'REG/978370', companyName: 'Innovation Academy', date: '2021-05-05', phase: 'Approved', type: 'Project' },
    { id: 'REG/978371', companyName: 'Future Tech University', date: '2021-06-18', phase: 'Pending Review', type: 'Technical Support' },
    { id: 'REG/978372', companyName: 'E-Learning Institute', date: '2021-07-22', phase: 'Approved', type: 'Project' },
    { id: 'REG/978373', companyName: 'Digital College', date: '2021-08-30', phase: 'Pending Review', type: 'Technical Support' },
  ];

  // Initialize state
  const [requests, setRequests] = useState(initialRequests);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to handle redirection based on request phase
  const handleViewMore = (phase) => {
    let redirectPath = '';
    if (phase === 'Pending Review') {
      redirectPath = '/pending';
    } else if (phase === 'Approved') {
      redirectPath = '/approved';
    } else {
      redirectPath = '/'; // Or some default path
    }
    router.push(redirectPath); // Redirect to the appropriate page
  };

  const getStatusColor = (phase) => {
    switch (phase) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-500';
      case 'Approved':
        return 'bg-green-100 text-green-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  // Sort the requests based on phase
  const sortedRequests = useMemo(() => {
    const sorted = [...requests].sort((a, b) => {
      if (a.phase === 'Pending Review' && b.phase !== 'Pending Review') {
        return -1; // a comes before b
      }
      if (a.phase !== 'Pending Review' && b.phase === 'Pending Review') {
        return 1; // b comes before a
      }
      return 0; // No change in order
    });

    // Apply sorting by date within each phase group
    if (sortOrder === "newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest to oldest
    } else if (sortOrder === "oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort oldest to newest
    }

    return sorted;
  }, [requests, sortOrder]); // Add sortOrder as a dependency


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      {/* Lighter background */}
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
        {/* Added shadow and rounded corners */}
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Requests Status</h1>
        {/* Slightly adjusted header styles */}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
            /* Softer ring color */
          />
          <select
            className="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 text-xs"
            /* Softer ring color */
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            {/* Added overflow-hidden for rounded corners on the table */}
            <thead className="bg-gray-100">
              {/* Lighter header background */}
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Request ID</th>
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Company Name</th>
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Request Date</th>
                <th className="py-3 px-4 text-center whitespace-nowrap font-semibold">Phase</th>
                <th className="py-3 px-4 text-left whitespace-nowrap font-semibold">Request Type</th>
                <th className="py-3 px-4 text-center whitespace-nowrap font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {sortedRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition duration-200`}
                >
                  {/* Added transition for smoother hover */}
                  <td className="py-3 px-4 text-left font-semibold">{request.id}</td>
                  <td className="py-3 px-4 text-left">{request.companyName}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <FaCalendarAlt className="inline-block mr-1 text-gray-400" />
                      <span>{request.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block py-0.5 px-2 rounded-full font-semibold ${getStatusColor(request.phase)}`}>{request.phase}</span>
                  </td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      {request.type === 'Project' ? (
                        <FaEye className="inline-block mr-1 text-blue-400" />
                      ) : (
                        <FaTools className="inline-block mr-1 text-green-400" />
                      )}
                      <span>{request.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200 whitespace-nowrap"
                      onClick={() => handleViewMore(request.phase)}
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