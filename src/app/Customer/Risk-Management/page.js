"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/riskmanagement", {
          credentials: "include",
        });
        if (!res.ok) {
          router.push("/signin");
          return;
        }
        const data = await res.json();
        setCurrentUserId(data._id);
      } catch (err) {
        console.error("Auth check failed", err);
        router.push("/signin");
      }
    };

    fetchUser();
  }, [router]);




 const riskCards = [
    {
      id: 0,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Strategic Level Cyber Security Risk Assessment",
      description:
        "Identifies strategic risks across financial, technical, and organizational dimensions. Helps leadership plan effectively and mitigate long-term threats. Cost: up to 1,500,000 ETB.",
      image: "/0.png",
    },
    {
      id: 1,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Tactical Level Risk Assessment",
      description:
      "Evaluates tactical risks impacting project execution and resource allocation. Enables managers to adapt strategies and optimize operational effectiveness. Cost: up to 1,700,000 ETB.",
      image: "/1.png",
    },
    {
      id: 2,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Operational Level Risk Assessment",
      description:
      "Focuses on daily operational risks, identifying vulnerabilities and inefficiencies. Supports frontline teams in preventing incidents and maintaining smooth operations. Cost: up to 1,900,000 ETB.",
      image: "/2.png",
    },
    {
      id: 3,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "CS Awareness & Cultural Assessment",
      description:
      "Analyzes staff awareness and organizational culture towards security practices. Aids in improving training programs and fostering risk-aware behaviors. Cost: up to 1,500,000 ETB.",
      image: "/3.png",
    },
    {
      id: 4,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Asset Management Template",
      description:
      "Tracks and profiles critical assets to ensure accurate inventory and protection. Supports efficient resource management and loss prevention efforts. Cost: up to 1,300,000 ETB.",
      image: "/4.png",
    },
    {
      id: 5,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Risk Monitoring Dashboard",
      description:
      "Monitors vulnerabilities and risk indicators continuously for timely detection. Provides real-time insights to help prioritize mitigation actions. Cost: up to 1,800,000 ETB.",
      image: "/5.png",
    },
    {
      id: 6,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Cyber Security Risk Register Template",
      description:
      "Maintains records of risks to support compliance and business continuity. Facilitates systematic risk tracking and mitigation planning. Cost: up to 800,000 ETB.",
      image: "/6.png",
    },
  ];

  useEffect(() => {
    localStorage.setItem("riskCards", JSON.stringify(riskCards));
  }, []);

  const handleSelect = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert("File too large. Max 5MB allowed.");
    }
  };

 

    const selectedData = selectedCards.map((id) => {
      const card = riskCards.find((c) => c.id === id);
      const costMatch = card?.description.match(/up to ([\d,]+ ETB)/i);
      return {
        mainTitle: card?.mainTitle || "",
        category: card?.section || "",
        subCategory: card?.title || "",
        item: { name: card?.title || "", cost: costMatch ? costMatch[1] : "Unknown" },
        id,
      };
    });

    const grouped = {};
    selectedData.forEach(({ mainTitle, category, subCategory, item }) => {
      const key = `${mainTitle}||${category}||${subCategory}`;
      if (!grouped[key]) grouped[key] = { mainTitle, category, subCategory, items: [] };
      grouped[key].items.push(item);
    });

    const services = Object.values(grouped);
 
const handleSubmit = async () => {
  if (!uploadedFile) {
    alert("Please upload a file before submitting.");
    return;
  }

const requestId = `GRC/${Math.floor(100000 + Math.random() * 900000)}`;
console.log("🧾 Generated Request ID:", requestId); // <--- ADD THIS

  const formData = new FormData();

  formData.append("userId", currentUserId);
  formData.append("requestId", requestId);
  formData.append("companyName", localStorage.getItem("companyName"));
  formData.append("date", new Date().toISOString().split("T")[0]);
  formData.append("type", "Project");
  formData.append("status", "Requested");
  formData.append("services", JSON.stringify(selectedCards));

  formData.append("file1", uploadedFile);
localStorage.setItem("currentUserId", data._id);

  try {
    const response = await axios.post("http://localhost:5000/api/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    console.log("Upload response:", response.data);
    alert("Form submitted!");
   
         localStorage.setItem("lastSubmittedRequestId", requestId);
    router.push("/Customer/Requests?id=" + encodeURIComponent(requestId));

    // >>> Your additional logic goes here <<<
    // Example: Logging the submitted requestId to localStorage
    localStorage.setItem("lastSubmittedRequestId", requestId);

  } catch (error) {
    console.error("Upload failed:", error);
    alert("Something went wrong. Please try again later.");
  }
};





  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center py-6 w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Cyber Security Risk Management
        </h1>

        {["Cyber Security Risk Assessment", "Cyber Security Risk Template"].map((section) => (
          <div key={section} className="w-full">
            <h2 className="text-xl font-bold mt-4 mb-4 text-center text-gray-800 border-b pb-2">
              {section}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
              {riskCards
                .filter((card) => card.section === section)
                .map((card) => {
                  const costMatch = card.description.match(/up to ([\d,]+ ETB)/i);
                  const cost = costMatch ? costMatch[1] : null;
                  const cleanDescription = card.description.replace(/(for a project )?cost(ing)? up to [\d,]+ ETB\.?/i, "");

                  return (
                    <div
                      key={card.id}
                      className={`rounded-xl shadow-md p-4 flex flex-col items-center bg-white transition-transform duration-300 transform hover:scale-105 ${
                        selectedCards.includes(card.id) ? "border-2 border-green-500" : ""
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 bg-white border-gray-300 shadow">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-center text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-gray-700 text-sm text-center mb-2 leading-relaxed">
                        {cleanDescription}
                      </p>
                      {cost && (
                        <div className="text-green-700 italic font-medium text-sm mb-3">
                          Estimated Cost is Up to: {cost}
                        </div>
                      )}
                      <button
                        className={`py-1.5 px-4 rounded-lg ${
                          selectedCards.includes(card.id) ? "bg-green-600" : "bg-blue-600"
                        } text-white hover:bg-opacity-80 transition duration-200 text-sm`}
                        onClick={() => handleSelect(card.id)}
                      >
                        {selectedCards.includes(card.id) ? "Selected" : "Select"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-lg p-6 mt-10 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center md:text-left">
            Request Form
          </h2>
          <div className="w-full">
            <div className="flex flex-col items-center md:items-start w-full">
              <label className="font-semibold text-gray-800 mb-2 text-center md:text-left">
                Attach your letter or any additional documents:
              </label>
              <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50 w-full">
                <p className="mb-2 text-gray-700">Drag & drop your files here or</p>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="fileUpload" />
                <label htmlFor="fileUpload">
                  <span className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-200 inline-block">
                    Browse Files
                  </span>
                </label>
                <p className="mt-2 text-gray-500">Upload Request Letter (PDF format, up to 5MB)</p>
                {uploadedFile && (
                  <p className="mt-2 text-green-600">Uploaded: {uploadedFile.name}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
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
