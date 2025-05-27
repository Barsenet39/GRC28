"use client";

import React, { useState } from 'react';

const AssessmentQuestionnaire = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    { id: 1, title: 'Cyber Risk Management', type: 'Strategical' },
    { id: 2, title: 'Cyber Risk Management', type: 'Tactical' },
    { id: 3, title: 'Cyber Risk Management', type: 'Operational' },
    { id: 4, title: 'Cyber Risk Management', type: 'Risk' },
    { id: 5, title: 'Cyber Risk Management', type: 'Strategical' },
    { id: 6, title: 'Cyber Risk Management', type: 'Tactical' },
    { id: 7, title: 'Cyber Risk Management', type: 'Strategical' },
    { id: 8, title: 'Cyber Risk Management', type: 'Operational' },
    { id: 9, title: 'Cyber Risk Management', type: 'Risk' },
    { id: 10, title: 'Cyber Risk Management', type: 'Strategical' },
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 text-sm">
      {/* Reduced padding, lighter background, base font size */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Assessment Questionnaire</h1>
      {/* Smaller header, base text color */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full max-w-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          {/* Added border and rounded corners */}
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              {/* Lighter background, text color, smaller text */}
              <th className="py-2 px-3 text-left">#</th>
              <th className="py-2 px-3 text-left">Title</th>
              <th className="py-2 px-3 text-left">Questionnaire Types</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs font-light">
            {/* Base text color, smaller text */}
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                {/* Added border between rows */}
                <td className="py-2 px-3 text-left">{item.id}</td>
                <td className="py-2 px-3 text-left">{item.title}</td>
                <td className="py-2 px-3 text-left">{item.type}</td>
                <td className="py-2 px-3 text-center">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 whitespace-nowrap">Edit</button>
                  {/* Rounded buttons, added shadow and transition */}
                  <button className="bg-red-500 text-white py-1 px-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105 whitespace-nowrap ml-2">Delete</button>
                  {/* Rounded buttons, added shadow and transition */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4 text-gray-600">
        <span>Showing {filteredData.length} out of {data.length} entries</span>
        <div className="flex space-x-2">
          <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">1</button>
          <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">2</button>
          <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">3</button>
          <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestionnaire;