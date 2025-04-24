"use client";

// React & Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas & Types
import {
  RegistrationFields,
  useRegisterSchema,
} from "@/lib/schemes/auth.schema";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Local Components
import TextField from "../../_components/text-field";
import PasswordField from "../../_components/password-field";

// Hooks
import useRegister from "../_hooks/use-register";

export default function RegisterForm() {
  // Hooks
  const router = useRouter();
  const registerSchema = useRegisterSchema();
  const { register, error, isPending } = useRegister();

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      rePassword: "",
      phone: "01091732409",
    },
  });

  // Handles form submission
  async function onSubmit(values: RegistrationFields) {
    register(
      {
        ...values,
      },
      {
        onSuccess: (data) => {
          const [payload, error] = data;
          if (error) {
            // Check for specific error messages and set manual validation errors
            if (error?.toLowerCase().includes("username already exists")) {
              form.setError("username", {
                type: "manual",
                message: "Username already exists",
              });
            }
            if (error?.toLowerCase().includes("email already exists")) {
              form.setError("email", {
                type: "manual",
                message: "Email already exists",
              });
            }
            console.log(error);
            return;
          }
          // If registration is successful, navigate to login page
          if (payload?.message.toLocaleLowerCase() === "success") {
            router.push("/auth/login");
          }
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* First name */}
        <TextField
          control={form.control}
          name="firstName"
          placeholder="First Name"
          autoComplete="given-name"
        />
        {/* Last name */}
        <TextField
          control={form.control}
          name="lastName"
          placeholder="Last Name"
          autoComplete="family-name"
        />
        {/* User name */}
        <TextField
          control={form.control}
          name="username"
          placeholder="User Name"
          autoComplete="user-name"
        />
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
        {/* Confirm password */}
        <PasswordField
          control={form.control}
          name="rePassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
        <div>
          <p className="text-base text-center text-[#313131] font-medium -mt-2">
            Already have an account?
            <Link
              className="no-underline  text-primaryMain "
              href={"/auth/login"}
            >
              Login
            </Link>
          </p>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 mt-10 rounded-3xl shadow-secondary bg-primaryMain text-white hover:bg-primaryMain"
            disabled={isPending}
          >
            {isPending ? "Loading" : "Create Account"}
          </Button>
          {/* Display error message */}
          {error && (
            <p className="text-red-500 text-center mt-2">{error.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
}
