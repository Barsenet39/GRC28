// File: src/app/Requested/page.js

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload, FaEye, FaCalendarAlt, FaTools, FaFileAlt } from "react-icons/fa";

const View = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [riskCards, setRiskCards] = useState([]);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("riskCards") || "[]");
    setRiskCards(stored);
  }, []);

  useEffect(() => {
    if (!id) return;
    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const found = storedRequests.find((r) => r.id === id);
    setRequest(found || null);
  }, [id]);

  if (!request) {
    return <div className="text-center mt-20 text-gray-600 text-lg">Loading request...</div>;
  }

  const handleView = (url) => url && window.open(url, "_blank");
  const handleDownload = (url, fileName) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "file.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const grouped =
    Array.isArray(request.services) && request.services.length > 0
      ? request.services.reduce((acc, svc) => {
          const { mainTitle, category, subCategory, items } = svc;
          if (!acc[mainTitle]) acc[mainTitle] = {};
          if (!acc[mainTitle][category]) acc[mainTitle][category] = [];
          acc[mainTitle][category].push({ subCategory, cost: items[0]?.cost });
          return acc;
        }, {})
      : {};

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-6 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Request Details</h1>
          <div className="bg-white dark:bg-gray-500 rounded-lg p-6 shadow-md">
            <InfoRow label="Request ID" value={request.id} />
            <InfoRow
              label="Request Date"
              value={
                <>
                  <FaCalendarAlt className="inline-block mr-2 text-primary" />
                  {request.date}
                </>
              }
            />
            <InfoRow
              label="Request Type"
              value={
                <span
                  className={`flex items-center font-semibold ${
                    request.type === "Project" ? "text-orange-500" : "text-green-500"
                  }`}
                >
                  {request.type === "Project" ? (
                    <FaFileAlt className="inline-block mr-2" />
                  ) : (
                    <FaTools className="inline-block mr-2" />
                  )}
                  {request.type}
                </span>
              }
            />
            <InfoRow
              label="Request Status"
              value={
                <span
                  className={`font-medium ${
                    request.status === "Requested" ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {request.status}
                </span>
              }
            />
          </div>

          {/* Files */}
          <h2 className="text-2xl font-semibold text-black dark:text-white mt-10 mb-3">
            Request Documents
          </h2>
          <div className="bg-gray dark:bg-gray-800 rounded-lg p-4 shadow-md space-y-3">
            {request.files && Object.entries(request.files).length > 0 ? (
              Object.entries(request.files).map(([name, url], idx) => {
                const displayName = name.endsWith(".pdf") ? name : `${name}.pdf`;
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2"
                  >
                    <span className="text-black dark:text-white capitalize">
                      {displayName.replace(/([A-Z])/g, " $1")}
                    </span>
                    <div className="flex items-center">
                      <FaEye
                        className="text-blue-600 cursor-pointer mr-4 hover:scale-110 transition-transform"
                        onClick={() => handleView(url)}
                        aria-label="View Document"
                      />
                      <FaDownload
                        className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleDownload(url, displayName)}
                        aria-label="Download Document"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No documents available.</p>
            )}
          </div>
        </div>

      {/* Right Section */}
<div className="flex-1 px-4 md:px-6">
  <h2 className="text-3xl font-extrabold mb-4 text-black dark:text-white">Request Services</h2>

  {Object.keys(grouped).length === 0 ? (
    <p className="text-gray-500 text-base">No services listed for this request.</p>
  ) : (
    Object.entries(grouped).map(([mainTitle, categories]) => (
      <section key={mainTitle} className="mb-8">
        <h3 className="text-lg font-semibold text-green-600 dark:text-white mb-2 border-b border-gray-300 dark:border-gray-600 pb-1">
          {mainTitle}
        </h3>

        {Object.entries(categories).map(([category, services]) => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-semibold text-black dark:text-gray-300 mb-4">
              {category}
            </h4>

            <div className="space-y-4">
              {services.map((svc, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="text-gray-900 dark:text-gray-100 text-base">{svc.subCategory}</span>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm">
                    {svc.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    ))
  )}
</div>



      </div>
    </div>
  );
};

// Helper component to keep Info rows clean
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between mb-4">
    <strong className="w-1/3 text-gray-700 dark:text-gray-300">{label}:</strong>
    <span className="w-2/3 text-left text-black dark:text-white">{value}</span>
  </div>
);

export default View;
