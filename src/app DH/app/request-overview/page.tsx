"use client";
import Link from "next/link";
import { useState } from "react";

// Define the shape of a request object
interface Request {
  companyName: string;
  requestDate: string;
  requestType: string;
  noOfService: number;
}

// Define the shape of a professional for the modal
interface Professional {
  name: string;
  id: string;
  taskLoad: number;
  expert: string;
}

export default function RequestOverviewPage() {
  // Static data for the request
  const request: Request = {
    companyName: "Alison Colins and Technology University",
    requestDate: "2020-12-18",
    requestType: "Project",
    noOfService: 4,
  };

  // Static data for professionals (mock data for the modal)
  const professionals: Professional[] = [
    { name: "Barsenet Asfaw", id: "20005642", taskLoad: 2, expert: "TM" },
    { name: "Barsenet Asfaw", id: "20005642", taskLoad: 2, expert: "TM" },
    { name: "Ruth Tasfaye", id: "20005642", taskLoad: 2, expert: "TM" },
    { name: "Barsenet Asfaw", id: "20005642", taskLoad: 2, expert: "TM" },
  ];

  // Mock data for new requests (copied from new-request/page.tsx)
  const mockRequests: Request[] = [
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 4,
      requestType: "Project",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 0,
      requestType: "Technical Review",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 3,
      requestType: "Technical Review",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 3,
      requestType: "Project",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 0,
      requestType: "Project",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 3,
      requestType: "Project",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 0,
      requestType: "Project",
    },
    {
      companyName: "Alison Colins and Technology University",
      requestDate: "2020-12-18",
      noOfService: 4,
      requestType: "Technical Review",
    },
  ];

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track the modal view (table or confirmation)
  const [modalView, setModalView] = useState<"table" | "confirmation">("table");
  // State to track selected professionals
  const [selectedProfessionals, setSelectedProfessionals] = useState<Professional[]>([]);
  // State to track assigned and end dates
  const [assignedDate, setAssignedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // State for date validation error
  const [dateError, setDateError] = useState<string | null>(null);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    setModalView("table"); // Reset to table view when opening
    setSelectedProfessionals([]); // Reset selected professionals
    setAssignedDate(""); // Reset dates
    setEndDate("");
    setDateError(null); // Reset date error
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("table"); // Reset to table view when closing
    setSelectedProfessionals([]); // Reset selected professionals
    setAssignedDate(""); // Reset dates
    setEndDate("");
    setDateError(null); // Reset date error
  };

  // Function to handle selecting a professional
  const handleSelectProfessional = (professional: Professional) => {
    setSelectedProfessionals((prev) => {
      // If the professional is already selected, remove them; otherwise, add them
      const isAlreadySelected = prev.some((p) => p.name === professional.name);
      if (isAlreadySelected) {
        return prev.filter((p) => p.name !== professional.name);
      }
      return [...prev, professional];
    });
  };

  // Function to confirm assignment with date validation
  const confirmAssignment = () => {
    if (assignedDate && endDate) {
      const start = new Date(assignedDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError("End Date cannot be before Assigned Date.");
        return;
      }
    }
    setDateError(null);
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Content */}
      <div className="w-64 bg-white shadow-md flex flex-col min-h-screen">
        <div className="p-4 flex-1">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
            
          </div>
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 rounded hover:bg-gray-200"
                >
                  <span className="mr-2 text-black">📊</span>
                  <span className="text-black">Dashboard</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/new-request"
                  className="flex items-center p-2 rounded hover:bg-gray-200"
                >
                  <span className="mr-2 text-black">📝</span>
                  <span className="text-black">New Request</span>
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {mockRequests.length}
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/request-status"
                  className="flex items-center p-2 rounded hover:bg-gray-200"
                >
                  <span className="mr-2 text-black">🔄</span>
                  <span className="text-black">Request Status</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/returned-requests"
                  className="flex items-center p-2 rounded hover:bg-gray-200"
                >
                  <span className="mr-2 text-black">↩️</span>
                  <span className="text-black">Returned Requests</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <img
              src="/user-avatar.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold text-black">Barsenet Asfaw</p>
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
        <h1 className="text-2xl font-bold mb-6 text-black">Request Overview</h1>

        {/* Company Information and Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Company Information</h2>
            <div className="space-y-2 text-black">
              <p><strong>Company Name:</strong> {request.companyName}</p>
              <p><strong>Company Address:</strong> 123 Meskel Adebaby, Addis Ababa</p>
              <p><strong>Company Phone:</strong> +251-965-661-679</p>
              <p><strong>Company Email:</strong> barasfaw20@gmail.com</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Request Details</h2>
            <div className="space-y-2 text-black">
              <p className="flex items-center">
                <strong>Request Date:</strong>
                <span className="ml-2 flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(request.requestDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="flex items-center">
                <strong>Request Type:</strong>
                <span className="ml-2 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-pink-500 mr-2"></span>
                  {request.requestType}
                </span>
              </p>
              <p><strong>No of Service:</strong> {request.noOfService}</p>
            </div>
          </div>
        </div>

        {/* Request Service */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-black">Request Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-green-500 mr-2">➡️</span>
                <h3 className="font-semibold text-black">Cyber Security Risk Management Service</h3>
              </div>
              <div className="ml-6 space-y-2 text-black">
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Strategic Level Risk Assessment
                  <span className="ml-auto">600,000-1,500,000</span>
                </p>
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Tactical Level Risk Assessment
                  <span className="ml-auto">680,000-1,700,000</span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="text-green-500 mr-2">➡️</span>
                <h3 className="font-semibold text-black">Cyber Security Management Service</h3>
              </div>
              <div className="ml-6 space-y-2 text-black">
                <p className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Governance Document Development: Roles and responsibilities for management, risk communication, and mitigation document
                  <span className="ml-auto">600,000-1,500,000</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Request Documents and Assign to Technical Manager */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Request Documents</h2>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">📄</span>
              <p className="text-black">Organizational Cyber Management Policy.pdf</p>
              <button className="ml-auto text-orange-500">
                <span role="img" aria-label="Download">⬇️</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-black">Assign to Technical Manager</h2>
            <p className="mb-4 text-black">Assign a Technical Manager who is suitable for this project to review its technical aspects.</p>
            <button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Assign
            </button>
          </div>
        </div>

        {/* Approval Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-black">Approval Status</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">📋</span>
              <p className="font-semibold text-black">Director General Approval</p>
              <span className="ml-auto text-black">TBA</span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">📋</span>
              <p className="font-semibold text-black">Deputy Director Approval</p>
              <span className="ml-auto text-black">TBA</span>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">📋</span>
              <p className="font-semibold text-black">Directorate Approval</p>
              <span className="ml-auto text-black">TBA</span>
            </div>
          </div>
        </div>

        {/* Modal for Assign Professional */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Assign Professional for Request ID: REQ/8534/3543
              </h2>

              {modalView === "table" ? (
                <>
                  {/* Table View */}
                  <div className="flex justify-between mb-4">
                    <input
                      type="text"
                      placeholder="Search by Name, ID"
                      className="border rounded px-3 py-2 w-2/3"
                    />
                    <select className="border rounded px-3 py-2 w-1/4">
                      <option>Search by Task Load</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-black text-left">Name</th>
                          <th className="p-2 text-black text-left">ID</th>
                          <th className="p-2 text-black text-left">Task Load</th>
                          <th className="p-2 text-black text-left">Expert</th>
                          <th className="p-2 text-black text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {professionals.map((professional, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 text-black">{professional.name}</td>
                            <td className="p-2 text-black">{professional.id}</td>
                            <td className="p-2 text-black">{professional.taskLoad}</td>
                            <td className="p-2 text-black">{professional.expert}</td>
                            <td className="p-2">
                              <button
                                onClick={() => handleSelectProfessional(professional)}
                                className={`px-4 py-1 rounded text-white ${
                                  selectedProfessionals.some((p) => p.name === professional.name)
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                              >
                                {selectedProfessionals.some((p) => p.name === professional.name)
                                  ? "Selected"
                                  : "Select"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setModalView("confirmation")}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={selectedProfessionals.length === 0}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Confirmation View */}
                  <div className="mb-4">
                    <p className="text-black">
                      <strong>Selected Technical Expert:</strong>{" "}
                      {selectedProfessionals
                        .map((p) => `${p.expert === "TM" ? "TM" : "PM"}: ${p.name}`)
                        .join(" and ")}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-2">Write comment for professional</label>
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      rows={3}
                      placeholder="Write comment for professional"
                    ></textarea>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                      <label className="block text-black mb-2">Assigned Date</label>
                      <input
                        type="date"
                        value={assignedDate}
                        onChange={(e) => setAssignedDate(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-black mb-2">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                  </div>
                  {dateError && (
                    <p className="text-red-500 mb-4">{dateError}</p>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAssignment}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Confirm Assignment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}