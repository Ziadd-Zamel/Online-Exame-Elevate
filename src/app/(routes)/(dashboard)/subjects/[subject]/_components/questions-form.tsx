"use client";
//React
import { useState } from "react";

// External libraries
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Local Components
import ExamDuration from "./exam-duration";

//Hooks
import useCheckQuestions from "../_hooks/use-check-questions";

//utilities
import { cn } from "@/lib/utils/cn";

// Types and Schemas
import { AnswerFields, ExamSchema } from "@/lib/schemes/exam.schema";
type QuestionsFormProps = {
  questions: Question[];
  exam: Exam;
  onExamComplete: (results: CheckResponse) => void;
  onPrevious: () => void;
};

export default function QuestionsForm({
  questions,
  exam,
  onExamComplete,
  onPrevious,
}: QuestionsFormProps) {
  // State
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");

  // Mutation
  const { isPending, checkQuestions } = useCheckQuestions();

  // Form
  const form = useForm<AnswerFields>({
    resolver: zodResolver(ExamSchema),
  });

  // Variables
  // Get the current question
  const currentQuestion = questions[step];
  // Check if the quiz is short
  const isShortQuiz = questions.length <= 5;
  // Determine if the current question is the last one
  const isLastQuestion = step === questions.length - 1;
  // Disable the "Next" button if still checking answers or if the current question has no selected answer
  const isNextDisabled = (() => {
    if (isPending) return true;

    const currentAnswer = form.getValues(`answers.${step}`);
    return !currentAnswer?.correct;
  })();

  // Functions
  const onSubmit: SubmitHandler<AnswerFields> = (values) => {
    checkQuestions(values, {
      onSuccess: (data) => {
        // Notify parent component that the exam is completed
        onExamComplete(data);

        // Loop through incorrect questions and mark them with correct answer as an error
        data.WrongQuestions.forEach((question) => {
          let questionIndex: number | null = null;

          form.getValues("answers").find((answer, i) => {
            if (answer.questionId === question.QID) {
              questionIndex = i;
              return true;
            } else {
              return false;
            }
          });

          // Show correct answer as a form error for review
          if (questionIndex) {
            form.setError(`answers.${questionIndex}`, {
              message: question.correctAnswer,
            });
          }
        });
      },
    });
  };

  // Handle clicking "Next" or submitting the form
  const handleNextOrSubmit = () => {
    // Submit the full form when on the last question
    if (isLastQuestion) {
      form.handleSubmit(onSubmit)();
    } else {
      // Otherwise, just move to the next question
      const nextAnswer = form.getValues(`answers.${step + 1}`);
      if (!nextAnswer?.correct) {
        setAnswer("");
      } else {
        setAnswer(nextAnswer.correct);
      }
      setStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (step === 0) {
      // Go back to the previous Screen (Instructions)
      onPrevious();
      return;
    }
    // go back to the previous question
    const prevAnswer = form.getValues(`answers.${step - 1}`);
    if (!prevAnswer?.correct) {
      setAnswer("");
    } else {
      setAnswer(prevAnswer.correct);
    }

    setStep((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col gap-4 grow max-w-2xl min-h-[500px] py-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        {/* Question number */}
        <p className="text-sm font-medium text-primaryMain">
          Question {step + 1} of {questions.length}
        </p>

        {/* Duration */}
        <ExamDuration
          duration={exam.duration}
          onTimechange={(date) => form.setValue("time", date.getMinutes())}
        />
      </header>

      {/* Steps */}
      <ul
        className={cn(
          "flex items-center mt-2 ",
          !isShortQuiz && "justify-between ",
          isShortQuiz && "gap-5"
        )}
      >
        {Array.from({ length: questions.length }, (_, i) => i).map((i) => (
          <li
            key={i}
            className={cn(
              "size-1.5 bg-gray-300 rounded-full transition-colors",
              step >= i && "bg-primaryMain",
              isShortQuiz && "size-2.5"
            )}
          />
        ))}
      </ul>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grow flex flex-col mt-4 "
        >
          <FormField
            control={form.control}
            name={`answers.${step}`}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="text-xl font-medium mb-3">
                  {currentQuestion.question}
                </FormLabel>

                {/* Options */}
                <FormControl>
                  <RadioGroup
                    disabled={isPending}
                    value={answer}
                    onValueChange={(value) => {
                      setAnswer(value);
                      field.onChange({
                        questionId: currentQuestion._id,
                        correct: value,
                      });
                    }}
                    name={currentQuestion._id}
                    className="flex flex-col space-y-1"
                  >
                    {currentQuestion.answers.map((answer) => (
                      <FormItem
                        key={answer.key}
                        className="flex px-3 py-2 rounded-md items-center space-x-3 space-y-0 bg-gray-100"
                      >
                        {/* Radio */}
                        <FormControl>
                          <RadioGroupItem value={answer.key} />
                        </FormControl>

                        {/* Label */}
                        <FormLabel className="font-normal grow py-2">
                          {answer.answer}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-between items-center mt-auto gap-11">
            {/* Prev */}
            <Button
              type="button"
              variant={"outline"}
              className="w-1/2 border-primaryMain text-primaryMain rounded-full hover:bg-primaryMain hover:text-white transition-colors duration-300"
              disabled={isPending}
              onClick={handlePrev}
            >
              Previous
            </Button>

            {/* Next */}
            <Button
              className="w-1/2 bg-primaryMain rounded-full hover:bg-primaryDark transition-colors duration-300"
              disabled={isNextDisabled}
              type={"button"}
              onClick={handleNextOrSubmit}
            >
              {isPending ? "Checking your answers..." : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
