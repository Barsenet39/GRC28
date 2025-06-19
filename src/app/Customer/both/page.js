"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

const View = () => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');



  const riskCards = [
    {
      id: 0,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Strategic Level Cyber Security Risk Assessment",
      description: "Identifies strategic risks across financial, technical, and organizational dimensions.",
      cost: "1,500,000 ETB",
      image: "/0.png",
    },
    {
      id: 1,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Tactical Level Risk Assessment",
      description: "Assesses tactical execution risks.",
      cost: "1,700,000 ETB",
      image: "/1.png",
    },
    {
      id: 2,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "Operational Level Risk Assessment",
      description: "Targets daily risks.",
      cost: "1,900,000 ETB",
      image: "/2.png",
    },
    {
      id: 3,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Assessment",
      title: "CS Awareness & Cultural Assessment",
      description: "Analyzes awareness and attitudes.",
      cost: "1,500,000 ETB",
      image: "/3.png",
    },
    {
      id: 4,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Asset Management Template",
      description: "Ensures asset tracking and profiling.",
      cost: "1,300,000 ETB",
      image: "/4.png",
    },
    {
      id: 5,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Risk Monitoring Dashboard",
      description: "Examines vulnerabilities.",
      cost: "1,800,000 ETB",
      image: "/5.png",
    },
    {
      id: 6,
      mainTitle: "CYBER SECURITY RISK MANAGEMENT",
      section: "Cyber Security Risk Template",
      title: "Cyber Security Risk Register Template",
      description: "Supports continuity and compliance.",
      cost: "800,000 ETB",
      image: "/6.png",
    },
    {
      id: 7,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Roles and Responsibilities Document",
      description: "Defines governance roles.",
      cost: "500,000 ETB",
      image: "/7.png",
    },
    {
      id: 8,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Risk Quantification Document",
      description: "Quantifies risks.",
      cost: "1,200,000 ETB",
      image: "/8.png",
    },
    {
      id: 9,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Strategy Document",
      description: "Outlines goals.",
      cost: "2,200,000 ETB",
      image: "/9.png",
    },
    {
      id: 10,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Governance System Document",
      description: "Establishes governance framework.",
      cost: "1,500,000 ETB",
      image: "/10.png",
    },
    {
      id: 11,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Organization Cyber Security Roadmap Document",
      description: "Timeline for initiatives.",
      cost: "2,200,000 ETB",
      image: "/11.png",
    },
    {
      id: 12,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Corporate Cyber Security Policy Document",
      description: "Defines principles.",
      cost: "2,000,000 ETB",
      image: "/12.png",
    },
    {
      id: 13,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Standards Document",
      description: "Ensures consistency.",
      cost: "2,600,000 ETB",
      image: "/13.png",
    },
    {
      id: 14,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Programs Document",
      description: "Details initiatives.",
      cost: "2,200,000 ETB",
      image: "/14.png",
    },
    {
      id: 15,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Issue Specific Policy Document",
      description: "Covers specific threats.",
      cost: "2,100,000 ETB",
      image: "/15.png",
    },
    {
      id: 16,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security System Specific Policy Document",
      description: "Tailored policies.",
      cost: "1,200,000 ETB",
      image: "/16.png",
    },
    {
      id: 17,
      mainTitle: "CYBER SECURITY MANAGEMENT",
      section: "Governance Document Development",
      title: "Cyber Security Processes and Procedures Document",
      description: "Documents procedures.",
      cost: "2,000,000 ETB",
      image: "/17.png",
    },
  ];

  const sections = useMemo(
    () => [
      { mainTitle: "Cyber Security Risk Management", categories: ["Cyber Security Risk Assessment", "Cyber Security Risk Template"] },
      { mainTitle: "Cyber Security Management", categories: ["Governance Document Development"] },
    ],
    []
  );

  const handleSelect = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Max 5MB allowed.');
        return;
      }
      setUploadedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert('Please upload a file.');
      return;
    }
    if (!selectedCards.length) {
      alert('Please select at least one service.');
      return;
    }

    const selectedData = selectedCards.map((id) => {
      const card = riskCards.find((c) => c.id === id);
      return {
        mainTitle: card?.mainTitle || '',
        category: card?.section || '',
        subCategory: card?.title || '',
        items: [{ name: card?.title || '', cost: card?.cost || 'Unknown' }],
      };
    });

    const formData = new FormData();
    formData.append('services', JSON.stringify(selectedData));
    formData.append('file', uploadedFile);

    console.log('Submitting:', {
      services: selectedData,
      file: uploadedFile.name,
    });
