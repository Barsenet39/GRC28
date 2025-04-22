"use client"; // Required for interactive client-side components

import { useRouter } from "next/navigation";
import { useState } from "react";

const View = () => {
  const router = useRouter();
  const services = [
    {
      id: 0,
      name: "Strategic Level Risk Assessment (SLRA)",
      cost: "Up to 1,500,000 ETB",
      image: "/role.png"
    },
    {
      id: 1,
      name: "Tactical Level Risk Assessment (TLRA)",
      cost: "Up to 1,700,000 ETB",
      image: "/security.png"
    },
    {
      id: 2,
      name: "Operational Level Risk Assessment (OLRA)",
      cost: "Up to 900,000 ETB",
      image: "/consulting.png"
    },
    {
      id: 3,
      name: "CS Awareness & Cultural Assessment",
      cost: "Up to 1,500,000 ETB",
      image: "/security-policy.png"
    }
  ];
  const [selectedServices, setSelectedServices] = useState([]); // comes too late
  const [selectedCards, setSelectedCards] = useState([]);
  const isSelected = selectedServices.some((s) => s.id === service.id);

  const handleSelect = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  
  const [uploadedFile, setUploadedFile] = useState(null);

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
        cost: (card?.description.match(/(\d[\d,]*) ETB/) || [])[1] || "Unknown",
      };
    });
  
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileBase64 = reader.result;
  
        const newRequest = {
          id: `REG/${Math.floor(100000 + Math.random() * 900000)}`,
          companyName: "Adama Science and Technology University",
          date: new Date().toISOString().split('T')[0],
          type: "Project",
          status: "Requested",
          services: [
            {
              category: "Cyber Security Risk Assessment",
              subCategory: "Selected Items",
              items: selectedServices,
            }
          ],
          files: {
            [uploadedFile.name]: fileBase64
          }
        };
  
        const existing = JSON.parse(localStorage.getItem("requests") || "[]");
        const updatedRequests = [...existing, newRequest].slice(-20); // keep only last 20

        localStorage.setItem("requests", JSON.stringify(updatedRequests));
  
        alert("Form submitted!");
        router.push('/status');
      };
      reader.readAsDataURL(uploadedFile); // Convert file to base64
    } else {
      alert("Please upload a file before submitting.");
    }
  };
  
  
  const riskCards = [
    // General Risk Assessments
    {
      id: 0,
      section: 'General',
      title: 'Strategic Level Risk Assessment (SLRA)',
      description:
        'Identifies financial, operational, and technical risks, ensuring mitigation strategies for successful execution. For a project costing up to 1,500,000 ETB.',
      image: '/role.png',
    },
    {
      id: 1,
      section: 'General',
      title: 'Tactical Level Risk Assessment (TLRA)',
      description:
        'Evaluates operational, technical, and financial risks for a project, focusing on mitigation strategies. Costing up to 1,700,000 ETB.',
      image: '/security.png',
    },
    {
      id: 2,
      section: 'General',
      title: 'Operational Level Risk Assessment (OLRA)',
      description:
        'Analyzes process, resource, and execution risks, ensuring efficiency through proactive mitigation strategies. For a project costing up to 900,000 ETB.',
      image: '/consulting.png',
    },
    {
      id: 3,
      section: 'General',
      title: 'CS Awareness & Cultural Assessment',
      description:
        'Evaluates organizational cybersecurity awareness and culture to identify gaps and implement strategic improvements.',
      image: '/security-policy.png',
    },
    // Cyber Security Risk Assessments
    {
      id: 4,
      section: 'Cyber',
      title: 'Asset Management Template (AMT)',
      description:
        'Ensures all IT assets are properly catalogued, tracked, and managed to reduce exposure and risks. For a project costing up to 1,500,000 ETB.',
      image: '/role.png',
    },
    {
      id: 5,
      section: 'Cyber',
      title: 'Tactical Level Risk Assessment (TLRA)',
      description:
        'Assesses risks to IT systems and networks to ensure protection and continuity. Costing up to 1,500,000 ETB.',
      image: '/security.png',
    },
    {
      id: 6,
      section: 'Cyber',
      title: 'Operational Level Risk Assessment (OLRA)',
      description:
        'Focuses on IT operational procedures and vulnerabilities for continuous risk mitigation. Costing up to 1,500,000 ETB.',
      image: '/consulting.png',
    },
  ];
  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
  {/* Main Content */}
  <div className="flex flex-col items-center justify-center py-8 w-full">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cyber Security Risk Management</h1>

    {/* Category Sections */}
    {['General', 'Cyber'].map((section) => (
      <div key={section} className="w-full">
        <h2 className="text-2xl font-bold mt-12 mb-6 text-center text-gray-800 border-b pb-2">
          {section === 'General' ? 'General Risk Assessment' : 'Cyber Security Risk Assessment'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          {riskCards
            .filter((card) => card.section === section)
            .map((card) => (
              <div
                key={card.id}
                className={`rounded-lg shadow-lg p-6 flex flex-col justify-between w-full transition-all duration-300 ${
                  selectedCards.includes(card.id) ? 'border-2 border-green-500 bg-green-50' : 'bg-gray-100'
                }`}
              >
                <div>
                  <img src={card.image} alt={card.title} className="mb-4 rounded" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{card.title}</h3>
                  <p className="mb-4 text-gray-700">{card.description}</p>
                </div>
                <button
                  className={`py-2 px-4 rounded ${
                    selectedCards.includes(card.id) ? 'bg-green-600' : 'bg-blue-600'
                  } text-white hover:bg-blue-700 transition duration-200`}
                  onClick={() => handleSelect(card.id)}
                >
                  {selectedCards.includes(card.id) ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
        </div>
      </div>
    ))}

    {/* Request Form Section */}
    <div className="bg-white rounded-lg shadow-lg p-8 mt-12 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Request Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* File Upload Area */}
        <div className="flex flex-col items-center w-full">
          <label className="font-semibold text-gray-800 mb-2 text-center">
            Attach your letter or any additional documents:
          </label>
          <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50 w-full">
            <p className="mb-2 text-gray-700">Drag & drop your files here or</p>

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

            <p className="mt-2 text-gray-500">Upload Request Letter (PDF format, up to 5MB)</p>
            {uploadedFile && <p className="mt-2 text-green-600">Uploaded: {uploadedFile.name}</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default View;