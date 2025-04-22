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
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Assessment Questionnaire</h1>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-3 w-full max-w-xs shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4 border-b border-gray-200">#</th>
              <th className="py-3 px-4 border-b border-gray-200">Title</th>
              <th className="py-3 px-4 border-b border-gray-200">Questionnaire Types</th>
              <th className="py-3 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition duration-150">
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.id}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.title}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{item.type}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200">Edit</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200 ml-2">Delete</button>
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