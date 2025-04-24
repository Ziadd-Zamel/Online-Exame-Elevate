"use client";

import React, { useState } from "react";
// Local Components
import QuestionsForm from "./questions-form";
import { ResultsScreen } from "./results-screen";

// Enum for managing screen states
enum DialogState {
  INSTRUCTIONS,
  QUESTIONS,
  RESULTS,
}

type ExamFlowProps = {
  exam: Exam;
  questions: Question[];
};

export default function ExamFlow({ exam, questions }: ExamFlowProps) {
  // States
  const [currentScreen, setCurrentScreen] = useState<DialogState>(
    DialogState.INSTRUCTIONS
  );
  const [examResults, setExamResults] = useState<CheckResponse>();

  const handleExamComplete = (results: CheckResponse) => {
    setExamResults(results);
    setCurrentScreen(DialogState.RESULTS);
  };

  return (
    <div>
      {/* INSTRUCTIONS */}
      <div
        className={currentScreen === DialogState.INSTRUCTIONS ? "" : "hidden"}
      >
        <div className="py-6 flex-1">
          <h6 className="text-xl font-medium mb-3">Instructions</h6>
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-lg font-medium text-gray-800">
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li className="text-lg font-medium text-gray-800">
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li className="text-lg font-medium text-gray-800">
              Lorem ipsum dolor sit amet consectetur.
            </li>
            <li className="text-lg font-medium text-gray-800">
              Lorem ipsum dolor sit amet consectetur.
            </li>
          </ul>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentScreen(DialogState.QUESTIONS)}
            className="bg-primaryMain py-2 text-white px-10 rounded-full w-full"
          >
            Start
          </button>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className={currentScreen === DialogState.QUESTIONS ? "" : "hidden"}>
        <QuestionsForm
          exam={exam}
          questions={questions}
          onExamComplete={handleExamComplete}
          onPrevious={() => setCurrentScreen(DialogState.INSTRUCTIONS)}
        />
      </div>

      {/* RESULTS */}
      <div className={currentScreen === DialogState.RESULTS ? "" : "hidden"}>
        {examResults && (
          <ResultsScreen
            examResults={examResults}
            onBack={() => setCurrentScreen(DialogState.QUESTIONS)}
          />
        )}
      </div>
    </div>
  );
}
