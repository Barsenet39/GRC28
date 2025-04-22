'use client';
import { useState, useEffect } from 'react';  // Add necessary hooks
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import Image from 'next/image';

const Help = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const router = useRouter();

  // Sample data
  const data = [
    { id: 1, title: 'Request 1', priority: 'Urgent', status: 'Completed', checkedBy: 'John Doe' },
    { id: 2, title: 'Request 2', priority: 'Standard', status: 'Pending', checkedBy: 'Jane Smith' },
    { id: 3, title: 'Request 3', priority: 'Urgent', status: 'Pending', checkedBy: 'Bob Johnson' },
    { id: 4, title: 'Request 4', priority: 'Standard', status: 'Completed', checkedBy: 'Alice Davis' },
    { id: 5, title: 'Request 5', priority: 'Urgent', status: 'Completed', checkedBy: 'Charlie Brown' },
    { id: 6, title: 'Request 6', priority: 'Standard', status: 'Pending', checkedBy: 'David Lee' },
    { id: 7, title: 'Request 7', priority: 'Urgent', status: 'Completed', checkedBy: 'Eve White' },
  ];

  // Filtering data based on title search
  const filteredData = data.filter(request =>
    request.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Sorting data based on newest to oldest
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === 'newest') return b.id - a.id;
    return a.id - b.id;
  });

  // Handle navigation to the appropriate page based on status
  const handleViewMore = (status) => {
    if (status === 'Completed') {
      router.push('/completed'); // Navigate to the Completed page
    } else {
      router.push('/pending'); // Navigate to the Pending page
    }
  };

  return (
    <div className="container mt-5">
      <h3>Request Reviewed by Assignee</h3>

      {/* Search Bars */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Checked By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.title}</td>
                <td>{request.priority}</td>
                <td>{request.status}</td>
                <td>{request.checkedBy}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMore(request.status)}
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
  );
};

export default Help;
