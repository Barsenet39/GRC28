"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from 'axios';

const View = () => {
  const router = useRouter();
  useEffect(() => {
    fetch('http://localhost:5000/api/riskmanagement', {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 401) {
          router.push('/signin');
        }
      })
      .catch((err) => {
        console.error('Auth check failed', err);
        router.push('/signin');
      });
  }, []);
  
    const [selectedFile, setSelectedFile] = useState(null);

  const [selectedCards, setSelectedCards] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
 
  const riskCards = [
    {
      id: 7,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Roles and Responsibilities for Management, Risk Communication and Mitigation Document",
      description: "Defines governance roles. Cost: up to 500,000 ETB.",
      image: "/7.png",
    },
    {
      id: 8,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Risk Quantification Document",
      description: "Quantifies risks. Cost: up to 1,200,000 ETB.",
      image: "/8.png",
    },
    {
      id: 9,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Strategy Document Development",
      description: "Outlines goals. Cost: up to 2,200,000 ETB.",
      image: "/9.png",
    },
    {
      id: 10,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Governance System Document",
      description: "Establishes governance framework. Cost: up to 1,500,000 ETB.",
      image: "/10.png",
    },
    {
      id: 11,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Organization Cyber Security Roadmap Document",
      description: "Timeline for initiatives. Cost: up to 2,200,000 ETB.",
      image: "/11.png",
    },
    {
      id: 12,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Corporate Cyber Security Policy Document",
      description: "Defines principles. Cost: up to 2,000,000 ETB.",
      image: "/12.png",
    },
    {
      id: 13,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Standards Document",
      description: "Ensures consistency. Cost: up to 2,600,000 ETB.",
      image: "/13.png",
    },
    {
      id: 14,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Programs Document",
      description: "Details initiatives. Cost: up to 2,200,000 ETB.",
      image: "/14.png",
    },
    {
      id: 15,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Issue Specific Policy Document",
      description: "Covers specific threats. Cost: up to 2,100,000 ETB.",
      image: "/15.png",
    },
    {
      id: 16,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security System Specific Policy Document",
      description: "Tailored policies. Cost: up to 1,200,000 ETB.",
      image: "/16.png",
    },
    {
      id: 17,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Processes and Procedures Document",
      description: "Documents procedures. Cost: up to 2,000,000 ETB.",
      image: "/17.png",
    },
  ];

  // Store riskCards in localStorage on mount
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

const handleSubmit = async () => {
  if (!uploadedFile) {
    alert("Please upload a file before submitting.");
    return;
  }

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


  
  const requestId = `GRC/${Math.floor(100000 + Math.random() * 900000)}`;

  const formData = new FormData();
  formData.append("requestId", requestId);
  formData.append("companyName", localStorage.getItem("companyName") || "Adama Science and Technology University");
  formData.append("date", new Date().toISOString().split("T")[0]);
  formData.append("type", "Project");
  formData.append("status", "Requested");
  formData.append("services", JSON.stringify(services));
formData.append("file1", uploadedFile);



  try {
    const response = await axios.post('http://localhost:5000/api/uploads', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    console.log("Upload response:", response.data);

    alert("Form submitted!");
    router.push("/Requests?id=" + encodeURIComponent(requestId));
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Something went wrong. Please try again later.");
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center py-6 w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Cyber Security Management
        </h1>

        <div className="w-full">
          <h2 className="text-xl font-bold mt-4 mb-4 text-center text-gray-800 border-b pb-2">
            Governance Document Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {riskCards.map((card) => {
              const costMatch = card.description.match(/up to ([\d,]+ ETB)/i);
              const cost = costMatch ? costMatch[1] : null;
              const cleanDescription = card.description.replace(
                /(for a project )?cost(ing)? up to [\d,]+ ETB\.?/i,
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
                      Estimated Cost is Up to: {cost}
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
                    {selectedCards.includes(card.id) ? "Selected" : "Select"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload and Submit */}
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
