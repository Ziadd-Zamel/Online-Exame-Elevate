import { cn } from "@/lib/utils/cn";

type AnswerCardProps = {
  history: HistoryItem;
};

const AnswerCard = ({ history }: AnswerCardProps) => {
  const { QID, chosenAnswer } = history;
  const correctAnswer = QID.correct;

  return (
    <div className="border max-w-sm lg:max-w-sm bg-gray-100 rounded-md overflow-hidden shadow-lg">
      <h3 className="font-semibold text-xl p-2 ">{QID.question}</h3>
      {/* Answer Options */}
      <div className="p-2 space-y-2">
        {QID.answers.map((answer) => {
          const isUserChoice = answer.key === chosenAnswer;
          const isCorrectAnswer = answer.key === correctAnswer;

          // background color
          let bgColor = "bg-gray-200";
          let circleColor = "border-blue-700";
          let circleFill = "bg-white";
          let borderColor = "border-transparent";

          //  wrong answer
          if (isUserChoice && !isCorrectAnswer) {
            bgColor = "bg-red-100";
            circleColor = "border-red-600";
            circleFill = "bg-red-600";
            borderColor = "border-red-600";
          }

          // Correct answer
          if (isCorrectAnswer) {
            bgColor = "bg-green-100";
            circleColor = "border-green-600";
            circleFill = "bg-green-600";
            borderColor = "border-green-600";
          }

          return (
            <div
              key={answer.key}
              className={cn(
                `flex items-center px-2.5 py-5 border ${borderColor} rounded-md`,
                bgColor,
                borderColor
              )}
            >
              <div
                className={cn(
                  `mr-2 w-4 h-4 border-2 rounded-full flex items-center justify-center`,
                  circleColor
                )}
              >
                {(isUserChoice || isCorrectAnswer) && (
                  <div
                    className={cn(`w-2.5 h-2.5 rounded-full`, circleFill)}
                  ></div>
                )}
              </div>
              <span className="text-sm">{answer.answer}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerCard;
