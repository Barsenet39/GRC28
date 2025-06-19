"use client";

import { useEffect, useState } from "react";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FaCalendarAlt, FaEye, FaTools } from 'react-icons/fa';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRouter } from "next/navigation";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const View = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    requested: 0,
    accepted: 0,
    inProgress: 0,
    closed: 0,
    rejected: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log('Fetching requests from /api/requests');
        let response = await fetch('/api/requests', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          console.log('Proxy failed, trying direct URL');
          response = await fetch('http://localhost:5000/api/requests', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!response.ok) {
          const text = await response.text();
          console.error('Raw response:', text.slice(0, 200));
          throw new Error(`Failed to fetch requests: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log('Received requests:', data);

        // Count requests by status
        const counts = data.reduce((acc, request) => {
          const status = request.status.toLowerCase();
          if (['requested', 'accepted', 'inprogress', 'closed', 'rejected'].includes(status)) {
            acc[status] = (acc[status] || 0) + 1;
          }
          return acc;
        }, { requested: 0, accepted: 0, inprogress: 0, closed: 0, rejected: 0 });

        setProjectData(counts);

        // Get recent 3 requests for table
        const recent = data.slice(0, 3).map(request => ({
          requestId: request.requestId,
          companyName: request.companyName || 'Anonymous',
          date: request.date,
          services: request.services ? request.services.reduce((sum, s) => sum + (s.items?.length || 0), 0) : 0,
          type: request.type || 'Project',
        }));
        setRecentRequests(recent);

        localStorage.setItem("requests", JSON.stringify(data));
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);

        // Fallback to localStorage or default
        const stored = JSON.parse(localStorage.getItem("requests") || "[]");
        if (stored.length > 0) {
          const counts = stored.reduce((acc, request) => {
            const status = request.status.toLowerCase();
            if (['requested', 'accepted', 'inprogress', 'closed', 'rejected'].includes(status)) {
              acc[status] = (acc[status] || 0) + 1;
            }
            return acc;
          }, { requested: 0, accepted: 0, inprogress: 0, closed: 0, rejected: 0 });
          setProjectData(counts);

          const recent = stored.slice(0, 3).map(request => ({
            requestId: request.requestId,
            companyName: request.companyName || 'Anonymous',
            date: request.date,
            services: request.services ? request.services.reduce((sum, s) => sum + (s.items?.length || 0), 0) : 0,
            type: request.type || 'Project',
          }));
          setRecentRequests(recent);
        } else {
          setProjectData({
            requested: 1,
            accepted: 0,
            inProgress: 0,
            closed: 0,
            rejected: 0,
          });
          setRecentRequests([
            {
              requestId: 'REG/978364',
              companyName: 'Anonymous',
              date: '2020-12-12',
              services: 1,
              type: 'Project',
            },
          ]);
        }
      }
    };

    fetchRequests();
  }, []);

  // Static chart data (unchanged)
  const requestTypes = [
    { name: "Cyber Security Risk Assessment", count: 103 },
    { name: "Governance Document Development", count: 57 },
    { name: "Cyber Security Management Development", count: 95 },
  ];

  const requestCounts = requestTypes.map(request => request.count);
  const requestLabels = requestTypes.map(request => request.name);

  const pieData = {
    labels: requestLabels,
    datasets: [
      {
        data: requestCounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const sectorData = {
    labels: ['Finance', 'Private', 'Airlines', 'Fintech', 'Startup', 'Other'],
    datasets: [{
      data: [15, 10, 20, 30, 12, 22],
      backgroundColor: [
        '#A78BFA', '#EF4444', '#FCD34D', '#60A5FA', '#CBD5E1', '#34D399',
      ],
    }],
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Projects',
        data: [65, 78, 90, 85, 95, 110],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  };

  const requestTypeData = {
    labels: ['Project', 'Technical Support'],
    datasets: [{
      data: [20, 150],
      backgroundColor: ['#1E40AF', '#6B7280'],
    }],
  };

  const handleViewMore = (requestId) => {
    router.push(`../Director_General/view-request?id=${encodeURIComponent(requestId)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-sm">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center">Dashboard</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        {/* Color card display */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-5 gap-4 mb-6">
          {Object.entries(projectData).map(([key, value], idx) => {
            const colors = [
              "bg-blue-100",
              "bg-green-100",
              "bg-yellow-100",
              "bg-purple-100",
              "bg-red-100",
            ];
            return (
              <div
                key={key}
                className={`p-4 rounded-lg shadow-md flex flex-col justify-center items-start ${colors[idx % colors.length]}`}
              >
                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-600 mb-1">{key}</span>
                <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">{value}</span>
              </div>
            );
          })}
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Duration card */}
            <div className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-md">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Project Duration</h2>
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Project',
                      data: [10, 12, 11, 20, 30, 22, 25],
                      borderColor: '#5B3A29',
                      backgroundColor: 'rgba(91,58,41,0.08)',
                      borderWidth: 2,
                      tension: 0.4,
                      fill: false,
                      pointRadius: 0,
                      segment: {
                        borderColor: ctx => {
                          const { ctx: chartCtx } = ctx.chart;
                          chartCtx.save();
                          chartCtx.shadowColor = 'rgba(91,58,41,0.25)';
                          chartCtx.shadowBlur = 6;
                          chartCtx.shadowOffsetX = 0;
                          chartCtx.shadowOffsetY = 3;
                          chartCtx.restore();
                          return '#5B3A29';
                        },
                      },
                    },
                    {
                      label: 'Review',
                      data: [5, 15, 22, 12, 18, 25, 30],
                      borderColor: '#60A5FA',
                      borderWidth: 2,
                      borderDash: [4, 4],
                      tension: 0.4,
                      fill: false,
                      pointRadius: 0,
                      segment: {
                        borderColor: ctx => {
                          const { ctx: chartCtx } = ctx.chart;
                          chartCtx.save();
                          chartCtx.shadowColor = 'rgba(96,165,250,0.18)';
                          chartCtx.shadowBlur = 6;
                          chartCtx.shadowOffsetX = 0;
                          chartCtx.shadowOffsetY = 3;
                          chartCtx.restore();
                          return '#60A5FA';
                        },
                      },
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        pointStyleWidth: 10,
                        font: {
                          size: 12,
                          weight: 'bold',
                        },
                      },
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
            {/* Request Type card */}
            <div className="bg-white rounded-lg p-4 flex flex-col shadow-md">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-8">Request Type</h2>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Project</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-1.5 rounded-full bg-black"></span>
                    <span className="inline-block w-3 h-1.5 rounded-full bg-gray-200"></span>
                  </div>
                  <span className="text-gray-900 font-medium">20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Technical<br />Support</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-6 h-1.5 rounded-full bg-black"></span>
                    <span className="inline-block w-6 h-1.5 rounded-full bg-gray-200"></span>
                  </div>
                  <span className="text-gray-900 font-medium">150</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Request Types</h2>
            <div className="flex flex-row items-center gap-4">
              <div className="w-1/2 flex justify-center">
                <Pie data={pieData} />
              </div>
              <div className="w-1/2">
                <ul className="space-y-2">
                  {requestTypes.map((request, idx) => (
                    <li key={request.name} className="flex items-center gap-2">
                      <span
                        className="inline-block w-6 h-2 rounded mr-1"
                        style={{
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][idx % 3],
                        }}
                      ></span>
                      <span className="text-gray-700 text-sm md:text-base">{request.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Sector Type</h2>
            <div className="h-48">
              <Bar
                data={{
                  ...sectorData,
                  datasets: sectorData.datasets.map(ds => ({
                    ...ds,
                    borderRadius: 15,
                    barThickness: 18,
                  })),
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 35,
                      grid: {
                        display: false,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Recent Requests</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <th className="py-2 px-3 text-center">Request ID</th>
                <th className="py-2 px-3 text-center">Company Name</th>
                <th className="py-2 px-3 text-center">Request Date</th>
                <th className="py-2 px-3 text-center">Number of Services</th>
                <th className="py-2 px-3 text-center">Request Type</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light">
              {recentRequests.map((request) => (
                <tr key={request.requestId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 px-3 text-left font-semibold">{request.requestId}</td>
                  <td className="py-2 px-3 text-left font-bold">{request.companyName}</td>
                  <td className="py-2 px-3 text-left font-semibold">
                    <FaCalendarAlt className="inline-block mr-1 text-green-500" />
                    {request.date}
                  </td>
                  <td className="py-2 px-3 text-center font-semibold">{request.services}</td>
                  <td className="py-2 px-3 text-left font-semibold">
                    {request.type === 'Project' ? (
                      <FaEye className="inline-block mr-1 text-orange-500" />
                    ) : (
                      <FaTools className="inline-block mr-1 text-green-500" />
                    )}
                    {request.type}
                  </td>
                  <td className="py-2 px-3 text-left">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 text-[0.6rem] rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
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