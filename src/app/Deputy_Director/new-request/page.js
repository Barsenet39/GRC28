"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaTools, FaSearch, FaSort } from "react-icons/fa";
import { format } from "date-fns";

const View = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fallbackRequests = [
    {
      id: "REG/978364",
      companyName: "Adama Science and Technology University",
      date: new Date("2020-12-12"),
      numberOfServices: 1,
      type: "Project",
      status: "Accepted",
      priority: "Assurance",
    },
    {
      id: "REG/978370",
      companyName: "Innovation Academy",
      date: new Date("2021-05-05"),
      numberOfServices: 2,
      type: "Project",
      status: "Accepted",
      priority: "Both",
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        console.log("Fetching from:", `${apiUrl}/api/requests`);

        // Fetch requests
        const response = await fetch(`${apiUrl}/api/requests`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch requests: ${response.status} ${text.slice(0, 200)}`);
        }

        const requestData = await response.json();

        // Fetch decisions and filter for Accepted and Assurance/Both
        const filteredRequests = await Promise.all(
          requestData.map(async (req) => {
            try {
              const decisionResponse = await fetch(
                `${apiUrl}/api/decisions/${encodeURIComponent(req.requestId)}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (decisionResponse.ok) {
                const decision = await decisionResponse.json();
                if (
                  decision.status === "Accepted" &&
                  ["Assurance", "Both"].includes(decision.priority)
                ) {
                  return {
                    id: req.requestId,
                    companyName: req.companyName || "Anonymous",
                    date: req.date,
                    numberOfServices: req.services
                      ? req.services.reduce((sum, s) => sum + (s.items?.length || 0), 0)
                      : 0,
                    type: req.type,
                    status: req.status,
                    priority: decision.priority,
                  };
                }
              }
              return null;
            } catch (err) {
              console.error(`Error fetching decision for ${req.requestId}:`, err.message);
              return null;
            }
          })
        );

        // Remove null entries
        setRequests(filteredRequests.filter((req) => req !== null));
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
        setRequests(fallbackRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleViewMore = (requestId) => {
    router.push(`../Deputy_Director/view-request?id=${encodeURIComponent(requestId)}`);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getColorClass = (type) => {
    return type === "Project" ? "text-orange-500" : "text-green-500";
  };

  const filteredRequests = useMemo(() => {
    let filtered = requests.filter((r) =>
      r.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [requests, searchTerm, sortOrder]);

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 text-sm">
        <div className="container mx-auto p-4 bg-blue-100 text-blue-700 rounded-md">
          Loading requests...
        </div>
      </div>
    );
  }

  if (error && !requests.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 text-sm">
        <div className="container mx-auto p-4 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-sm">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg flex flex-col">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-700 text-center">
          Accepted Requests from Director General
        </h1>

        <div className="flex justify-end items-center space-x-4 mb-6">
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

        {filteredRequests.length === 0 && (
          <div className="text-center py-4 text-gray-600">No requests found.</div>
        )}

        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Request ID</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Request Date</th>
                <th className="py-3 px-6 text-center"># Services</th>
                <th className="py-3 px-6 text-left">Request Type</th>
                <th className="py-3 px-6 text-left">Priority</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {paginatedRequests.map((request, index) => {
                const Icon = request.type === "Project" ? FaEye : FaTools;
                const colorClass = getColorClass(request.type);

                return (
                  <tr
                    key={request.id}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-6 font-semibold">{request.id}</td>
                    <td className="py-3 px-6 font-medium">{request.companyName}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-400" />
                        {format(new Date(request.date), "MMM dd, yyyy")}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">{request.numberOfServices}</td>
                    <td className="py-3 px-6">
                      <div className={`flex items-center ${colorClass}`}>
                        <Icon className="mr-1" />
                        <span>{request.type}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 font-semibold">
                      <span
                        className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                          request.priority === "Assurance" ? "bg-green-500" : "bg-purple-500"
                        }`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleViewMore(request.id)}
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

          <div className="flex justify-center mt-6 space-x-2 text-xs">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
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