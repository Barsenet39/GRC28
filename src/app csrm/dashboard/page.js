"use client"; // Required for interactive client-side components

import { useEffect } from "react";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FaCalendarAlt, FaEye, FaTools, FaQuestionCircle, FaExclamationTriangle, FaShieldAlt, FaServer, FaProjectDiagram, FaFileAlt } from 'react-icons/fa';
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
  const dashboardData = {
    createdQuestionnaires: 75,
    assets: 50,
    threat: 25,
    vulnerability: 30,
  };

  const recentRequests = [
    {
      id: 'REQ/876364',
      date: '12 Dec, 2020',
      companyName: 'Adama Science and Technology University',
      requestType: 'Project',
    },
    {
      id: 'REQ/876364',
      date: '12 Dec, 2020',
      companyName: 'Adama Science and Technology University',
      requestType: 'Review',
    },
    {
      id: 'REQ/876364',
      date: '12 Dec, 2020',
      companyName: 'Adama Science and Technology University',
      requestType: 'Review',
    },
  ];

  const riskLevelData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Risk Level',
        data: [20, 30, 70, 60, 40, 45, 80, 70, 60, 50, 70, 100],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Define the handleViewMore function
  const handleViewMore = () => {
    router.push('/view-request'); // Navigate to the view-request page
  };

  const getRequestTypeIcon = (type) => {
    if (type === 'Project') {
      return <FaProjectDiagram className="inline-block mr-1 text-purple-500" />;
    } else if (type === 'Review') {
      return <FaFileAlt className="inline-block mr-1 text-green-500" />;
    } else {
      return <FaEye className="inline-block mr-1 text-orange-500" />; // Default icon
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-sm">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center">Dashboard</h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaQuestionCircle className="text-3xl mb-2" />
            <span className="text-xl font-bold">{dashboardData.createdQuestionnaires}</span>
            <span>Created Questionnaires</span>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaServer className="text-3xl mb-2" />
            <span className="text-xl font-bold">{dashboardData.assets}</span>
            <span>Assets</span>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaExclamationTriangle className="text-3xl mb-2" />
            <span className="text-xl font-bold">{dashboardData.threat}</span>
            <span>Threat</span>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaShieldAlt className="text-3xl mb-2" />
            <span className="text-xl font-bold">{dashboardData.vulnerability}</span>
            <span>Vulnerability</span>
          </div>
        </div>

        {/* Risk Level Chart */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Risk Level</h2>
          <Line data={riskLevelData} />
        </div>

        {/* Recent Requests Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Recent Requests</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <th className="py-2 px-3 text-left">Request ID</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Request Date</th>
                <th className="py-2 px-3 text-left">Request Type</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light">
              {recentRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 px-3 text-left">{request.id}</td>
                  <td className="py-2 px-3 text-left">{request.companyName}</td>
                  <td className="py-2 px-3 text-left">
                    <FaCalendarAlt className="inline-block mr-1 text-green-500" />
                    {request.date}
                  </td>
                  <td className="py-2 px-3 text-left">
                    {getRequestTypeIcon(request.requestType)}
                    {request.requestType}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 text-[0.6rem] rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap"
                      onClick={handleViewMore}
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