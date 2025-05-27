"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { FaCalendarAlt, FaEye, FaTools } from 'react-icons/fa';
import { FaSearch, FaSort } from 'react-icons/fa';


const View = () => {
  const router = useRouter();

  const initialRequests = [
    { id: 'REG/978364', companyName: 'Adama Science and Technology University', date: '2020-12-12', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978365', companyName: 'Another University', date: '2020-12-15', numberOfServices: 2, types: 'Technical Support' },
    { id: 'REG/978366', companyName: 'Tech University', date: '2021-01-20', numberOfServices: 3, type: 'Project' },
    { id: 'REG/978367', companyName: 'Global Institute of Technology', date: '2021-02-25', numberOfServices: 4, types: 'Technical Support' },
    { id: 'REG/978368', companyName: 'City College', date: '2021-03-10', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978369', companyName: 'National University', date: '2021-04-15', numberOfServices: 2, type: 'Technical Support' },
    { id: 'REG/978370', companyName: 'Innovation Academy', date: '2021-05-05', numberOfServices: 3, type: 'Project' },
    { id: 'REG/978371', companyName: 'Future Tech University', date: '2021-06-18', numberOfServices: 4, type: 'Technical Support' },
    { id: 'REG/978372', companyName: 'E-Learning Institute', date: '2021-07-22', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978373', companyName: 'Digital College', date: '2021-08-30', numberOfServices: 2, type: 'Technical Support' },
     { id: 'REG/978369', companyName: 'National University', date: '2021-04-15', numberOfServices: 2, type: 'Technical Support' },
    { id: 'REG/978370', companyName: 'Innovation Academy', date: '2021-05-05', numberOfServices: 3, type: 'Project' },
    { id: 'REG/978371', companyName: 'Future Tech University', date: '2021-06-18', numberOfServices: 4, type: 'Technical Support' },
    { id: 'REG/978372', companyName: 'E-Learning Institute', date: '2021-07-22', numberOfServices: 1, type: 'Project' },
    { id: 'REG/978373', companyName: 'Digital College', date: '2021-08-30', numberOfServices: 2, type: 'Technical Support' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleViewMore = () => router.push('/view-request');
  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getColorClass = (type) => {
    return type === 'Project' ? 'text-orange-500' : 'text-green-500';
  };

  const filteredRequests = useMemo(() => {
    let filtered = initialRequests.filter(r =>
      r.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchTerm, sortOrder]);

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
<h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-700 text-center">
  New Requests from Director General
</h1>



<div className="flex justify-end items-center space-x-4 mb-6">
  {/* Search input with icon */}
  <div className="relative w-64">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
    <input
      type="text"
      placeholder="Search by company name..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="pl-8 pr-2 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs"
    />
  </div>

  {/* Sort dropdown with icon */}
  <div className="relative">
    <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
    <select
      className="pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 text-xs"
      value={sortOrder}
      onChange={handleSortChange}
    >
      <option value="newest">Sort by: Newest</option>
      <option value="oldest">Sort by: Oldest</option>
    </select>
  </div>
</div>


        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Request ID</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Request Date</th>
                <th className="py-3 px-6 text-center"># Services</th>
                <th className="py-3 px-6 text-left">Request Type</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {paginatedRequests.map((request, index) => {
                const type = request.type || request.types;
                const Icon = type === 'Project' ? FaEye : FaTools;
                const colorClass = getColorClass(type);

                return (
                  <tr
                    key={request.id}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`} >
                    <td className="py-3 px-6 font-semibold">{request.id}</td>
                    <td className="py-3 px-6 font-medium">{request.companyName}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-400" />
                        {request.date}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">{request.numberOfServices}</td>
                    <td className="py-3 px-6">
                      <div className={`flex items-center ${colorClass}`}>
                        <Icon className="mr-1" />
                        <span>{type}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={handleViewMore}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition duration-200"
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Modern Pagination */}
          <div className="flex justify-center mt-6 space-x-2 text-xs">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
