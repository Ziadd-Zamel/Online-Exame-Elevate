"use client";
// React & Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas & Types
import { SendEmailFields, useSendEmailSchema } from "@/lib/schemes/auth.schema";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Local Components
import TextField from "../../_components/text-field";
import useSendEmail from "../email/_hooks/use-sendEmail";

export default function SendEmail() {
  // Hooks
  const SendEmailSchema = useSendEmailSchema();
  const { send, isPending } = useSendEmail();
  const route = useRouter();

  // Form
  const form = useForm<SendEmailFields>({
    resolver: zodResolver(SendEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: SendEmailFields) {
    const email = values;
    send(email, {
      onSuccess: (data) => {
        const [payload, error] = data;
        if (error) {
          form.setError("email", {
            message: "There is no account with this email address",
          });
          return;
        }
        if (payload.message === "success") {
          route.push("/auth/password/verify");
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Email */}
        <TextField
          control={form.control}
          name="email"
          placeholder="Enter Email"
          autoComplete="email"
        />

        <div className="flex flex-col ">
          <Link
            className="no-underline text-end -mt-2 text-primaryMain "
            href="/auth/password/email"
          >
            Recover Password ?
          </Link>
          <Button
            type="submit"
            className="w-full h-14 mt-10 rounded-3xl shadow-main bg-primaryMain text-white hover:bg-primaryMain"
            disabled={isPending}
          >
            {isPending ? "Sending" : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
