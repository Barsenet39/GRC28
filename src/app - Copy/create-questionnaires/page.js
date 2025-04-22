"use client"; // Required for interactive client-side components

import { useState } from "react";

const CreateQuestionnaire = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, type: "shortAnswer", text: "", options: [], required: false },
  ]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [showModal, setShowModal] = useState(false); // State for send modal visibility
  const [sendNumber, setSendNumber] = useState("");
  const [emailInputs, setEmailInputs] = useState([]); // State for email inputs

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "shortAnswer",
      text: "",
      options: [],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (id, text) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, text } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (id, index, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id
        ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
        : q
    );
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (id, type) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, type, options: type === "checkbox" ? [""] : [] } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleRequiredToggle = (id) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, required: !q.required } : q
    );
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const moveQuestion = (index, direction) => {
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(index, 1);
    newQuestions.splice(index + direction, 0, removed);
    setQuestions(newQuestions);
  };

  const addTemplate = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide popup after 3 seconds
  };

  const handleSend = () => {
    console.log("Sending to:", emailInputs); // Example action on send
    setShowModal(false); // Close modal after sending
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setSendNumber(value);
    // Create an array of empty strings based on the entered number
    const number = parseInt(value, 10);
    setEmailInputs(Array.from({ length: number }, () => ""));
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emailInputs];
    updatedEmails[index] = value;
    setEmailInputs(updatedEmails);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 p-6">
      <div className="w-full bg-white rounded-lg shadow-lg p-8 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Questionnaire</h2>
        <input
          type="text"
          placeholder="Enter Questionnaire Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-3 mb-4 text-lg font-semibold text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-3 mb-6 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        {questions.map((question, index) => (
          <div key={question.id} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <label className="block text-lg font-medium mb-2 text-gray-800">
                  Q{index + 1}:
                  <input
                    type="text"
                    placeholder="Enter your question here"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <div className="flex items-center mb-4">
                  <select
                    value={question.type}
                    onChange={(e) => handleTypeChange(question.id, e.target.value)}
                    className="border border-gray-300 rounded-md p-1 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mr-2"
                  >
                    <option value="shortAnswer">Short Answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="checkbox">Checkboxes</option>
                    <option value="radioButton">Radio Button</option>
                  </select>

                  <span className="mr-2 text-gray-800">{question.required ? "Required" : "Optional"}</span>
                  <button
                    onClick={() => handleRequiredToggle(question.id)}
                    className={`relative inline-flex items-center cursor-pointer rounded-full w-12 h-6 transition-colors duration-200 ease-in-out ${
                      question.required ? "bg-red-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`transform transition-transform duration-200 ease-in-out absolute left-0 w-6 h-6 bg-white rounded-full shadow ${
                        question.required ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Question Options */}
                {question.type === "multipleChoice" && (
                  <div>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <label className="mr-2">{String.fromCharCode(65 + index)})</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          className="block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuestions = questions.map((q) =>
                          q.id === question.id
                            ? { ...q, options: [...q.options, ""] }
                            : q
                        );
                        setQuestions(updatedQuestions);
                      }}
                      className="mt-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
                    >
                      Add Option
                    </button>
                  </div>
                )}

                {question.type === "checkbox" && (
                  <div>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuestions = questions.map((q) =>
                          q.id === question.id
                            ? { ...q, options: [...q.options, ""] }
                            : q
                        );
                        setQuestions(updatedQuestions);
                      }}
                      className="mt-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
                    >
                      Add Option
                    </button>
                  </div>
                )}

                {question.type === "radioButton" && (
                  <div>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="radio"
                          name={`question_${question.id}`} // Grouping radios by question ID
                          className="mr-2"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedQuestions = questions.map((q) =>
                          q.id === question.id
                            ? { ...q, options: [...q.options, ""] }
                            : q
                        );
                        setQuestions(updatedQuestions);
                      }}
                      className="mt-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
                    >
                      Add Option
                    </button>
                  </div>
                )}

                {question.type === "shortAnswer" && (
                  <textarea
                    placeholder="Enter your short answer (max 200 characters)"
                    maxLength={200}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                )}

                {question.type === "paragraph" && (
                  <textarea
                    placeholder="Enter your paragraph (max 500 characters)"
                    maxLength={500}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                )}
              </div>
              <button
                onClick={() => deleteQuestion(question.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-2xl"
              >
                X {/* Using "X" as the delete symbol */}
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => moveQuestion(index, -1)}
                disabled={index === 0} // Disable if it's the first question
                className="text-blue-500 hover:text-blue-700 font-bold text-2xl mr-2"
              >
                ↑ {/* Up arrow */}
              </button>
              <button
                onClick={() => moveQuestion(index, 1)}
                disabled={index === questions.length - 1} // Disable if it's the last question
                className="text-blue-500 hover:text-blue-700 font-bold text-2xl"
              >
                ↓ {/* Down arrow */}
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-500 text-white rounded-md p-3 hover:bg-green-600 transition duration-200"
          >
            Add Question
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 text-white rounded-md p-3 hover:bg-purple-700 transition duration-200"
          >
            Send
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={addTemplate}
            className="bg-gray-300 text-gray-800 rounded-md p-3 hover:bg-gray-400 transition duration-200"
          >
            Add Template
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white rounded-md p-3 mt-4 shadow-lg transition-opacity duration-300">
          Successfully added to template
        </div>
      )}

      {/* Send Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-h-[500px] max-w-[500px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Send To</h2>
            <input
              type="number"
              value={sendNumber}
              onChange={handleNumberChange}
              placeholder="Enter number"
              className="border border-gray-300 rounded-md p-2 w-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emailInputs.map((email, index) => (
              <input
                key={index}
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder={`Email ${index + 1}`}
                className="mt-2 border border-gray-300 rounded-md p-2 w-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuestionnaire;