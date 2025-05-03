"use client";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define interfaces for TypeScript
interface Request {
  id: number;
  companyName: string;
  requestDate: string;
  requestType: string;
  noOfService: number;
  status: string;
}

interface Metrics {
  Expired: number;
  Accepted: number;
  OnProgress: number;
  Closed: number;
}

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ Expired: 0, Accepted: 0, OnProgress: 0, Closed: 0 });
  const [newRequestCount, setNewRequestCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
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

        // Set requests and metrics
        setRequests(data.requests || []);
        setMetrics(data.metrics || { Expired: 0, Accepted: 0, OnProgress: 0, Closed: 0 });

        // Set new request count with a fallback
        const count = data.newRequestCount !== undefined ? data.newRequestCount : 0;
        setNewRequestCount(count);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data");
        // Fallback values in case of error
        setRequests([]);
        setMetrics({ Expired: 0, Accepted: 0, OnProgress: 0, Closed: 0 });
        setNewRequestCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Data for Risk Level chart
  const riskLevelData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "CSM",
        data: [60, 40, 50, 30, 20, 70, 50, 40, 60, 80, 70, 60],
        borderColor: "rgba(147, 51, 234, 1)",
        backgroundColor: "rgba(147, 51, 234, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "CSRM",
        data: [50, 30, 40, 20, 10, 60, 40, 30, 50, 70, 60, 50],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Data for Cyber Governance bar chart
  const governanceData = {
    labels: ["CSM", "CSRM"],
    datasets: [
      {
        label: "Value",
        data: [30, 30],
        backgroundColor: ["rgba(147, 51, 234, 0.6)", "rgba(59, 130, 246, 0.6)"],
        borderColor: ["rgba(147, 51, 234, 1)", "rgba(59, 130, 246, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const riskLevelOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000000",
        },
      },
      title: {
        display: true,
        text: "Risk Level",
        color: "#000000",
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            context.dataset.label === "CSM" && context.label === "Jun"
              ? `Risk Identification: 2.678`
              : `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000000",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#000000",
        },
      },
    },
  };

  const governanceOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Cyber Governance Directorate",
        color: "#000000",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000000",
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          color: "#000000",
        },
      },
    },
  };

  if (loading) {
    return <div className="p-6 text-black">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-black">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar newRequestCount={newRequestCount} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          {/* Metric Cards */}
          <h1 className="text-lg font-bold text-black">DASHBOARD</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500 p-4 rounded-lg shadow flex items-center">
              <div className="bg-blue-200 p-3 rounded-full mr-4">
                <span className="text-blue-700 text-2xl">❌</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Expired</h3>
                <p className="text-2xl font-bold text-white">{metrics.Expired}</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg shadow flex items-center">
              <div className="bg-yellow-200 p-3 rounded-full mr-4">
                <span className="text-yellow-600 text-2xl">📜</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Accepted</h3>
                <p className="text-2xl font-bold text-white">{metrics.Accepted}</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg shadow flex items-center">
              <div className="bg-pink-200 p-3 rounded-full mr-4">
                <span className="text-pink-600 text-2xl">⏳</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">On Progress</h3>
                <p className="text-2xl font-bold text-white">{metrics.OnProgress}</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg shadow flex items-center">
              <div className="bg-orange-200 p-3 rounded-full mr-4">
                <span className="text-orange-600 text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Closed</h3>
                <p className="text-2xl font-bold text-white">{metrics.Closed}</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow">
              <Line data={riskLevelData} options={riskLevelOptions} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <Bar data={governanceData} options={governanceOptions} />
            </div>
          </div>

          {/* Recent Requests Table */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Recent Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border text-black">
                      Request ID <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      Request Date <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      Company Name <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      Request Type <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      No of Service <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      Status <span>▼</span>
                    </th>
                    <th className="p-2 border text-black">
                      Action <span>▼</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr
                      key={`${request.id}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-2 border text-black">{`REQ/${request.id}763${request.id}`}</td>
                      <td className="p-2 border text-black">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="p-2 border text-black">{request.companyName}</td>
                      <td className="p-2 border flex items-center text-black">
                        <span
                          className={`mr-2 w-4 h-4 rounded-full ${
                            request.requestType === "Project" ? "bg-pink-500" : "bg-green-500"
                          }`}
                        ></span>
                        {request.requestType}
                      </td>
                      <td className="p-2 border text-black">{request.noOfService}</td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-black ${
                            request.status === "Requested"
                              ? "bg-purple-100"
                              : request.status === "Rejected"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="p-2 border">
                        <Link href="/request-overview">
                          <button
                            className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                          >
                            View More
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-white p-4 border-t shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center"></div>
            <div className="flex items-center">
              <button className="mr-2 text-black"></button>
              <button className="text-black"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}