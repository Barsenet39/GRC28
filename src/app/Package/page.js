"use client"; // Required for interactive client-side components

import { useState } from "react";

const View = () => {
  const [letterFile, setLetterFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile, type);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile, type);
  };

  const validateFile = (file, type) => {
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        if (type === "letter") setLetterFile(null);
        else if (type === "project") setProjectFile(null);
      } else if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        setError("File size must be less than 5 MB.");
        if (type === "letter") setLetterFile(null);
        else if (type === "project") setProjectFile(null);
      } else {
        setError("");
        if (type === "letter") setLetterFile(file);
        else if (type === "project") setProjectFile(file);
      }
    }
  };

  const handleUpload = () => {
    if (!letterFile && !projectFile) {
      setError("Please upload at least one file.");
      return;
    }
  
    const files = {};
    if (letterFile) files[letterFile.name] = URL.createObjectURL(letterFile);
    if (projectFile) files[projectFile.name] = URL.createObjectURL(projectFile);

    const isReview = true; // Set true because this comes from "Technical Support"

    const newRequest = {
      id: `GOV/${Math.floor(Math.random() * 1000000)}`,
      companyName: "Adama Science and Technology University",
      date: new Date().toISOString().split("T")[0],
      type: isReview ? "Review" : "Project",
      status: "Requested",
      files,
      ...(isReview
        ? {} // No services at all if Review
        : {
            services: [
              {
                category: "Cyber Security Risk Management Service",
                subCategory: "Governance Document Development",
                items: [
                  {
                    name: "Strategic Level Risk Assessment",
                    cost: "Up to 1,500,000"
                  }
                ]
              }
            ]
          }),
    };
 
    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    storedRequests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(storedRequests));
  
    setModalOpen(false);
    setLetterFile(null);
    setProjectFile(null);
    console.log("✅ Request saved to localStorage:", newRequest);
  };

  const serviceMappings = {
    CSRM: [
      {
        category: "Cyber Security Risk Management Service",
        subCategory: "Governance Document Development",
        items: [
          {
            name: "Strategic Level Risk Assessment",
            cost: "Up to 1,500,000"
          }
        ]
      }
    ],
    CSM: [
      {
        category: "Cyber Security Management Service",
        subCategory: "Security Policy Enforcement",
        items: [
          {
            name: "Security Protocol Implementation",
            cost: "Up to 1,200,000"
          }
        ]
      }
    ],
    Both: [
      {
        category: "Cyber Security Risk Management Service",
        subCategory: "Governance Document Development",
        items: [
          {
            name: "Strategic Level Risk Assessment",
            cost: "Up to 1,500,000"
          }
        ]
      },
      {
        category: "Cyber Security Management Service",
        subCategory: "Security Policy Enforcement",
        items: [
          {
            name: "Security Protocol Implementation",
            cost: "Up to 1,200,000"
          }
        ]
      }
    ]
  };
  

  const handleProjectSelection = (categoryKey) => {
    const selectedServices = serviceMappings[categoryKey];
  
    const newRequest = {
      id: `GOV/${Math.floor(Math.random() * 1000000)}`,
      companyName: "Adama Science and Technology University",
      date: new Date().toISOString().split("T")[0],
      type: "Project", // different from Review
      status: "Requested",
      services: selectedServices,
      files: {} // No file upload for Project flow
    };
  
    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    storedRequests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(storedRequests));
  
    console.log("📦 Project request saved:", newRequest);
    window.location.href = "/service-selection"; // Change to your actual route
  };
  

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
      {/* Technical Support Section */}
      <h1 className="text-3xl font-semibold text-center mb-0 mt-6 text-black">Select Your Package</h1>
      <div className="container mx-auto p-6 mt-8 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-black">Technical Support</h2>
          <p className="mb-4 text-gray-700">
            If you've completed your project or document and only need our technical support for a final review, simply upload your files. Choose the support option that best fits your needs, and we'll take care of the rest!
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex justify-center items-center text-white bg-blue-600 py-2 px-4 rounded shadow-md hover:bg-blue-700 transition duration-200"
          >
            Upload your files here
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src="/upload.png" // Replace with your image URL
            alt="Technical Support"
            className="w-full h-auto object-cover rounded-lg "
          />
        </div>
      </div>

      {/* Modal for file upload */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-2xl transition transform duration-300">
            <h3 className="text-lg font-semibold mb-4 text-black">Upload Your Letter and Project</h3>

            {/* Upload your letter */}
            <label className="block mb-2 text-black">Upload your letter:</label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => handleDrop(e, "letter")}
              className={`border-2 ${dragging ? 'border-blue-500' : 'border-gray-300'} 
                          p-4 mb-4 rounded text-black text-center transition duration-200 
                          ${dragging ? 'bg-blue-100' : 'bg-white'} 
                          cursor-pointer`}
              onClick={() => document.getElementById('letterInput').click()}
            >
              {letterFile ? (
                <p className="font-bold">{letterFile.name}</p> // Show file name in bold
              ) : (
                <p className="text-gray-400">Drag and drop your letter file here or click to upload</p>
              )}
              <input
                type="file"
                id="letterInput"
                onChange={(e) => handleFileChange(e, "letter")}
                className="hidden"
              />
            </div>

            {/* Upload your project */}
            <label className="block mb-2 text-black">Upload your project:</label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => handleDrop(e, "project")}
              className={`border-2 ${dragging ? 'border-blue-500' : 'border-gray-300'} 
                          p-4 mb-4 rounded text-black text-center transition duration-200 
                          ${dragging ? 'bg-blue-100' : 'bg-white'} 
                          cursor-pointer`}
              onClick={() => document.getElementById('projectInput').click()}
            >
              {projectFile ? (
                <p className="font-bold">{projectFile.name}</p> // Show file name in bold
              ) : (
                <p className="text-gray-400">Drag and drop your project file here or click to upload</p>
              )}
              <input
                type="file"
                id="projectInput"
                onChange={(e) => handleFileChange(e, "project")}
                className="hidden"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    {/* Package Card 1 - CSRM */}
