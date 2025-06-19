"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaFileAlt } from "react-icons/fa";
import { format } from "date-fns";

const View = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        console.log("📤 Fetching requests from", `${apiUrl}/api/requests`);

        // Fetch requests
        const response = await fetch(`${apiUrl}/api/requests`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("❌ Raw response:", text.slice(0, 200));
          throw new Error(`Failed to fetch requests: ${response.status} ${text}`);
        }

        const requestData = await response.json();
        console.log("📥 Received requests:", requestData);

        // Fetch decisions and filter for Accepted/Deputy_Rejected and Assurance/Both
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
                  ["Accepted", "Deputy_Rejected"].includes(decision.status) &&
                  ["Assurance", "Both"].includes(decision.priority)
                ) {
                  return {
                    requestId: req.requestId,
                    companyName: req.companyName || "Anonymous",
                    date: req.date,
                    type: req.type,
                    status: decision.status, // Use Decision.status
                    services: req.services,
                    priority: decision.priority,
                  };
                }
              }
              return null;
            } catch (err) {
              console.error(`❌ Error fetching decision for ${req.requestId}:`, err.message);
              return null;
            }
          })
        );

        // Remove null entries
        const validRequests = filteredRequests.filter((req) => req !== null);
        setRequests(validRequests);

        if (validRequests.length === 0) {
          console.log("📭 No requests match the criteria, checking localStorage");
          const stored = JSON.parse(localStorage.getItem("requests") || "[]");
          if (stored.length > 0) {
            setRequests(stored.filter(
              (req) =>
                ["Accepted", "Deputy_Rejected"].includes(req.status) &&
                ["Assurance", "Both"].includes(req.priority)
            ));
          } else {
            setRequests([
              {
                requestId: "REG/978364",
                companyName: "Adama Science and Technology University",
                date: new Date("2020-12-12"),
                type: "Project",
                status: "Accepted",
                services: [{ items: [{}] }],
                priority: "Assurance",
              },
              {
                requestId: "REG/978370",
                companyName: "Innovation Academy",
                date: new Date("2021-05-05"),
                type: "Project",
                status: "Deputy_Rejected",
                services: [{ items: [{}] }],
                priority: "Both",
              },
            ]);
          }
        }
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
        setError(err.message);

        const stored = JSON.parse(localStorage.getItem("requests") || "[]");
        if (stored.length > 0) {
          setRequests(stored.filter(
            (req) =>
              ["Accepted", "Deputy_Rejected"].includes(req.status) &&
              ["Assurance", "Both"].includes(req.priority)
          ));
        } else {
          setRequests([
            {
              requestId: "REG/978364",
              companyName: "Adama Science and Technology University",
              date: new Date("2020-12-12"),
              type: "Project",
              status: "Accepted",
              services: [{ items: [{}] }],
              priority: "Assurance",
            },
            {
              requestId: "REG/978370",
              companyName: "Innovation Academy",
              date: new Date("2021-05-05"),
              type: "Project",
              status: "Deputy_Rejected",
              services: [{ items: [{}] }],
              priority: "Both",
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem("requests", JSON.stringify(requests));
    }
  }, [requests]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    setRequests((prev) =>
      [...prev].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === "newest" ? dateB - dateA : dateA - dateB;
      })
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewMore = (id) => {
    router.push(`../Deputy_Directors/Requested?id=${encodeURIComponent(id)}`);
  };

  const filteredRequests = requests.filter((request) =>
    request.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-6 bg-white h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Requests Status</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
            Loading requests...
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <div className="text-center py-4 text-gray-600">No requests found.</div>
        )}

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={handleSearchChange}
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
                <th className="py-3 px-6 text-center">Request Type</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Priority</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredRequests.map((request) => (
                <tr
                  key={request.requestId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left font-semibold">{request.requestId}</td>
                  <td className="py-3 px-6 text-left font-bold">{request.companyName}</td>
                  <td className="py-3 px-6 text-left font-semibold">
                    <FaCalendarAlt className="inline-block mr-1 text-primary" />
                    {request.date ? format(new Date(request.date), "dd MMM, yyyy") : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left font-semibold">
                    {request.type === "Project" ? (
                      <FaFileAlt className="inline-block mr-1 text-green-500" />
                    ) : (
                      <FaEye className="inline-block mr-1 text-orange-500" />
                    )}
                    {request.type}
                  </td>
                  <td className="py-3 px-6 text-left font-semibold">
                    <span
                      className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                        request.status === "Accepted"
                          ? "bg-green-600"
                          : request.status === "Deputy_Rejected"
                          ? "bg-red-600"
                          : "bg-gray-400"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left font-semibold">
                    <span
                      className={`inline-block w-20 text-center py-1 text-white text-xs font-semibold rounded-full shadow ${
                        request.priority === "Assurance" ? "bg-green-500" : "bg-purple-500"
                      }`}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="bg-blue-500 text-white py-1.5 px-3 text-xs rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
                      onClick={() => handleViewMore(request.requestId)}
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