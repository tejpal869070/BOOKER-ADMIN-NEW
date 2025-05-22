import React from 'react';

const quizData = [
  {
    match: "India vs Pakistan",
    question: "Who scored the most runs in the last IND vs PAK match?",
    options: [
      { text: "Virat Kohli", prize: "₹5,000" },
      { text: "Babar Azam", prize: "₹3,000" },
    ],
  },
  {
    match: "Australia vs England",
    question: "Who took the most wickets in the last Ashes Test?",
    options: [
      { text: "Pat Cummins", prize: "₹4,000" },
      { text: "Ben Stokes", prize: "₹2,500" },
    ],
  },
  {
    match: "South Africa vs New Zealand",
    question: "Who hit the most sixes?",
    options: [
      { text: "David Miller", prize: "₹3,000" },
      { text: "Kane Williamson", prize: "₹2,000" },
    ],
  },
  {
    match: "India vs Australia",
    question: "Who scored a century?",
    options: [
      { text: "Rohit Sharma", prize: "₹5,500" },
      { text: "Steve Smith", prize: "₹4,000" },
    ],
  },
  {
    match: "Sri Lanka vs Bangladesh",
    question: "Best all-rounder performance?",
    options: [
      { text: "Shakib Al Hasan", prize: "₹4,500" },
      { text: "Wanindu Hasaranga", prize: "₹4,000" },
    ],
  },
  {
    match: "India vs Afghanistan",
    question: "Most economical bowler?",
    options: [
      { text: "Rashid Khan", prize: "₹3,500" },
      { text: "Jasprit Bumrah", prize: "₹4,000" },
    ],
  },
  {
    match: "Pakistan vs Sri Lanka",
    question: "Highest partnership?",
    options: [
      { text: "Rizwan & Babar", prize: "₹5,000" },
      { text: "Kusal Mendis & Nissanka", prize: "₹4,000" },
    ],
  },
  {
    match: "England vs South Africa",
    question: "Best strike rate?",
    options: [
      { text: "Jos Buttler", prize: "₹3,800" },
      { text: "Heinrich Klaasen", prize: "₹3,600" },
    ],
  },
  {
    match: "New Zealand vs India",
    question: "Most boundaries?",
    options: [
      { text: "Devon Conway", prize: "₹3,200" },
      { text: "Shubman Gill", prize: "₹4,200" },
    ],
  },
  {
    match: "West Indies vs Zimbabwe",
    question: "Highest score?",
    options: [
      { text: "Nicholas Pooran", prize: "₹4,500" },
      { text: "Sikandar Raza", prize: "₹3,700" },
    ],
  },
];

const Quiz = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {quizData.map((quiz, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 text-white text-center py-4">
            <h2 className="text-xl font-bold">{quiz.match}</h2>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Q: {quiz.question}</h3>

            <div className="flex justify-between mb-4">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  className="w-[48%] flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-green-100"
                >
                  <span>{opt.text}</span>
                  <span className="text-green-600 font-bold">{opt.prize}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between space-x-2">
              <button className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 rounded">
                Upload Result
              </button>
              <button className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                Cancel Match
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
