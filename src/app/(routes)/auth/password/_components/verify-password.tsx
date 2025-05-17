"use client";

// React & Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas & Types
import {
  useVerifyPasswordSchema,
  VerifyPasswordFields,
} from "@/lib/schemes/auth.schema";
// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Local Components
import TextField from "../../_components/text-field";

// Hooks
import useVerifyCode from "../verify/_hooks/use-verify-code";

export default function VerifyPassword() {
  // Hooks
  const verifyPasswordSchema = useVerifyPasswordSchema();
  const { verfiyCode, isPending } = useVerifyCode();
  const route = useRouter();

  // Form
  const form = useForm<VerifyPasswordFields>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  // Handle form submission
  function onSubmit(values: VerifyPasswordFields) {
    verfiyCode(
      {
        resetCode: values.resetCode,
      },
      {
        onSuccess: (data) => {
          const [payload, error] = data;
          if (error) {
            form.setError("resetCode", {
              message: "Reset code is invalid or has expired",
            });
            return;
          }
          if (payload.status === "Success") {
            route.push("/auth/password/reset");
          }
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Verification Code */}
        <TextField
          control={form.control}
          name="resetCode"
          placeholder="Enter Code"
          autoComplete="one-time-code"
        />

        <div className="flex flex-col justify-end ">
          <p className="text-base text-end text-[#313131] font-medium -mt-2">
            Didn&apos;t receive a code?{" "}
            <Link
              className="no-underline text-end -mt-2 text-primaryMain "
              href="/auth/password/email"
            >
              Resend
            </Link>
          </p>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-14 mt-10 rounded-3xl shadow-main bg-primaryMain text-white hover:bg-primaryMain"
            disabled={isPending}
          >
            {isPending ? "Verfying" : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
