"use client"; // Required for interactive client-side components

import { useEffect } from "react";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FaCalendarAlt, FaEye,FaTools } from 'react-icons/fa';
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
import { useRouter } from "next/navigation"; // Import useRouter

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
  const router = useRouter(); // Initialize router

  // Sample data for demonstration
  const projectData = {
    requested: 726,
    accepted: 36,
    inProgress: 156,
    closed: 28,
    rejected: 20,
  };

  const requestTypes = [
    { name: "Cyber Security Risk Assessment", count: 103 },
    { name: "Governance Document Development", count: 57 },
    { name: "Cyber Security Management Development", count: 17 },
  ];

  const requestCounts = requestTypes.map(request => request.count);
  const requestLabels = requestTypes.map(request => request.name);

  // Data for Pie Chart
  const pieData = {
    labels: requestLabels,
    datasets: [
      {
        data: requestCounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  const sectorData = {
    labels: ['Finance', 'Private', 'Airlines', 'Fintech', 'Startup', 'Other'],
    datasets: [{
      data: [15, 25, 20, 30, 12, 22],
      backgroundColor: [
        '#A78BFA',  // Purple
        '#EF4444',  // Red
        '#FCD34D',  // Yellow
        '#60A5FA',  // Blue
        '#CBD5E1',  // Light gray
        '#34D399',  // Green
      ],
    }]
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Projects',
        data: [65, 78, 90, 85, 95, 110],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.1
      }
    ]
  };

  const requestTypeData = {
    labels: ['Project', 'Technical Support'],
    datasets: [{
      data: [25, 150],
      backgroundColor: [
        '#1E40AF',  // Dark blue
        '#6B7280',  // Gray
      ],
    }]
  };

  // Define the handleViewMore function
  const handleViewMore = () => {
    router.push('/view-request'); // Navigate to the view-request page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-sm"> {/* Reduced base font size */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center">Dashboard</h1> {/* Reduced header size */}

        {/* Color card display */}
        {(() => {
          const colors = [
            "bg-blue-100",
            "bg-green-100",
            "bg-yellow-100",
            "bg-purple-100",
            "bg-red-100"
          ];
          return (
<div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-5 gap-4 mb-6">
{Object.entries(projectData).map(([key, value], idx) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg shadow-md flex flex-col justify-center items-start ${colors[idx % colors.length]}`} // Reduced padding
                >
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-600 mb-1">{key}</span>
                  <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">{value}</span> {/* Reduced font size */}
                </div>
              ))}
            </div>
          );
        })()}

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Duration card */}
            <div className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-md"> {/* Reduced padding */}
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Project Duration</h2> {/* Reduced header size */}
              <Line 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Project',
                      data: [10, 12, 11, 20, 30, 22, 25],
                      borderColor: '#5B3A29',
                      backgroundColor: 'rgba(91,58,41,0.08)',
                      borderWidth: 2, // Reduced border width
                      tension: 0.4,
                      fill: false,
                      pointRadius: 0,
                      segment: {
                        borderColor: ctx => {
                          const { ctx: chartCtx } = ctx.chart;
                          chartCtx.save();
                          chartCtx.shadowColor = 'rgba(91,58,41,0.25)';
                          chartCtx.shadowBlur = 6; // Reduced shadow blur
                          chartCtx.shadowOffsetX = 0;
                          chartCtx.shadowOffsetY = 3; // Reduced shadow offset
                          chartCtx.restore();
                          return '#5B3A29';
                        }
                      }
                    },
                    {
                      label: 'Review',
                      data: [5, 15, 22, 12, 18, 25, 30],
                      borderColor: '#60A5FA',
                      borderWidth: 2, // Reduced border width
                      borderDash: [4, 4], // Reduced dash size
                      tension: 0.4,
                      fill: false,
                      pointRadius: 0,
                      segment: {
                        borderColor: ctx => {
                          const { ctx: chartCtx } = ctx.chart;
                          chartCtx.save();
                          chartCtx.shadowColor = 'rgba(96,165,250,0.18)';
                          chartCtx.shadowBlur = 6; // Reduced shadow blur
                          chartCtx.shadowOffsetX = 0;
                          chartCtx.shadowOffsetY = 3; // Reduced shadow offset
                          chartCtx.restore();
                          return '#60A5FA';
                        }
                      }
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        pointStyleWidth: 10, // Reduced point style width
                        font: {
                          size: 12, // Reduced font size
                          weight: 'bold'
                        }
                      }
                    },
                    tooltip: {
                      enabled: true
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
            {/* Request Type card */}
            <div className="bg-white rounded-lg p-4 flex flex-col shadow-md"> {/* Reduced padding */}
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-8">Request Type</h2> {/* Reduced header size & margin */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Project</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-1.5 rounded-full bg-black"></span> {/* Reduced size */}
                    <span className="inline-block w-3 h-1.5 rounded-full bg-gray-200"></span> {/* Reduced size */}
                  </div>
                  <span className="text-gray-900 font-medium">20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Technical<br />Support</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-6 h-1.5 rounded-full bg-black"></span> {/* Reduced size */}
                    <span className="inline-block w-6 h-1.5 rounded-full bg-gray-200"></span> {/* Reduced size */}
                  </div>
                  <span className="text-gray-900 font-medium">150</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md"> {/* Reduced padding */}
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Request Types</h2> {/* Reduced header size */}
            <div className="flex flex-row items-center gap-4"> {/* Reduced gap */}
              <div className="w-1/2 flex justify-center">
                <Pie data={pieData} />
              </div>
              <div className="w-1/2">
                <ul className="space-y-2"> {/* Reduced spacing */}
                  {requestTypes.map((request, idx) => (
                    <li key={request.name} className="flex items-center gap-2"> {/* Reduced gap */}
                      <span
                        className="inline-block w-6 h-2 rounded mr-1" // Reduced size & margin
                        style={{
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][idx % 3]
                        }}
                      ></span>
                      <span className="text-gray-700 text-sm md:text-base">{request.name}</span> {/* Reduced font size */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md"> {/* Reduced padding */}
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Sector Type</h2> {/* Reduced header size */}
            <div className="h-48"> {/* Reduced height */}
              <Bar 
                data={{
                  ...sectorData,
                  datasets: sectorData.datasets.map(ds => ({
                    ...ds,
                    borderRadius: 15, // Rounded bars
                    barThickness: 18, // Make bars thinner (adjust value as needed)
                  }))
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 35,
                      grid: {
                        display: false // Remove y grid lines
                      }
                    },
                    x: {
                      grid: {
                        display: false // Remove x grid lines
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4"> {/* Reduced margin & padding */}
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Recent Requests</h2> {/* Reduced header size & margin */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal"> {/* Reduced font size */}
                <th className="py-2 px-3 text-center">Request ID</th> {/* Reduced padding */}
                <th className="py-2 px-3 text-center">Company Name</th> {/* Reduced padding */}
                <th className="py-2 px-3 text-center">Request Date</th> {/* Reduced padding */}
                <th className="py-2 px-3 text-center">Number of Services</th> {/* Reduced padding */}
                <th className="py-2 px-3 text-center">Request Type</th> {/* Reduced padding */}
                <th className="py-2 px-3 text-center">Action</th> {/* Reduced padding */}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light"> {/* Reduced font size */}
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 text-left font-semibold">REG/978364</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-bold">Adama Science and Technology University</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaCalendarAlt className="inline-block mr-1 text-green-500" />
                  2020-12-12
                </td>
                <td className="py-2 px-3 text-center font-semibold">1</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaEye className="inline-block mr-1 text-orange-500" />
                  Project
                </td>
                <td className="py-2 px-3 text-left "> {/* Reduced padding */}
                  <button
                    className="bg-blue-500 text-white py-1 px-2 text-[0.6rem] rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap" // Reduced padding & font size
                    onClick={handleViewMore}
                  >
                    View More
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 text-left font-semibold">REG/978365</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-bold">Another University</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaCalendarAlt className="inline-block mr-1 text-green-500" />
                  2020-12-15
                </td>
                <td className="py-2 px-3 text-center font-semibold">2</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaTools className="inline-block mr-1 text-green-500" />
                  Technical Support
                </td>
                <td className="py-2 px-3 text-left"> {/* Reduced padding */}
                  <button className="bg-blue-500 text-white py-1 px-2 text-[0.6rem] rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap">
                    View More
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 text-left font-semibold">REG/978366</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-bold">Tech University</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaCalendarAlt className="inline-block mr-1 text-green-500" />
                  2021-01-20
                </td>
                <td className="py-2 px-3 text-center font-semibold">3</td> {/* Reduced padding */}
                <td className="py-2 px-3 text-left font-semibold"> {/* Reduced padding */}
                  <FaEye className="inline-block mr-1 text-orange-500" />
                  Project
                </td>
                <td className="py-2 px-3 text-left"> {/* Reduced padding */}
                  <button className="bg-blue-500 text-white py-1 px-2 text-[0.6rem] rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap">
                    View More
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;