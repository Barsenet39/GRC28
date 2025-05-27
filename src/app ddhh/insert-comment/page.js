'use client';
import { useState, useEffect } from 'react';  // Add necessary hooks
import { useRouter } from 'next/navigation';
import { FaEye, FaDownload, FaCommentDots, FaTimes } from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import { FaNetworkWired } from "react-icons/fa"; 
import { FaLayerGroup, FaExclamationCircle } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";



const InsertComment = () => {
  const [newRequests, setNewRequests] = useState(0);
  const router = useRouter();

  const requestDetails = {
    id: 'REQ/20241030/6345',
    requestedDate: '10/30/2024',
    priority: 'Urgent',
    target: 'Mobile',
    DirectorGeneralPushed: '2024-10-30T12:00:03', 
    DeputyDirectorPushed: '2024-10-30T18:12:03',
    DirectorateDirectorPushed: '2024-10-30T03:17:03', 
    DivisionHeadPushed: '', 
    AssignedDateByExpertise: '', 
    EndDateByExpertise: '',
  };


  const [selectedTab, setSelectedTab] = useState('requestLetters');
  const [activeComment, setActiveComment] = useState(null);

  const toggleComment = (index) => { 
  setActiveComment(activeComment === index ? null : index);
 };


  const requestLetters = ['1730273674023-RequestLetter.pdf']; 
  const relatedDocuments = [ '1730273674023-CamScanner.pdf', 
    '1730275677023-AI_Course.pdf', 
    '1730273679023-Example.pdf', 
];

  const contactPerson = {
    name: 'Bernabas Meles',
    email: 'bernbas@gmail.com'
  };

  const documents = [
    '1730273674023-CamScanner.pdf (Sanitized)',
    '1730275677023-AI_Course.pdf (Sanitized)'
  ];

  const approvalStatus = [
 { role: 'Director General Comment', comment: 'The audit request is approved.'},
{ role: 'Deputy Director Comment', comment: 'Reviewed and approved.' },
{ role: 'Directorate Director Comment', comment: 'No issues found.' }, 
 ];
 
 const assignees = { name: 'Tigist Mamo',
     email: 'tigist@gmail.com', 
    comment: 'Reviewed thoroughly by the assignee.' 
};


const [showFeedbackBox, setShowFeedbackBox] = useState(false);
const [feedbackText, setFeedbackText] = useState("");

const sendFeedback = () => {
  if (feedbackText.trim() === "") {
    alert("Please enter your feedback before sending.");
    return;
  }

  // Simulate sending feedback (e.g., via an API call)
  console.log("Feedback sent to barasfaw20@gmail.com:", feedbackText);
  alert("Feedback sent successfully to barasfaw20@gmail.com!");

  // Clear the modal and textarea
  setShowFeedbackBox(false);
  setFeedbackText("");
};

 
 
  return ( 
    <div> 
   
    <main
  style={{
    position: 'relative',
    padding: '10px',
    minHeight: '110vh',
    width: '100vw',
    overflowX: 'hidden', // Prevent horizontal overflow
  }}
>
  <video
    autoPlay
    loop
    muted
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Make sure the video covers the entire area
      zIndex: -1, // Ensure the video stays behind content
    }}
  >
    <source src="/bg5.mp4" type="video/mp4" />
  </video>
     <div className="absolute bg-white z-0"></div>


