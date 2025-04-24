"use client";
import { ArrowLeftCircleIcon, PlusIcon } from "lucide-react";
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

const formSchema = z.object({
  diplomaName: z.string().min(1, "Diploma name is required"),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const AddDiplomaForm = (): JSX.Element => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diplomaName: "",
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full bg-white rounded-2xl py-3">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center justify-center gap-2 self-stretch w-full">
              <ArrowLeftCircleIcon className="w-6 h-6 text-primaryMain" />
              <h2 className="flex-1 font-bold text-main text-2xl text-primaryMain ">
                Add Diploma
              </h2>
            </div>

            <div className="flex items-start justify-between  w-full">
              <div className="flex flex-col items-start gap-2 w-20">
                <FormLabel className=" font-semibold text-gray-500 -mb-1">
                  Add Photo
                </FormLabel>
                <div className="w-12 h-10 bg-white rounded-3xl border border-gray-500 flex items-center justify-center">
                  <PlusIcon className="w-4 h-4" />
                </div>
              </div>
              <FormField
                control={form.control}
                name="diplomaName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-2 max-w-56 ">
                    <FormLabel className=" font-semibold text-gray-500 -mb-2.5">
                      Diploma Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-2xl border border-gray-500 font-semibold focus:border-blue-500 outline-none focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-2 max-w-56 ">
                    <FormLabel className=" font-semibold text-gray-500 -mb-2.5">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-2xl border border-gray-500 font-semibold focus:border-blue-500 outline-none focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between w-full gap-5">
              <Button
                type="button"
                variant="outline"
                className=" h-8 rounded-lg w-1/2 sm:w-48 border border-primaryMain font-medium text-primaryMain text-sm "
              >
                Back
              </Button>
              <Button
                type="submit"
                className="h-8 rounded-lg w-1/2 sm:w-48 bg-primaryMain font-bold text-white text-base "
              >
                ADD
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
