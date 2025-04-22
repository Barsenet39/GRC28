"use client"; // Required for interactive client-side components

import { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you import useRouter

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
          
          {/* Title and Overview Section */}
          <div className="flex flex-col md:flex-row items-start w-full mb-8"> {/* Adjusts to column on smaller screens */}
            <div className="flex flex-col items-start md:w-2/3 pr-6"> {/* 65% width on medium and larger screens */}
              <h2 className="text-5xl font-semibold mb-4 text-black">Governance Risk and Compliance</h2>
              <p className="mb-4 text-black">
              We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats. We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats.We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats.We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats.
              and reduce cybersecurity risks, protecting your business from potential threats and reduce cybersecurity risks, protecting your 
              </p>
            </div>
            <div className="relative md:w-1/3 flex justify-end"> {/* 35% width on medium and larger screens */}
              <img
                src="/grc.png" // Replace with your GRC graphic URL
                alt="GRC Graphic"
                className="w-full h-auto object-cover" // Ensures the image scales properly
              />
            </div>
          </div>

          {/* Combined Image and Text Section */}
          <div className="flex flex-col md:flex-row items-center mt-8 w-full mb-8"> {/* Adjust layout for mobile */}
            <img
              src="/gover.png" // Replace with your new image URL
              alt="New Graphic"
              className="w-full max-w-md mb-4 md:mb-0 md:mr-4" // Adjust width as needed
            />
            <p className="text-black text-center md:text-left">
            We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats. We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats.We provide expert solutions to identifyand reduce cybersecurity risks, protecting your business from potential threats.We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats
.

            </p>
          </div>

          {/* Centered Services Section */}
          <div id="services" className="mt-8 flex flex-col items-center w-full mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4 text-center">
              Our Services Can Help You with Cyber Security Risk Management
            </h2>
            <p className="text-black mb-6 text-center">
              We provide expert solutions to identify and reduce cybersecurity risks, protecting your business from potential threats.
            </p>
           <div className="flex flex-wrap justify-center space-x-4 w-full">
  {/* Service Cards */}
  {[
    {
      title: "Cyber Security Risk Assessment",
      description: ["Strategic Level Risk Assessment", "Operational Level Risk Assessment", "Cyber Security Risk Register"]
    },
    {
      title: "Cyber Security Risk Template",
      description: ["Asset Management Template", "Risk Communication and Migration Document", "Cyber Security Risk Register Template"]
    },
    {
      title: "Governance Document Development",
      description: ["Role and Responsibilities for Management", "Risk Communication and Migration Document", "Cyber Security Risk Quantification Document"]
    }
  ].map((service, index) => (
    <div key={index} className="bg-white border rounded-lg p-4 shadow-md max-w-xs text-center flex-1 m-2 flex flex-col"> {/* Added flex-col for vertical alignment */}
      <h3 className="font-bold text-lg text-black">{service.title}</h3>
      {service.description.map((desc, idx) => (
        <p key={idx} className="mt-1 text-gray-700">{desc}</p>
      ))}
      <div className="mt-auto"> {/* Ensures button stays at the bottom */}
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => handleRedirect()} // Attach the redirection logic here
        >
          MORE
        </button>
      </div>
    </div>
  ))}
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