<div className=" flex flex-wrap relative z-[2] mt-24 sm:ml-0 md:ml-60 lg:ml-72 flex">
  {/* First Section: Left Side */}
  <div className="flex-1 p-5 ">
  <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 max-w-lg mx-auto">
  <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black mb-6">
    Request Details
  </h2>

  {/* Request ID Section */}
  <div className="flex space-x-3 mt-3">
    <div className="flex-1">
      <p className="font-semibold text-black text-sm sm:text-sm md:text-md lg:text-md">Request ID:</p>
    </div>
    <div className="flex-1 font-normal text-black text-sm sm:text-sm md:text-md lg:text-md">
      {requestDetails.id}
    </div>
  </div>

  {/* Requested Date Section */}
  <div className="flex space-x-3 mt-3">
    <div className="flex-1">
      <p className="font-semibold text-black text-sm sm:text-sm md:text-md lg:text-md">Requested Date:</p>
    </div>
    <div className="flex-1 font-normal text-black text-sm sm:text-sm md:text-md lg:text-md">
      {requestDetails.requestedDate}
    </div>
  </div>

  {/* Priority Section */}
  <div className="flex space-x-3 mt-3">
    <div className="flex-1">
      <p className="font-semibold text-black text-sm sm:text-sm md:text-md lg:text-md">Priority:</p>
    </div>
   <div className="flex-1 font-normal text-black text-sm sm:text-sm md:text-md lg:text-md flex items-center">
     {requestDetails.priority === "Standard" ? (
       <>
         <FaLayerGroup color="#36bdf5" className="text-sm mr-2" />
         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Standard</span>
         </>
     ) : requestDetails.priority === "Urgent" ? (
       <>
         <FaExclamationCircle color="#ff0000" className="text-sm mr-2" />
         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Standard</span>
         </>
     ) : (
       requestDetails.priority
     )}
   </div>
  </div>

  {/* Target Section */}
  <div className="flex space-x-3 mt-3">
    <div className="flex-1">
      <p className="font-semibold text-black text-sm sm:text-sm md:text-md lg:text-md">Target:</p>
    </div>
    <div className="flex-1 font-normal text-black text-sm sm:text-sm md:text-md lg:text-md flex items-center">
  {requestDetails.target === "Network" ? (
    <>
      <FaNetworkWired className="mr-2 text-purple-900 text-sm" />
      {requestDetails.target}
    </>
  ) : requestDetails.target === "Mobile" ? (
    <>
      <FaMobileAlt className="mr-2 text-black text-sm" />
      {requestDetails.target}
    </>
  ) : requestDetails.target === "Web" ? (
    <>
      <FaGlobe className="mr-2 text-red-500 text-sm" />
      {requestDetails.target}
    </>
  ) : (
    requestDetails.target
  )}
