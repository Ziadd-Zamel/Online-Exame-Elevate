"use client";
// React & Next.js
import Link from "next/link";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Local Components
import TextField from "../../_components/text-field";
import PasswordField from "../../_components/password-field";

// Hooks
import useLogin from "../_hooks/use-login";

// Schemas & Types
import { LoginFields, useLoginSchema } from "@/lib/schemes/auth.schema";

export default function LoginForm() {
  // Hooks
  const LoginSchema = useLoginSchema();
  const { login, isPending, error } = useLogin();

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: LoginFields) {
    login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Email */}
        <TextField
          control={form.control}
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
        {/* Password */}
        <PasswordField
          control={form.control}
          name="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <div className="flex flex-col">
          <Link
            className="no-underline text-end -mt-2 text-primaryMain"
            href="/auth/password/email"
          >
            Recover Password ?
          </Link>

          {error?.message && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}

          <Button
            type="submit"
            className="w-full h-14 mt-8 rounded-3xl shadow-main bg-primaryMain text-white hover:bg-primaryMain"
            disabled={isPending}
          >
            {isPending ? "Loging" : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
