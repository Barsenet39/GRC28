"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload, FaEye, FaFileAlt, FaCalendarAlt } from "react-icons/fa";

const View = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const status = searchParams.get("status"); // 👈 now available
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!id) return;
    const stored = JSON.parse(localStorage.getItem("requests") || "[]");
    const found = stored.find((r) => r.id === id);
    if (found) setRequest(found);
  }, [id]);
  

 

useEffect(() => {
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
  if (selectedServices.length > 0) {
    // Assuming that you want to store these services in the request object
    setRequest((prevRequest) => ({
      ...prevRequest,
      services: selectedServices,
    }));
  }
}, []);
if (!request) {
  return (
    <div className="text-center mt-10">Loading request...</div>
  );
}

// Open file in a new tab (works for Object URL or Base64 URL)
const handleView = (fileUrl) => {
  if (fileUrl) {
    window.open(fileUrl, "_blank");
  }
};
 // Download file when clicked
 const handleDownload = (fileUrl, fileName) => {
  const link = document.createElement("a");
  link.href = fileUrl;  // It should be a valid Object URL or base64 URL
  link.download = fileName || "file.pdf";  // Default to file.pdf if fileName is undefined
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16">
      <div className="bg-white w-full max-w-6xl flex flex-wrap gap-20">
        {/* Left Section: Request Details */}
        <div className="flex-1 min-w-[300px]">
          <h1 className="text-3xl font-semibold mb-4 text-black">Request Details</h1>
          <div className="mb-6 text-black p-4">
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request ID:</strong>
              <span className="w-2/3 text-left">{request.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request Date:</strong>
              <span className="w-2/3 text-left">
                <FaCalendarAlt className="inline-block mr-1 text-primary" />
                {request.date}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request Type:</strong>
              <span className="flex items-center w-2/3 text-left">
                <FaFileAlt className="inline-block mr-1 text-green-500" />
                {request.type}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <strong className="w-1/3">Request Status:</strong>
              <span className={`w-2/3 text-left ${request.status === "Requested" ? "text-blue-600" : ""}`}>
                {request.status}
              </span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6 text-black">Request Documents</h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-md mt-2 space-y-3">
          {request.files &&
              Object.entries(request.files).map(([name, url], idx) => {
                const displayName = name.endsWith(".pdf") ? name : `${name}.pdf`;

    return (
      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="text-black capitalize">{displayName.replace(/([A-Z])/g, " $1")}</span>
        <div className="flex items-center">
        <FaEye
                        className="text-blue-600 cursor-pointer mr-3"
                        onClick={() => handleView(url)}
                        title="View"
                      />
                      <FaDownload
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleDownload(url, displayName)}
                        title="Download"
                      />
        </div>
      </div>
    );
  })}


          </div>
        </div>

        {/* Right Section: Services */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-3xl font-semibold mb-3 text-black">Request Service</h2>
          {request.services ? (
            request.services.map((service, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-black">{service.category}</h3>
                <p className="text-black text-sm">{service.subCategory}</p>
                <ul className="mt-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b py-2">
                      <span className="text-black">{item.name}</span>
                      <span className="text-black font-medium">{item.cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-black">No services listed for this request.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