<div
  onClick={() => {
    handleProjectSelection("CSRM");
    window.location.href = "/Risk-Management";
  }}
  className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
>
  <h3 className="text-xl font-bold mb-2 text-black">Cyber Security Risk Management</h3>
  <p className="mb-4 text-gray-700">
    Dedicated to identifying and assessing potential cyber risks, this division implements strategies to minimize vulnerabilities and protect digital assets, ensuring your organization is resilient to cyber threats.
  </p>
  <p className="text-blue-600 font-semibold text-center">Click to Submit & View Details</p>
</div>

{/* Package Card 2 - CSM */}
<div
  onClick={() => {
    handleProjectSelection("CSM");
    window.location.href = "/Management-Division";
  }}
  className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
>
  <h3 className="text-xl font-bold mb-2 text-black">Cyber Security Management</h3>
  <p className="mb-4 text-gray-700">
    Responsible for the overall management of the organization's cybersecurity framework, this division develops policies, enforces security protocols, and monitors systems to safeguard your assets.
  </p>
  <p className="text-blue-600 font-semibold text-center">Click to Submit & View Details</p>
</div>

{/* Package Card 3 - Both */}
<div
  onClick={() => {
    handleProjectSelection("Both");
    window.location.href = "/both";
  }}
  className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
>
  <h3 className="text-xl font-bold mb-2 text-black">Both (CSRM and CSM)</h3>
  <p className="mb-4 text-gray-700">
    Combining both divisions, this package offers a comprehensive approach to cybersecurity, ensuring that both risk management and security management are addressed holistically.
  </p>
  <p className="text-blue-600 font-semibold text-center">Click to Submit & View Details</p>
</div>


      <footer className="text-black text-center p-0 m-0">
        <p>&copy;2025 Information Network Security Administration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default View;