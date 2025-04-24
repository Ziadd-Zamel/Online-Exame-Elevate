import { z } from "zod";

// Registration schema for validating user registration form
export const useRegisterSchema = () => {
  return z
    .object({
      username: z.string().min(1, "User Name name is required"),
      firstName: z
        .string({ required_error: "First name is required" })
        .min(1, "First name is required"),
      lastName: z
        .string({ required_error: "Last name is required" })
        .min(1, "Last name is required"),
      email: z
        .string({ required_error: "Email address is required" })
        .email({ message: "Please enter a valid email address" }),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
        ),
      rePassword: z.string({ required_error: "Please confirm your password" }),
      phone: z.string().optional(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords don't match",
      path: ["rePassword"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

// Login schema for validating login form inputs
export const useLoginSchema = () => {
  return z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;

// Schema for sending a password reset email
export const useSendEmailSchema = () => {
  return z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Please enter a valid email address" }),
  });
};

export type SendEmailFields = z.infer<ReturnType<typeof useSendEmailSchema>>;

// Schema for verifying the password reset code
export const useVerifyPasswordSchema = () => {
  return z.object({
    resetCode: z
      .string({ required_error: "You should enter the code" })
      .min(6, { message: "Verify code is 6 characters" }),
  });
};

export type VerifyPasswordFields = z.infer<
  ReturnType<typeof useVerifyPasswordSchema>
>;

// Schema for resetting the password after code verification
export const usePasswordResetSchema = () => {
  return z
    .object({
      email: z
        .string({ required_error: "Email address is required" })
        .email({ message: "Please enter a valid email address" }),
      newPassword: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
        ),
      rePassword: z.string().optional(),
    })
    .refine((data) => data.newPassword.trim() === data.rePassword, {
      message: "Passwords don't match",
      path: ["rePassword"],
    });
};

export type PasswordResetFields = z.infer<
  ReturnType<typeof usePasswordResetSchema>
>;
