"use client"; // Required for interactive client-side components

import { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you import useRouter
import { ShieldCheckIcon, DocumentCheckIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Dialog } from '@headlessui/react';

const View = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const handleRedirect = () => {
    router.push('/Package'); // Redirect to the '/new-request' route
  };
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleGetStarted = () => {
    router.push("./signin"); // Redirect to the SignIn page
  };

  const handleSignUp = () => {
    router.push("./sign-up"); // Redirect to the SignUp page
  };

  const [selected, setSelected] = useState(null);

  const servicesData = [
    {
      title: "Cyber Security Risk Assessment (CSRA)",
      highlights: [
        "Strategic-Level Risk Assessment",
        "Tactical-Level Risk Assessment",
        "Operational-Level Risk Assessment",
        "Awareness & Cultural Assessment"
      ],
      details: [
        "Strategic-Level Risk Assessment: Align long-term security planning with business objectives.",
        "Tactical-Level: Evaluate mid-term risks within departments or projects.",
        "Operational-Level: Analyze daily technical, personnel, and process risks.",
        "Awareness & Culture: Assess employee behavior, training needs, and security habits."
      ]
    },
    {
      title: "Cyber Security Risk Templates (CSRT)",
      highlights: [
        "Asset Management Template",
        "Risk Monitoring Dashboard",
        "Risk Register Template"
      ],
      details: [
        "Asset Template: Prioritize systems & devices with structured tracking.",
        "Monitoring Dashboard: Visualize risk KPIs and incidents in real time.",
        "Register Template: Pre-built system to document and manage risks."
      ]
    },
    {
      title: "Governance Document Development",
      highlights: [
        "Roles & Responsibilities", "Risk Communication & Mitigation", "Risk Quantification",
        "Security Strategy", "Governance Framework", "Roadmap Document",
        "Corporate Policy", "Standards", "Security Programs",
        "Issue-Specific Policy", "System-Specific Policy", "Processes & Procedures"
      ],
      details: [
        "Roles & Responsibilities: Define leadership accountability.",
        "Risk Communication & Mitigation: Strategy to handle evolving threats.",
        "Risk Quantification: Metrics for risk severity and impact.",
        "Security Strategy: Long-term cyber planning doc.",
        "Governance Framework: Guide for security hierarchy & roles.",
        "Roadmap: Year-by-year security growth and investment plan.",
        "Corporate Policy: Company-wide protection rules.",
        "Standards: Technical and procedural control guidelines.",
        "Programs: Ongoing initiatives for awareness, incident response, etc.",
        "Issue-Specific Policy: Targeted response plans (e.g., phishing).",
        "System-Specific Policy: Rules for specific software or infrastructure.",
        "Processes & Procedures: Step-by-step control for staff actions."
      ]
    }
  ];
  
  
    const toggleIndex = (i) => {
      setOpenIndex(openIndex === i ? null : i);
    };
  const faqs = [
    {
      question: "What is a risk assessment for my system?",
      answer: "A risk assessment identifies, evaluates, and prioritizes risks to your system."
    },
    {
      question: "Why do I need a risk assessment for my system?",
      answer: "It helps protect your organization by identifying vulnerabilities and implementing mitigation strategies."
    },
    {
      question: "What risks are typically assessed?",
      answer: "Common risks include technical vulnerabilities, human factors, and operational risks."
    },
    {
      question: "How is a risk assessment conducted?",
      answer: "Risk assessments are conducted through interviews, surveys, and analysis of relevant data."
    },
    {
      question: "What do you look for during a risk assessment?",
      answer: "We look for potential threats, vulnerabilities, and the impact of possible security breaches."
    },
  ];

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6 mb-0 w-full">
        <div className="max-w-full p-8 flex flex-col items-center"> {/* Full width for content */}
            {/* GRC — Refined Landing Section */}
               <div className="relative w-full overflow-hidden py-18 px-6 md:px-16 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl">
           {/* Background Blobs */}
          <div className="absolute -top-40 -left-40 w-86 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-spin-slow"></div>
          <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-spin-reverse-slow"></div>

{/* GRC Modern Section - Refined and Compact */}
<div className="relative flex flex-col md:flex-row items-start gap-10 z-10 py-10 px-4 md:px-12">
  {/* Text Section */}
  <div className="md:w-2/3 space-y-6" data-aos="fade-right">
    <h2 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
      Governance Risk Compliance.
    </h2>
    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
      A streamlined GRC approach designed to simplify enterprise protection, enhance visibility, and ensure you’re ready for whatever comes next. pproach designed to simplify enterprise protection, and ensure you’re ready for whatever comes next. A streamlined GRC approach designed to simplify enterprise protection, enhance visibility, and ensure you’re ready for whatever comes next.
    </p>

    {/* Only Two Abstract Content Blocks */}
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
        <h4 className="text-black font-semibold mb-1">Strategic Governance</h4>
        <p className="text-sm text-gray-600">
          Build resilient frameworks aligned with your business goals and compliance needs.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
        <h4 className="text-black font-semibold mb-1">Real-Time Risk Intelligence</h4>
        <p className="text-sm text-gray-600">
          Leverage live analytics and threat modeling to proactively mitigate risks.
        </p>
      </div>
    </div>
  </div>

 {/* Video Section */}
<div className="md:w-1/2 flex justify-center pt-4 md:pt-16" data-aos="fade-left">
  <div className="relative w-full max-w-lg max-h-lg group">
    <video
      src="/cyybbb.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-auto rounded-2xl shadow-xl border border-gray-200 transform transition-transform duration-500 group-hover:-translate-y-2"
    />
    <div className="absolute bottom-3 right-3 bg-gradient-to-tr from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
      Trusted GRC Partner
    </div>
  </div>
</div>


</div>


  {/* Marquee Below Image */}
  <div className="w-full mt-12 overflow-hidden whitespace-nowrap border-t border-b border-gray-200 py-3">
    <p
      className="inline-block text-base font-medium text-purple-600"
      style={{ animation: 'marquee 18s linear infinite' }}
    >
      ✨| Information Network Security Admininstration| Master Governance | Stay Compliant | Mitigate Risks in Real Time | Transform GRC into a Competitive Edge ✨
    </p>
    <style jsx global>{`
      @keyframes marquee {
        0%   { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
  </div>
          </div>


{/* 🔐 Unified Cybersecurity Section with Sliding GIFs */}
<div className="w-full px-6 md:px-16 py-16 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl overflow-hidden space-y-12">

  {/* Section Title */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10">
    End-to-End Cybersecurity Coverage
  </h2>

  <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Sliding GIFs Container */}
    <div className="relative w-full md:w-1/2 h-72 overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-white">
      <div className="absolute w-[200%] h-full flex animate-slide-gifs">
        <img 
          src="/cyb2.gif" 
          alt="Cybersecurity Risk"
          className="w-1/2 h-full object-cover"
        />
        <img 
          src="/cyb3.gif" 
          alt="Cybersecurity Management"
          className="w-1/2 h-full object-cover"
        />
      </div>
    </div>

    {/* Unified Text */}
    <div className="md:w-1/2 space-y-5 text-center md:text-left">
      <p className="text-lg text-gray-700 leading-relaxed">
        We protect what matters. From <strong>risk identification</strong> to <strong>real-time threat mitigation</strong>, our cybersecurity approach is both reactive and proactive. We don’t just monitor—we manage.
      </p>
      <p className="text-md text-gray-600">
        Our unified model covers:
        <br />
        🔹 Cybersecurity Risk Management: threat visibility, impact analysis, response planning.
        <br />
        🔹 Cybersecurity Management: governance, access control, operational oversight.
        <br />
        All tailored for today’s evolving digital enterprise.
      </p>
    </div>
  </div>

  {/* CSS Animations */}
  <style jsx>{`
    @keyframes slide-gifs {
      0% { transform: translateX(0%); }
      50% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }

    .animate-slide-gifs {
      animation: slide-gifs 16s ease-in-out infinite;
    }
  `}</style>
</div>

<div className="w-full px-6 md:px-16 py-16 bg-white">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
    Our Cybersecurity Services
  </h2>
  <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
    We provide structured and strategic solutions to manage, mitigate, and govern cybersecurity risk.
  </p>

  <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
    {/* Box 1 - Risk Assessment */}
    <div className="bg-[#EFF6FF] rounded-2xl shadow-sm p-6 md:w-[30%] w-full border border-blue-100 hover:shadow-md transition duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Cyber Security Risk Assessment
        </h3>
        <ul className="text-gray-700 space-y-2 list-disc list-inside text-sm">
          <li>Strategic Level Risk Assessment</li>
          <li>Tactical Level Risk Assessment</li>
          <li>Operational Level Risk Assessment</li>
          <li>Cyber Security Awareness & Cultural Assessment</li>
        </ul>
      </div>
      <button className="mt-6 text-sm text-blue-600 font-medium hover:underline self-start">
        Learn More →
      </button>
    </div>

    {/* Box 2 - Governance Docs */}
    <div className="bg-[#ECFDF5] rounded-2xl shadow-sm p-6 md:w-[36%] w-full border border-green-100 hover:shadow-md transition duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Governance Document Development
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
          <ul className="space-y-2 list-disc list-inside">
            <li>Roles & Responsibilities</li>
            <li>Risk Communication Doc</li>
            <li>Quantification Document</li>
            <li>Cybersecurity Strategy</li>
            <li>Governance System</li>
            <li>Roadmap Document</li>
          </ul>
          <ul className="space-y-2 list-disc list-inside">
            <li>Corporate Policy</li>
            <li>Standards Document</li>
            <li>Programs Document</li>
            <li>Issue-Specific Policy</li>
            <li>System-Specific Policy</li>
            <li>Processes & Procedures</li>
          </ul>
        </div>
      </div>
      <button className="mt-6 text-sm text-green-600 font-medium hover:underline self-start">
        Learn More →
      </button>
    </div>

    {/* Box 3 - Risk Template */}
    <div className="bg-[#F5F3FF] rounded-2xl shadow-sm p-6 md:w-[30%] w-full border border-purple-100 hover:shadow-md transition duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Cyber Security Risk Template
        </h3>
        <ul className="text-gray-700 space-y-2 list-disc list-inside text-sm">
          <li>Asset Management Template</li>
          <li>Risk Monitoring Dashboard</li>
          <li>Cyber Security Risk Register Template</li>
        </ul>
      </div>
      <button className="mt-6 text-sm text-purple-600 font-medium hover:underline self-start">
        Learn More →
      </button>
    </div>
  </div>
</div>



          {/* How to Apply Section */}
          <div id="how-to-apply" className="mt-8 flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-8">
            {/* Text Section */}
            <div className="flex flex-col items-center max-w-md w-full">
              <h2 className="text-2xl font-semibold text-black mb-4 text-center">
                How to Apply?
              </h2>
              <p className="text-black mb-6 text-left">
                Welcome to the Cyber Security Risk Management System. Simply log in, use the "Risk Assessment" feature to identify vulnerabilities, manage risks with suggested strategies, generate reports, and stay updated with system patches to protect your organization from cyber threats.
              </p>
            </div>

           {/* YouTube Iframe */}
<div className="flex justify-center w-full">
  <iframe
    width="70%"
    height="300"
    src="https://www.youtube.com/embed/K3AkEtDFCjA"
    title="የኤሪፖርት እና ቦርደር አስተዳደር ትራንስፎርሜሽን ፕሮግራም"
    frameBorder="0" // Corrected here
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>
          </div>

          {/* FAQs Section */}
          <div className="mt-8 w-full max-w-10xl p-4 bg-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4 text-center">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6"> {/* Added margin-bottom for spacing */}
                <button
                  className={`flex justify-between items-center w-full p-4 text-left transition duration-300 ease-in-out rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white focus:outline-none ${openIndex === index ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-bold text-black">{faq.question}</span>
                  <span className="text-lg">{openIndex === index ? '-' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="p-4 text-black bg-transparent">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Information Section */}
          <div id="contact" className="flex flex-col md:flex-row justify-center items-start w-full bg-white p-8 rounded-lg shadow-lg mt-8">
            {/* Contact Information */}
            <div className="text-white p-6 max-w-sm bg-black rounded-lg shadow-md  mt-16">
              <h3 className="text-xl font-bold text-white">CONTACT INFORMATION</h3>
              <p className="mt-2">Ask anything you would like to ask!</p>
              <p className="mt-4 flex items-center"><span className="mr-2">📞</span> +251111111111111</p>
              <p className="mt-2 flex items-center"><span className="mr-2">📧</span> <a href="mailto:insa.gov.et" className="underline text-blue-600">insa.gov.et</a></p>
              <p className="mt-2 flex items-center"><span className="mr-2">📍</span> Karries Ring Road, ADDIS ABABA</p>
            </div>

            {/* Contact Form */}
            <div className="relative ml-0 md:ml-8 w-full max-w-lg p-6">
              {/* Background Image with 50% Opacity */}
              <div className="absolute inset-0 bg-[url('/backgroundimage.png')] bg-cover bg-center opacity-20"></div>
              
              {/* Form Content */}
              <div className="relative z-10 rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-blue-500">Contact Us</h2>
  <p className="mt-2 text-black">Any question or remarks? Just write us a message!</p>
  <form className="mt-4">
    <div className="flex flex-col md:flex-row md:space-x-4">
      <input
        type="text"
        placeholder="First Name"
        className="border border-gray-300 rounded-md w-full md:w-1/2 p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border border-gray-300 rounded-md w-full md:w-1/2 p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded-md w-full md:w-1/2 p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="border border-gray-300 rounded-md w-full md:w-1/2 p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <textarea
      placeholder="Write your messages"
      className="border border-gray-300 rounded-md w-full p-2 mt-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <button
      type="submit"
      className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
    >
      Send Message
    </button>
</form>
</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-black text-center p-0 m-0">
        <p>&copy;2025 Information Network Security Administration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default View;