</div>
  </div>

  {/* Date Rows */}
  <div className="space-y-3 mt-4 text-sm sm:text-sm md:text-md lg:text-md">
    {['DirectorGeneralPushed', 'DeputyDirectorPushed', 'DirectorateDirectorPushed',].map((dateKey) => (
      <div key={dateKey} className="flex justify-between items-center mt-2">
        <p className="font-semibold text-black text-sm sm:text-sm md:text-md lg:text-md w-1/2">
          {dateKey.replace(/([A-Z])/g, ' $1')}:
        </p>
        <p className="text-black sm:text-sm md:text-md lg:text-md">
          {requestDetails[dateKey] ? new Date(requestDetails[dateKey]).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-black sm:text-sm md:text-md lg:text-md">
          {requestDetails[dateKey] ? new Date(requestDetails[dateKey]).toLocaleTimeString() : 'N/A'}
        </p>
      </div>
    ))}
  </div>
</div>











{/* Contact Person */}
<div className="bg-white p-4 rounded-2xl shadow-2xl max-w-lg mx-auto mt-6">
  <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black mb-4">Contact Person</h3>
  <div className="flex items-center space-x-4 relative">
    <VscAccount className="text-gray-500 text-3xl" /> {/* Increased icon size */}
    <div>
      <p><strong>Name:</strong> {contactPerson.name}</p>
      <p><strong>Email:</strong> {contactPerson.email}</p>
    </div>
  </div>
</div>







 {/* Documents */}
<div className="bg-white p-4 rounded-2xl shadow-2xl max-w-lg mx-auto mt-6">
  <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black mb-8">Documents</h3>
  <div className="flex space-x-4 mt-4">
    <button
      className={`p-2 rounded-lg ${selectedTab === 'requestLetters' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setSelectedTab('requestLetters')}
    >
      Request Letters
    </button>
    <button
      className={`p-2 rounded-lg ${selectedTab === 'relatedDocuments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setSelectedTab('relatedDocuments')}
    >
      Related Documents
    </button>
  </div>
  
  {selectedTab === 'requestLetters' && (
    <div className="mt-4">
      <ul>
        {requestLetters.map((doc, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-sm">{doc}</span>
            <div className="space-x-2 flex items-center">
  <a href={`/path/to/${doc}`} target="_blank" rel="noopener noreferrer">
    <FaEye className="text-blue-500" title="View" />
  </a>
  <a href={`/path/to/${doc}`} download>
    <FaDownload className="text-blue-500" title="Download" />
  </a>
</div>

          </li>
        ))}
      </ul>
    </div>
  )}

  {selectedTab === 'relatedDocuments' && (
    <div className="mt-4">
<ul>
  {relatedDocuments.map((doc, index) => (
    <li key={index} className="flex justify-between items-center mb-4"> {/* Added mb-4 for spacing between rows */}
      <span className="text-sm">{doc}</span>
      <div className="flex space-x-2"> {/* Icons will align horizontally */}
        <a href={`/path/to/${doc}`} target="_blank" rel="noopener noreferrer">
          <FaEye className="text-blue-500" title="View" />
        </a>
        <a href={`/path/to/${doc}`} download>
          <FaDownload className="text-blue-500" title="Download" />
        </a>
      </div>
    </li>
  ))}
</ul>


    </div>
  )}
</div>



  </div>

  {/* Second Section: Right Side */}
  <div className="flex-1 p-5">
 {/* Approval Status */}

<div className="bg-white p-4 rounded-2xl shadow-2xl w-full max-w-lg mx-auto mt-2">
  <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-black">
    Approval Status
  </h3>
  {approvalStatus.map((status, index) => (
    <div
      key={index}
      className="flex justify-between items-center mt-4 space-x-4 bg-[#F5EFEF] p-4 rounded-2xl"
    >
      <p className="flex-1 text-lg font-medium text-black text-sm sm:text-xs md:text-md lg:text-lg">
        <strong>{status.role}:</strong>
      </p>
      <div className="relative flex items-center space-x-2">
        <FaCommentDots
          className="text-blue-500 cursor-pointer text-lg"
          onClick={() => toggleComment(index)}
          title="View Comment"
        />
        {activeComment === index && (
          <div className="absolute bg-white p-4 rounded-lg shadow-lg mt-2 right-0 w-64 md:w-40 lg:w-80  z-10">
            <FaTimes
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              onClick={() => toggleComment(index)}
              title="Close Comment"
            />
            <p className="text-sm">{status.comment}</p>
          </div>
        )}
      </div>
    </div>
  ))}
</div>



    {/* Reviewed by Assignee */}
<div className="bg-white p-4 rounded-2xl shadow-2xl mt-6 w-full max-w-lg  mx-auto">
  <h3 className="text-center font-bold text-md sm:text-sm md:text-xl text-black mb-4">Reviewed by Assignee</h3>
  <div className="flex items-center space-x-4 relative">
    <VscAccount className="text-gray-500 text-3xl" /> {/* Increased icon size */}
    <div>
      <p><strong>Name:</strong> {assignees.name}</p>
      <p><strong>Email:</strong> {assignees.email}</p>
    </div>
  <div className="relative flex">
  <div className="ml-48">
    <FaCommentDots
      className="text-blue-500 cursor-pointer text-lg hover:text-blue-600 transition-all"
      onClick={() => toggleComment(approvalStatus.length)}
      title="View Comment"
    />
  </div>
  {activeComment === approvalStatus.length && (
    <div className="absolute bg-white p-4 rounded-lg shadow-lg mt-2 right-0 w-64 md:w-40 lg:w-80 z-10">
      <FaTimes
        className="absolute top-2 right-2 text-red-500 cursor-pointer text-xl hover:text-red-600"
        onClick={() => toggleComment(approvalStatus.length)}
        title="Close Comment"
      />
      <p className="text-sm">{assignees.comment}</p>
    </div>
  )}
</div>

  </div>
</div>



{/* Send Feedback to Customer Button */}
<div className="mt-6 ml-32 mx-auto">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
          onClick={() => setShowFeedbackBox(true)}
        >
          Send technical comment to Customer
        </button>
      </div>

  {/* Feedback Modal */}
  {showFeedbackBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
            Send technical comment to Customer
            </h3>
            <textarea
              className="w-full h-36 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your feedback here..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-all"
                onClick={() => setShowFeedbackBox(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all"
                onClick={sendFeedback}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}




  


    
  </div>
</div>



</main>



</div>


  );
};

export default InsertComment;
