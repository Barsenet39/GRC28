"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import React from "react"; // Ensure React is imported for JSX

// Define the shape of a request object (added id)
interface Request {
  id: string;
  companyName: string;
  requestDate: string;
  requestType: string;
  noOfService: number;
}

export default function NewRequestPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data to match the screenshot
  const mockRequests: Request[] = [
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 4,
      requestType: "Project",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 8,
      requestType: "Technical Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 2,
      requestType: "Technical Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 2,
      requestType: "Project",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 5,
      requestType: "Project",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 3,
      requestType: "Project",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 5,
      requestType: "Project",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 4,
      requestType: "Technical Review",
    },
    {
      id: "REQ/876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      noOfService: 2,
      requestType: "Technical Review",
    },
  ];

  // Fetch data from API (using mock data for now to match screenshot)
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
      } catch (error: any) {
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
    return <div className="p-6 text-black">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar newRequestCount={mockRequests.length} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* New Requests Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-black">New Requests Cyber Risk Management</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex items-center">
              <span className="absolute left-2 text-gray-500">🔍</span>
              <input
                type="text"
                placeholder="Company Name, Types of Service, Priority"
                className="border rounded px-8 py-1"
              />
            </div>
            <div>
              <label className="mr-2 text-black">Sort by:</label>
              <select className="border rounded px-2 py-1 text-black">
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
                    Request Date <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    No of Service <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Request Type <span>▼</span>
                  </th>
                  <th className="p-2 text-black text-left">
                    Action <span>▼</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={`${request.id}-${index}`} className="border-b">
                    <td className="p-2 text-black">{request.id}</td>
                    <td className="p-2 text-black">{request.companyName}</td>
                    <td className="p-2 text-black">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-black">{request.noOfService}</td>
                    <td className="p-2 flex items-center text-black">
                      <span
                        className={`mr-2 w-4 h-4 rounded-full ${
                          request.requestType === "Project" ? "bg-pink-500" : "bg-green-500"
                        }`}
                      ></span>
                      {request.requestType}
                    </td>
                    <td className="p-2">
                      <Link href="/request-overview">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 uppercase">
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