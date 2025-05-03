"use client"; // Required for interactive client-side components

import { useState } from "react";

const View = () => {
  const [letterFile, setLetterFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false); // Define successMessage state

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
    // Check if no files are uploaded
    if (!letterFile && !projectFile) {
      setError("Please upload at least one file.");
      return;
    }
  

    setError(""); // Clear any error messages if files are present
    setSuccessMessage(true); // Show success message
 
    // Prepare files to be stored
    const files = {};
    if (letterFile) files[letterFile.name] = URL.createObjectURL(letterFile);
    if (projectFile) files[projectFile.name] = URL.createObjectURL(projectFile);
  
    // Simulate "Review" request type
    const isReview = true;
  
    // Prepare the request data
    const newRequest = {
      id: `GOV/${Math.floor(Math.random() * 1000000)}`, // Unique ID
      companyName: "Adama Science and Technology University",
      date: new Date().toISOString().split("T")[0], // Current date
      type: isReview ? "Review" : "Project",
      status: "Requested",
      files, // Attach uploaded files
      ...(isReview
        ? {} // No services if it's a "Review"
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
  
    // Retrieve existing requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
  
    // Add the new request to the list of stored requests
    storedRequests.push(newRequest);
  
    // Save the updated list back to localStorage
    localStorage.setItem("requests", JSON.stringify(storedRequests));
  
    // Reset modal and file inputs
   // setModalOpen(false);
    setLetterFile(null);
    setProjectFile(null);
  
    console.log("✅ Request saved to localStorage:", newRequest);
  };
  
  // Cancel button click handler
const handleCloseModal = () => {
  setModalOpen(false);
  setSuccessMessage(false); // Optionally hide success message on close
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
<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 md:mt-8 leading-tight text-center md:text-left">
  Select <span className="text-blue-600">Your Package</span>
</h1>


<section className="bg-gradient-to-b from-white to-blue-50 py-22 mt-8">
  <div className="container mx-auto px-8 max-w-6xl flex flex-col md:flex-row items-center gap-12">

    {/* Text Section */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Technical Support on Finished Project
      </h2> 
      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
        Already completed your project or letter? You're just a step away from technical refinement. 
        Upload both your letter and project files using the button below — and our team will review and support your work with care and precision.
      </p>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all ease-in-out transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
        </svg>
        Upload Letter & Project
      </button>
    </div>

    {/* Image Section */}
    <div className="md:w-1/2">
      <img
        src="/upload1.png"
        alt="Technical Support Illustration"
        className="w-full animate-rotateY"
      />
    </div>

  </div>

  {/* Modal */}
  {modalOpen && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 relative animate-fadeInUp transition-all ease-in-out transform">

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 bg-green-100 text-green-700 p-6 rounded-lg text-center shadow-xl">
            <p className="font-medium text-xl">Thank you! Your files were successfully uploaded!</p>
            <p className="mt-2 text-lg">We will review your request and get back to you within a few days. Please check the status of your request periodically.</p>
          </div>
        )}

        <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Upload Your Letter & Project
        </h3>

        {/* Letter Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Letter File</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => handleDrop(e, "letter")}
            onClick={() => document.getElementById('letterInput').click()}
            className={`border-2 rounded-xl p-6 mb-6 text-center cursor-pointer transition-all 
              ${dragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'} 
              hover:shadow-xl hover:border-blue-400`}
          >
            <p className="text-gray-600">
              {letterFile ? <span className="font-medium text-gray-800">{letterFile.name}</span> : "Drag & drop or click to upload your letter"}
            </p>
            <input
              type="file"
              id="letterInput"
              onChange={(e) => handleFileChange(e, "letter")}
              className="hidden"
            />
          </div>
        </div>

        {/* Project Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Project File</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => handleDrop(e, "project")}
            onClick={() => document.getElementById('projectInput').click()}
            className={`border-2 rounded-xl p-6 mb-6 text-center cursor-pointer transition-all 
              ${dragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'} 
              hover:shadow-xl hover:border-blue-400`}
          >
            <p className="text-gray-600">
              {projectFile ? <span className="font-medium text-gray-800">{projectFile.name}</span> : "Drag & drop or click to upload your project"}
            </p>
            <input
              type="file"
              id="projectInput"
              onChange={(e) => handleFileChange(e, "project")}
              className="hidden"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 mt-8">
          <button
            onClick={handleCloseModal}
            className="px-6 py-3 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition-all ease-in-out transform"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-7 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all ease-in-out transform"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )}

</section>




<section className="py-10 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4 max-w-6xl">

    <h2 className="text-3xl font-bold text-gray-800 mb-4"> Project Packages</h2>
    <p className="text-gray-600 mb-10 text-sm leading-relaxed">
  Select the cybersecurity package that aligns with your company’s vision. <br />
  Choose based on your infrastructure, goals, and digital direction. <br />
  Each option is crafted to elevate your protection and resilience. <br />
  Let us guide you to the package that fits your future best.
</p>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Shared Card Styles */}
  {[
    {
      title: "Cyber Security Risk Management",
      description:
        "Ideal for teams focused on identifying threats before they strike. Ideal for teams focused on identifying threats before they strike, Analyze risks and secure your digital assets from unseen vulnerabilities.",
      route: "/Risk-Management",
      key: "CSRM"
    },
    {
      title: "Cyber Security Management",
      description:
        "Perfect for structured teams. Create and enforce policies, manage systems, and build a stable cybersecurity environment. Create and enforce policies, manage systems, and build a stable cybersecurity environment. ",
      route: "/Management-Division",
      key: "CSM"
    },
    {
      title: "Both Cyber Security Risk Management and Cyber Security Management",
      description:
        "For visionary organizations: get both strategic and operational security — a full suite of solutions in one unified package.",
      route: "/both",
      key: "Both"
    }
  ].map(({ title, description, route, key }) => (
    <div
      key={key}
      onClick={() => {
        handleProjectSelection(key);
        window.location.href = route;
      }}
      className="flex flex-col justify-between bg-white rounded-2xl border-t-4 border-blue-600 shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
      </div>
      <p className="text-blue-600 font-medium text-sm text-center mt-auto">Discover & Apply</p>
    </div>
  ))}
</div>

  </div>
</section>



      <footer className="text-black text-center p-0 m-0">
        <p>&copy;2025 Information Network Security Administration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default View;