"use client";
// React and Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas & Types
import {
  PasswordResetFields,
  usePasswordResetSchema,
} from "@/lib/schemes/auth.schema";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Local Components
import TextField from "../../_components/text-field";
import PasswordField from "../../_components/password-field";

//Hooks
import useResetPassword from "../reset/_hooks/use-reset-password";

export default function VerifyPassword() {
  // Hooks
  const PasswordResetSchema = usePasswordResetSchema();
  const { resetPassword, isPending } = useResetPassword();
  const router = useRouter();

  // Form
  const form = useForm<PasswordResetFields>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
  });

  // Handle form submission
  function onSubmit(values: PasswordResetFields) {
    const sendData = {
      email: values.email,
      newPassword: values.newPassword,
    };
    resetPassword(sendData, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Emaill */}
        <TextField
          control={form.control}
          name="email"
          placeholder="Enter Email"
          autoComplete="email"
        />
        {/* Password */}
        <PasswordField
          control={form.control}
          name="newPassword"
          placeholder="Create Password"
          autoComplete="new-password"
        />
        {/* Confirm password */}
        <PasswordField
          control={form.control}
          name="rePassword"
          placeholder="Re-enter Password"
          autoComplete="new-password"
        />
        <div className="flex flex-col justify-end ">
          <p className="text-base text-end text-[#313131] font-medium -mt-2">
            Didn’t receive a code?{" "}
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
            {isPending ? "Reseting Password" : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
