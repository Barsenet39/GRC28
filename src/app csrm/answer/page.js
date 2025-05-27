"use client";

import React, { useState } from 'react';

const DisplayQuestionnaire = ({ questions, initialAnswers }) => {
  const [answers, setAnswers] = useState(initialAnswers || {});

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    // Here you would typically send the 'answers' object to your backend
    console.log("Submitted Answers:", answers);
    alert("Answers submitted! Check the console for the data.");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Questionnaire</h1>
      {questions.map((question, index) => {
        const questionId = question.id;
        return (
          <div key={index} className="mb-6">
            <p className="font-medium">{index + 1}. {question.text} {question.required && <span className="text-red-500">*</span>}</p>
            {question.type === 'shortAnswer' && (
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Your answer"
                value={answers[questionId] || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                required={question.required}
              />
            )}
            {question.type === 'paragraph' && (
              <textarea
                className="border p-2 w-full"
                placeholder="Your answer"
                rows="4"
                value={answers[questionId] || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                required={question.required}
              ></textarea>
            )}
            {question.type === 'multipleChoice' && (
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        name={`question_${questionId}`}
                        value={option}
                        checked={answers[questionId] === option}
                        onChange={() => handleAnswerChange(questionId, e.target.value)}
                        required={question.required}
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {question.type === 'checkbox' && (
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        name={`question_${questionId}_${optionIndex}`}
                        value={option}
                        checked={answers[questionId] ? answers[questionId].includes(option) : false}
                        onChange={(e) => {
                          let newAnswers = answers[questionId] ? [...answers[questionId]] : [];
                          if (e.target.checked) {
                            newAnswers.push(option);
                          } else {
                            newAnswers = newAnswers.filter((item) => item !== option);
                          }
                          handleAnswerChange(questionId, newAnswers);
                        }}
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {question.type === 'radioButton' && (
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        name={`question_${questionId}`}
                        value={option}
                        checked={answers[questionId] === option}
                        onChange={() => handleAnswerChange(questionId, e.target.value)}
                        required={question.required}
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Submit</button>
      <AnswerDisplay questions={questions} answers={answers} /> {/* Add AnswerDisplay Component */}
    </div>
  );
};

// New Component to Display Answers
const AnswerDisplay = ({ questions, answers }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Your Answers:</h2>
      {questions.map((question) => {
        const questionId = question.id;
        const answer = answers[questionId];

        return (
          <div key={questionId} className="mb-4 p-4 border rounded shadow-md">
            <p className="font-semibold">{question.text}</p>
            <p className="text-gray-700">
              {question.type === 'checkbox' && Array.isArray(answer)
                ? answer.join(', ') // Display checkbox answers as a comma-separated list
                : answer // Display other answer types directly
              }
            </p>
          </div>
        );
      })}
    </div>
  );
};

const QuestionnaireCreator = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'shortAnswer',
      text: 'What is your name?',
      options: [],
      required: true,
    },
    {
      id: 2,
      type: 'paragraph',
      text: 'Describe your experience.',
      options: [],
      required: false,
    },
    {
      id: 3,
      type: 'multipleChoice',
      text: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green'],
      required: true,
    },
    {
      id: 4,
      type: 'checkbox',
      text: 'Select your favorite fruits.',
      options: ['Apple', 'Banana', 'Orange'],
      required: false,
    },
    {
      id: 5,
      type: 'radioButton',
      text: 'Select your gender.',
      options: ['Male', 'Female', 'Other'],
      required: true,
    },
  ]);

    //Example initial answers
  const initialAnswers = {
    1: "John Doe",
    2: "I have a lot of experience.",
    3: "Blue",
    4: ["Apple", "Banana"],
    5: "Male",
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: 'shortAnswer',
      text: 'New Question',
      options: [],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div>
      <DisplayQuestionnaire questions={questions} initialAnswers={initialAnswers} />
    </div>
  );
};

export default QuestionnaireCreator;