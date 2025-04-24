// React and Next
import React from "react";
import Image from "next/image";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types
interface InstructionsProps {
  examResults: CheckResponse;
  onBack?: () => void;
  onShowResults?: () => void;
}

export const ResultsScreen = ({
  examResults,
  onBack,
  onShowResults,
}: InstructionsProps): JSX.Element => {
  const percentage = Math.round(
    (examResults.correct / (examResults.correct + examResults.wrong)) * 100
  );

  return (
    <div className="flex flex-col gap-12 ">
      <div className="p-0">
        <h6 className="font-medium text-xl pl-2 pt-2">Your score</h6>
      </div>

      <div className="p-0 flex items-center justify-center gap-20 w-full">
        <div className="relative w-[132px] h-[132px] flex items-center justify-center">
          <Image
            className="absolute w-full h-full"
            alt="Circular progress indicator"
            src="/assets/circular-determinate.svg"
            width={100}
            height={0}
          />
          <span className="font-medium text-xl">{percentage}%</span>
        </div>

        <div className="flex flex-col w-[170px] gap-2">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-2xl text-blue-700">Correct</span>
            <Badge
              variant="outline"
              className="w-8 h-8 rounded-[110px] flex items-center justify-center border-blue-900 p-0"
            >
              <span className="font-medium text-blue-800">
                {examResults.correct}
              </span>
            </Badge>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-2xl text-red-700">Incorrect</span>
            <Badge
              variant="outline"
              className="w-8 h-8 rounded-[90px] border-red-700 flex items-center justify-center p-0"
            >
              <span className="font-medium text-red-700">
                {examResults.wrong}
              </span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-0 flex gap-4">
        <Button
          variant="outline"
          className="w-1/2 border-primaryMain py-3 text-primaryMain rounded-full hover:bg-primaryMain hover:text-white transition-colors duration-300"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="w-1/2 bg-primaryMain rounded-full hover:bg-primaryDark transition-colors duration-300"
          onClick={onShowResults}
        >
          Show results
        </Button>
      </div>
    </div>
  );
};
