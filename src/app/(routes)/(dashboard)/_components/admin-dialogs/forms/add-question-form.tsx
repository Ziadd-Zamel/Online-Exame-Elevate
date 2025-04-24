"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeftCircleIcon } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer1: z.string().min(1, "Answer 1 is required"),
  answer2: z.string().min(1, "Answer 2 is required"),
  answer3: z.string().min(1, "Answer 3 is required"),
  answer4: z.string().min(1, "Answer 4 is required"),
});

type FormValues = z.infer<typeof formSchema>;

const AddQuestionForm = (): JSX.Element => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleAddAnotherQuestion = () => {
    console.log("Add another question clicked");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full bg-white rounded-2xl py-3">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-2 self-stretch w-full">
              <ArrowLeftCircleIcon className="w-6 h-6 text-primaryMain" />
              <h2 className="flex-1 font-bold text-main text-2xl text-primaryMain">
                Add question
              </h2>
            </div>
            <div className="flex flex-col items-start w-full gap-4 px-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-gray-500 -mb-2.5">
                      Add Question
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" rounded-2xl border border-gray-500 font-semibold focus:border-blue-500 outline-none focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center w-full gap-2">
                  <FormField
                    control={form.control}
                    name={`answer${num}` as keyof FormValues}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold text-gray-500 -mb-2.5">
                          Add Answer {num}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className=" rounded-2xl border border-gray-500 font-semibold focus:border-blue-500 outline-none focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between w-full gap-4 px-4">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-lg w-1/4 border border-primaryMain font-medium text-primaryMain text-sm"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleAddAnotherQuestion}
                className="h-10 rounded-lg w-1/2 bg-blue-500 font-bold text-white text-base"
              >
                Add Another question
              </Button>
              <Button
                type="submit"
                className="h-10 rounded-lg w-1/4 bg-primaryMain font-bold text-white text-base"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default AddQuestionForm;
