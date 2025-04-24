declare type Question = {
  answers: {
    answer: string;
    key: string;
  }[];
  type: "single_choice" | "multiple_choice";
  question: string;
  correct: string;
  subject: {
    name: string;
    icon: string;
  } & DatabaseProperties;
  exam: Exam;
} & DatabaseProperties;

declare type HistoryQuestion = {
  _id: string;
  question: string;
  answers: {
    answer: string;
    key: string;
  }[];
  type: "single_choice" | "multiple_choice";
  correct: string;
  subject: string;
  exam: string;
  createdAt: string;
};

declare type HistoryItem = {
  _id: string;
  checkAnswer: "correct" | "incorrect";
  QID: HistoryQuestion;
  user: string;
  chosenAnswer: string;
  avgAnswerTime: string;
  createdAt: string;
};
