"use client";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,  LineElement,  BarElement,
 Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 

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
  const [metrics, setMetrics] = useState({
    Expired: 0,
    Accepted: 0,
    OnProgress: 0,
    Closed: 0,
  });

  const [newRequestCount, setNewRequestCount] = useState(0);

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

  const riskLevelOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#000000" },
      },
      title: {
        display: true,
        text: "Risk Level",
        color: "#000000",
      },
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
      x: { ticks: { color: "#000000" } },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#000000" },
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
      x: { ticks: { color: "#000000" } },
      y: {
        beginAtZero: true,
        max: 50,
        ticks: { color: "#000000" },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-lg font-bold text-black">DASHBOARD</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Expired", count: metrics.Expired, icon: "❌", bg: "bg-blue-200", iconColor: "text-blue-700" },
              { label: "Accepted", count: metrics.Accepted, icon: "📜", bg: "bg-yellow-200", iconColor: "text-yellow-600" },
              { label: "On Progress", count: metrics.OnProgress, icon: "⏳", bg: "bg-pink-200", iconColor: "text-pink-600" },
              { label: "Closed", count: metrics.Closed, icon: "✅", bg: "bg-orange-200", iconColor: "text-orange-600" },
            ].map(({ label, count, icon, bg, iconColor }) => (
              <div key={label} className="bg-blue-500 p-4 rounded-lg shadow flex items-center">
                <div className={`${bg} p-3 rounded-full mr-4`}>
                  <span className={`${iconColor} text-2xl`}>{icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <p className="text-2xl font-bold text-white">{count}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow">
              <Line data={riskLevelData} options={riskLevelOptions} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <Bar data={governanceData} options={governanceOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Recent Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    {["Request ID", "Request Date", "Company Name", "Request Type", "No of Service", "Status", "Action"].map(
                      (header) => (
                        <th key={header} className="p-2 border text-black">
                          {header} <span>▼</span>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Static data for requests */}
                  {[
                    { id: 1, requestDate: "2023-03-01", companyName: "Company A", requestType: "Project", noOfService: 3, status: "Requested" },
                    { id: 2, requestDate: "2023-03-02", companyName: "Company B", requestType: "Consulting", noOfService: 5, status: "Accepted" },
                  ].map((request, index) => (
                    <tr key={`${request.id}-${index}`} className="hover:bg-gray-50">
                      <td className="p-2 border text-black">{`REQ/${request.id}763${request.id}`}</td>
                      <td className="p-2 border text-black">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>
                      <td className="p-2 border text-black">{request.companyName}</td>
                      <td className="p-2 border flex items-center text-black">
                        <span
                          className={`mr-2 w-4 h-4 rounded-full ${request.requestType === "Project" ? "bg-pink-500" : "bg-green-500"}`}
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
          </div>
        </div>

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
