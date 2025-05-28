"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const router = useRouter();

  // Fetch current user info (to get userId)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/riskmanagement", {
          credentials: "include",
        });
        if (!res.ok) {
          router.push("/signin");
          return;
        }
        const data = await res.json();
        if (data._id) {
          setCurrentUserId(data._id);
          setError(null);
        } else {
          setError("User ID not found.");
        }
      } catch {
        setError("Authentication error. Please sign in.");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // Fetch uploads once currentUserId is known
  useEffect(() => {
    if (!currentUserId) return;

    const fetchUploads = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/uploads?userId=${currentUserId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          setError(`Failed to fetch uploads. Status: ${res.status}`);
          return;
        }
        const data = await res.json();
        setRequests(data);
        setError(null);
      } catch {
        setError("Error fetching uploads.");
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [currentUserId]);

  const handleViewMore = (id) => {
    router.push(`/Requests/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">My Submitted Requests</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {error && (
        <p className="text-center text-red-600 mb-4">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4 border-b">Request ID</th>
              <th className="py-3 px-4 border-b">Request Date</th>
              <th className="py-3 px-4 border-b">Company Name</th>
              <th className="py-3 px-4 border-b">Request Type</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-100 transition">
                  <td className="py-2 px-4 text-gray-500 border-b">{req.requestId || "N/A"}</td>
                  <td className="py-2 px-4 text-gray-500 border-b">{req.date || "N/A"}</td>
                  <td className="py-2 px-4 text-gray-500 border-b">{req.companyName || "N/A"}</td>
                  <td className="py-2 px-4 text-gray-500 border-b">{req.type || "N/A"}</td>
                  <td className="py-2 px-4  border-b text-yellow-600 font-semibold">{req.status || "Pending"}</td>
                  <td className="py-2 px-4  text-gray-500 border-b">
                    <button
                      onClick={() => handleViewMore(req._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
