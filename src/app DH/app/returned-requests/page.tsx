"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import React from "react"; // Ensure React is imported for JSX

export default function ReturnedRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data to match the image
  const mockRequests = [
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Project",
      phase: "Pending Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Technical Review",
      phase: "Pending Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Project",
      phase: "Pending Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Project",
      phase: "Revision for Feedback",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Project",
      phase: "Returned for Revision",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Technical Review",
      phase: "Revision Feedback",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Technical Review",
      phase: "Resubmitted",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestType: "Project",
      phase: "Approved",
    },
  ];

  // Fetch data from API (to be used later)
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from http://localhost:3000/api/requests...");
        const response = await fetch("http://localhost:3000/api/requests", { cache: "no-store" });
        console.log("Response status:", response.status);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        // setRequests(data.requests); // Uncomment to use real data
        setRequests(mockRequests); // Using mock data for now
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data");
        setRequests(mockRequests); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-black">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar newRequestCount={mockRequests.length} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Returned Requests Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-black">Returned Requests</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Company Name, Types of Service, Priority"
                className="border rounded px-2 py-1"
              />
              <button className="text-gray-500">🔍</button>
            </div>
            <div>
              <label className="mr-2 text-black">Sort by:</label>
              <select className="border rounded px-2 py-1">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white border-b">
                  <th className="p-2 text-black text-left">
                    Request ID <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Company Name <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Request Type <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Phase <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Action <span>▼</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-black">{request.id}</td>
                    <td className="p-2 text-black">{request.companyName}</td>
                    <td className="p-2 flex items-center text-black">
                      <span
                        className={`mr-2 w-4 h-4 rounded-full ${
                          request.requestType === "Project" ? "bg-pink-500" : "bg-green-500"
                        }`}
                      ></span>
                      {request.requestType}
                    </td>
                    <td className="p-2 text-black">{request.phase}</td>
                    <td className="p-2">
                      <Link href="/request-overview-static">
                        <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
                          View More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              &lt;
            </button>
            <button className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white">
              1
            </button>
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              2
            </button>
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              3
            </button>
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              4
            </button>
            <span className="mx-1 px-3 py-1 text-black">...</span>
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              40
            </button>
            <button className="mx-1 px-3 py-1 border rounded text-black hover:bg-gray-200">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}