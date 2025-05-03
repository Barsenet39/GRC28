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

export default function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/requests", { cache: "no-store" });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
        }
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
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
      legend: { position: "top" },
      title: { display: true, text: "Risk Level" },
      tooltip: {
        callbacks: {
          label: (context) =>
            context.dataset.label === "CSM" && context.label === "Jun"
              ? `Risk Identification: 2.678`
              : `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  const governanceOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Cyber Governance Directorate" },
    },
    scales: {
      y: { beginAtZero: true, max: 50 },
    },
  };

  if (loading) {
    return <div className="p-6 text-black">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-black shadow-md">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
            <h1 className="text-xl font-bold text-black">Cyber Governance</h1>
          </div>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/dashboard" className="flex items-center p-2 bg-black rounded">
                  <span className="mr-2 text-white">📊</span>
                  <span className="text-white">Dashboard</span>
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center p-2 hover:bg-black rounded">
                  <span className="mr-2 text-black hover:text-white">📝</span>
                  <span className="text-black hover:text-white">New Request</span>
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center p-2 hover:bg-black rounded">
                  <span className="mr-2 text-black hover:text-white">🔄</span>
                  <span className="text-black hover:text-white">Request Status</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-black rounded">
                  <span className="mr-2 text-black hover:text-white">↩️</span>
                  <span className="text-black hover:text-white">Returned Requests</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* User Profile Section */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <img
              src="/user-avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold text-black">
                
              </p>
              <p className="text-sm text-black">Division Head</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button className="mr-2 text-black">
              <span role="img" aria-label="Globe">🌐</span> EN
            </button>
            <button className="mr-2 text-black">
              <span role="img" aria-label="Dark Mode">🌙</span> Dark Mode
            </button>
            <button className="text-black">
              <span role="img" aria-label="Settings">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
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
                <tr className="bg-black">
                  <th className="p-2 border text-white">
                    Request ID <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    Request Date <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    Company Name <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    Request Type <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    No of Service <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    Status <span>▼</span>
                  </th>
                  <th className="p-2 border text-white">
                    Action <span>▼</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-black">
                    <td className="p-2 border text-black hover:text-white">{`REQ/${request.id}763${request.id}`}</td>
                    <td className="p-2 border text-black hover:text-white">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border text-black hover:text-white">{request.companyName}</td>
                    <td className="p-2 border flex items-center text-black hover:text-white">
                      <span
                        className={`mr-2 w-4 h-4 rounded-full ${
                          request.requestType === "Project" ? "bg-pink-500" : "bg-green-500"
                        }`}
                      ></span>
                      {request.requestType}
                    </td>
                    <td className="p-2 border text-black hover:text-white">{request.noOfService}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded ${
                          request.status === "Requested"
                            ? "bg-purple-100 text-purple-700"
                            : request.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-2 border">
                      <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
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
    </div>
  );
}