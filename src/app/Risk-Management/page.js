"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter();

  const [selectedCards, setSelectedCards] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleSelect = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert("File too large. Max 5MB allowed.");
    }
  };

  const handleSubmit = () => {
    const selectedServices = selectedCards.map((id) => {
      const card = riskCards.find((c) => c.id === id);
      return {
        name: card?.title || "",
        cost:
          (card?.description.match(/(\d[\d,]*) ETB/i) || [])[1] || "Unknown",
      };
    });

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileBase64 = reader.result;

        const newRequest = {
          id: `REG/${Math.floor(100000 + Math.random() * 900000)}`,
          companyName: "Adama Science and Technology University",
          date: new Date().toISOString().split("T")[0],
          type: "Project",
          status: "Requested",
          services: [
            {
              category: "Cyber Security Risk Management",
              subCategory: "Selected Items",
              items: selectedServices,
            },
          ],
          files: {
            [uploadedFile.name]: fileBase64,
          },
        };

        const existing = JSON.parse(localStorage.getItem("requests") || "[]");
        const updatedRequests = [...existing, newRequest].slice(-20);
        localStorage.setItem("requests", JSON.stringify(updatedRequests));
        companyName: localStorage.getItem("companyName") || "Unknown Company",

        alert("Form submitted!");
        router.push("/Requests");
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      alert("Please upload a file before submitting.");
    }
  };

  const riskCards = [
    {
      id: 0,
      section: "Cyber Security Risk Assessment",
      title: "Strategic Level Cyber Security Risk Assessment",
      description:
        "Identifies strategic risks across financial, technical, and organizational dimensions. Helps leadership plan effectively and mitigate long-term threats. For a project costing up to 1,500,000 ETB.",
      image: "/role.png",
    },
    {
      id: 1,
      section: "Cyber Security Risk Assessment",
      title: "Tactical Level Risk Assessment",
      description:
        "Assesses tactical execution risks, bridging the gap between strategy and operations. Focuses on budgetary impact, team execution, and deliverable clarity. Costing up to 1,700,000 ETB.",
      image: "/security.png",
    },
    {
      id: 2,
      section: "Cyber Security Risk Assessment",
      title: "Operational Level Risk Assessment",
      description:
        "Targets daily risks including process flaws, resource allocation, and delivery pipelines. Ensures resilient project operations. For a project costing up to 1,900,000 ETB.",
      image: "/consulting.png",
    },
    {
      id: 3,
      section: "Cyber Security Risk Assessment",
      title: "CS Awareness & Cultural Assessment",
      description:
        "Analyzes employee awareness and attitudes toward cybersecurity, helping align culture with policy. Promotes organization-wide digital safety.For a project costing up to 1,500,000 ETB.",
      image: "/security-policy.png",
    },
    {
      id: 4,
      section: "Cyber Security Risk Template",
      title: "Asset Management Template",
      description:
        "Ensures proper cataloging, tracking, and risk profiling of IT assets across departments. Strengthens visibility and control. For a project costing up to 1,300,000 ETB.",
      image: "/role.png",
    },
    {
      id: 5,
      section: "Cyber Security Risk Template",
      title: "Risk Monitoring Dashboard",
      description:
        "Examines technical vulnerabilities in systems and networks with targeted mitigation plans. Supports incident prevention. Costing up to 1,800,000 ETB.",
      image: "/security.png",
    },
    {
      id: 6,
      section: "Cyber Security Risk Template",
      title: "Cyber Security Risk Register Template ",
      description:
        "Focuses on IT support processes and everyday system risks. Ensures continuity and compliance. Costing up to 800,000 ETB.",
      image: "/consulting.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center py-6 w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Cyber Security Risk Management
        </h1>

        {["Cyber Security Risk Assessment", "Cyber Security Risk Template"].map((section) => (
          <div key={section} className="w-full">
            <h2 className="text-xl font-bold mt-4 mb-4 text-center text-gray-800 border-b pb-2">
              {section === "Cyber Security Risk Management"
                ? "Cyber Security Risk Assessment"
                : "Cyber Security Risk Template" }
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
              {riskCards
                .filter((card) => card.section === section)
                .map((card) => {
                  const costMatch = card.description.match(
                    /up to ([\d,]+ ETB)/i
                  );
                  const cost = costMatch ? costMatch[1] : null;
                  const cleanDescription = card.description.replace(
                    /(for a project )?costing up to [\d,]+ ETB\.?/i,
                    ""
                  );

                  return (
                    <div
                      key={card.id}
                      className={`rounded-xl shadow-md p-4 flex flex-col items-center bg-white transition-transform duration-300 transform hover:scale-105 ${
                        selectedCards.includes(card.id)
                          ? "border-2 border-green-500"
                          : ""
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 bg-white border-gray-300 shadow">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-center text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-gray-700 text-sm text-center mb-2 leading-relaxed">
                        {cleanDescription}
                      </p>
                      {cost && (
                        <div className="text-green-700 italic font-medium text-sm mb-3">
                          Estimated Cost: {cost}
                        </div>
                      )}
                      <button
                        className={`py-1.5 px-4 rounded-lg ${
                          selectedCards.includes(card.id)
                            ? "bg-green-600"
                            : "bg-blue-600"
                        } text-white hover:bg-opacity-80 transition duration-200 text-sm`}
                        onClick={() => handleSelect(card.id)}
                      >
                        {selectedCards.includes(card.id)
                          ? "Selected"
                          : "Select"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
{/* File Upload & Submit */}
<div className="bg-white rounded-lg shadow-lg p-6 mt-10 w-full max-w-2xl ml-4 md:mr-auto md:mr-8 px-4">
  <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center md:text-left">
    Request Form
  </h2>

  <div className="w-full">
    <div className="flex flex-col items-center md:items-start w-full">
      <label className="font-semibold text-gray-800 mb-2 text-center md:text-left">
        Attach your letter or any additional documents:
      </label>
      <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50 w-full">
        <p className="mb-2 text-gray-700">
          Drag & drop your files here or
        </p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload">
          <span className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-200 inline-block">
            Browse Files
          </span>
        </label>
        <p className="mt-2 text-gray-500">
          Upload Request Letter (PDF format, up to 5MB)
        </p>
        {uploadedFile && (
          <p className="mt-2 text-green-600">
            Uploaded: {uploadedFile.name}
          </p>
        )}
      </div>
    </div>
  </div>

  <div className="flex justify-between mt-6">
    <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">
      Cancel
    </button>
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default View;
