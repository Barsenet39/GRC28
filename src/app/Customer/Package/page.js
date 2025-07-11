'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const View = () => {
  const router = useRouter();
  const [letterFile, setLetterFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [requestType, setRequestType] = useState(null);
  const [companyName, setcompanyName] = useState('');

  // Check authentication
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/auth', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!data.user) router.push('/signin');
      } catch {
        router.push('/signin');
      }
    };
    checkIfLoggedIn();
  }, [router]);

  // Load organization name from local storage
  useEffect(() => {
    const companyName = localStorage.getItem('companyName')?.trim();
    if (companyName) setcompanyName(companyName);
  }, []);

  // File validation
  const validateFile = (file, type) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      type === 'letter' ? setLetterFile(null) : setProjectFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5 MB.');
      type === 'letter' ? setLetterFile(null) : setProjectFile(null);
      return;
    }
    setError('');
    type === 'letter' ? setLetterFile(file) : setProjectFile(file);
  };

  const handleFileChange = (e, type) => validateFile(e.target.files[0], type);
  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragging(false);
    validateFile(e.dataTransfer.files[0], type);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage(false);
    setError('');
    setLetterFile(null);
    setProjectFile(null);
  };

  const handleCloseModal1 = () => {
    setModalOpen(false);
    router.push('/Customer/Requests');
  };

const handleUpload = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    setError('You must be logged in to submit a request.');
    return;
  }

  if (requestType === 'technical-support') {
    if (!letterFile || !projectFile) {
      setError('Both letter and project files are required.');
      return;
    }
  }

  try {
    const formData = new FormData();
    if (letterFile) formData.append('letterFile', letterFile);
    if (projectFile) formData.append('projectFile', projectFile);
    formData.append('companyName', companyName);
    formData.append('type', requestType === 'technical-support' ? 'Technical Support' : 'Project');
    formData.append('services', JSON.stringify([])); // placeholder for services

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




  const handleProjectSelection = (key, route) => {
    setRequestType('project');
    localStorage.setItem('projectSubtype', key); // 👈 Store project subtype (CSM, CSRM, Both)
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 md:mt-8 leading-tight text-center md:text-left">
        Select <span className="text-blue-600">Your Package</span>
      </h1>

      {/* Technical Support Section */}
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-22 mt-8">
        <div className="container mx-auto px-8 max-w-6xl flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Support on Finished Project</h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">
              Already completed your project or letter? You're just a step away from technical refinement.
              Upload both your letter and project files using the button below — and our team will review and support your work with care and precision.
            </p>
            <button
              onClick={() => {
                setRequestType('technical-support');
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all ease-in-out transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
              </svg>
              Upload Letter & Project
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img src="/upload1.png" alt="Technical Support Illustration" className="w-full animate-rotateY" />
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10 relative animate-fadeInUp transition-all ease-in-out transform">
              {/* Success Message */}
              {successMessage ? (
                <div className="mb-4 bg-green-100 text-green-700 p-6 rounded-lg text-center shadow-xl">
                  <button
                    onClick={handleCloseModal1}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                  <p className="font-medium text-xl">Thank you! Your files were successfully uploaded!</p>
                  <p className="mt-2 text-lg">
                    We will review your request and get back to you within a few days. Please check the status of your request periodically.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Upload Your Letter & Project</h3>

                  {/* Letter File Upload */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Letter File <span className="text-red-600">*</span></label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => handleDrop(e, 'letter')}
                      onClick={() => document.getElementById('letterInput').click()}
                      className={`border-2 rounded-xl p-6 mb-6 text-center cursor-pointer transition-all
                        ${dragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'}
                        hover:shadow-xl hover:border-blue-400`}
                    >
                      <p className="text-gray-600">
                        {letterFile ? (
                          <span className="font-medium text-gray-800">{letterFile.name}</span>
                        ) : (
                          'Drag & drop or click to upload your letter'
                        )}
                      </p>
                      <input
                        type="file"
                        id="letterInput"
                        onChange={(e) => handleFileChange(e, 'letter')}
                        className="hidden"
                        accept="application/pdf"
                      />
                    </div>
                  </div>

                  {/* Project File Upload */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Project File <span className="text-red-600">*</span></label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => handleDrop(e, 'project')}
                      onClick={() => document.getElementById('projectInput').click()}
                      className={`border-2 rounded-xl p-6 mb-6 text-center cursor-pointer transition-all
                        ${dragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'}
                        hover:shadow-xl hover:border-blue-400`}
                    >
                      <p className="text-gray-600">
                        {projectFile ? (
                          <span className="font-medium text-gray-800">{projectFile.name}</span>
                        ) : (
                          'Drag & drop or click to upload your project'
                        )}
                      </p>
                      <input
                        type="file"
                        id="projectInput"
                        onChange={(e) => handleFileChange(e, 'project')}
                        className="hidden"
                        accept="application/pdf"
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
                  )}

                  {/* Buttons */}
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
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Project Packages Section */}
      <section className="w-full py-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Packages</h2>
          <p className="text-gray-600 mb-10 text-sm leading-relaxed">
            Select the cybersecurity package that aligns with your company’s vision. <br />
            Choose based on your infrastructure, goals, and digital direction. <br />
            Each option is crafted to elevate your protection and resilience. <br />
            Let us guide you to the package that fits your future best.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cyber Security Risk Management',
                description:
                  'Ideal for teams focused on identifying threats before they strike. Analyze risks and secure your digital assets from unseen vulnerabilities.',
                route: '/Customer/Risk-Management',
                key: 'CSRM',
              },
              {
                title: 'Cyber Security Management',
                description:
                  'Perfect for structured teams. Create and enforce policies, manage systems, and build a stable cybersecurity environment.',
                route: '/Customer/Management',
                key: 'CSM',
              },
              {
                title: 'Both Cyber Security Risk Management and Cyber Security Management',
                description:
                  'For visionary organizations: get both strategic and operational security — a full suite of solutions in one unified package.',
                route: '/Customer/both',
                key: 'Both',
              },
            ].map(({ title, description, route, key }) => (
              <div
                key={key}
                onClick={() => handleProjectSelection(key, route)}
                className="flex flex-col justify-between bg-white rounded-2xl border-t-4 border-blue-600 shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{description}</p>
                </div>
                <p className="text-blue-600 font-medium text-sm text-center mt-auto">
                  Discover & Apply
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-black text-center p-0 m-0">
        <p>©2025 Information Network Security Administration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default View;