const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    setError('You must be logged in to submit a request.');
    return;
  }

 try {
   const formData = new FormData();
formData.append('services', JSON.stringify(selectedData));
formData.append('type', requestType); // requestType should be either 'Project' or 'Technical Support'

if (requestType === 'Technical Support') {
  formData.append('letterFile', uploadedFile); // assume same file for both if only one uploaded
  formData.append('projectFile', uploadedFile);
} else {
  formData.append('projectFile', uploadedFile); // for Project type, only projectFile is required
}
formData.append('services', JSON.stringify(selectedData));
formData.append('type', 'Project'); // or 'Technical Support'
formData.append('companyName', userCompanyName); // if needed by backend

    // Log file info before upload
    console.log('Uploading files:');
    if (letterFile) {
      console.log('Letter File:', letterFile.name, letterFile.size, letterFile.type);
    }
    if (projectFile) {
      console.log('Project File:', projectFile.name, projectFile.size, projectFile.type);
    }
    console.log('Other data:', { companyName, requestType });

 await axios.post('http://localhost:5000/api/requests', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});


    setSuccessMessage(true);
    setLetterFile(null);
    setProjectFile(null);
    setError('');
  } catch (err) {
    const msg = err?.response?.data?.error || err.message || 'Upload failed. Please try again.';
    setError(msg);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center py-6 w-full">
        {sections.map(({ mainTitle, categories }) => (
          <div key={mainTitle}>
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">{mainTitle}</h1>
            {categories.map((section) => (
              <div key={section} className="w-full">
                <h2 className="text-xl font-bold mt-4 mb-4 text-center text-gray-800 border-b pb-2">{section}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                  {riskCards
                    .filter((card) => card.section === section)
                    .map((card) => (
                      <div
                        key={card.id}
                        className={`rounded-xl shadow-md p-4 flex flex-col items-center bg-white transition-transform duration-300 transform hover:scale-105 ${
                          selectedCards.includes(card.id) ? 'border-2 border-green-500' : ''
                        }`}
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 bg-white border-gray-300 shadow">
                          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-base font-semibold mb-2 text-center text-gray-900">{card.title}</h3>
                        <p className="text-gray-700 text-sm text-center mb-2 leading-relaxed">{card.description}</p>
                        {card.cost && (
                          <div className="text-green-700 italic font-medium text-sm mb-3">
                            Estimated Cost: {card.cost}
                          </div>
                        )}
                        <button
                          className={`py-1.5 px-4 rounded-lg ${
                            selectedCards.includes(card.id) ? 'bg-green-600' : 'bg-blue-600'
                          } text-white hover:bg-opacity-80 transition duration-200 text-sm`}
                          onClick={() => handleSelect(card.id)}
                        >
                          {selectedCards.includes(card.id) ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-lg p-6 mt-10 w-full max-w-2xl px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Request Form</h2>
          <div className="w-full">
            <div className="flex flex-col items-center w-full">
              <label className="font-semibold text-gray-800 mb-2 text-center">
                Attach your document:
              </label>
              <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center bg-gray-50 w-full">
                <p className="mb-2 text-gray-700">Drag & drop your file here or</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                  name="file"
                  aria-label="Upload a PDF document"
                />
                <label htmlFor="fileUpload">
                  <span className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-200 inline-block">
                    Browse Files
                  </span>
                </label>
                <p className="mt-2 text-gray-500">Upload Document (PDF, max 5MB)</p>
                {uploadedFile && <p className="mt-2 text-green-600">Uploaded: {uploadedFile.name}</p>}
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