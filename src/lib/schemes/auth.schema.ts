import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useRegisterSchema = () => {
  return z
    .object({
      firstName: z
        .string({ required_error: 'First name is required' })
        .min(1, 'First name is required'),
      lastName: z
        .string({ required_error: 'Last name is required' })
        .min(1, 'Last name is required'),
      email: z
        .string({ required_error: 'Email address is required' })
        .email({ message: 'Please enter a valid email address' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
      rePassword: z.string({ required_error: 'Please confirm your password' }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords don't match",
      path: ['rePassword'],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z.string({ required_error: t('email-required') }).email({
      message: t('email-invalid'),
    }),
    password: z
      .string({ required_error: t('password-required') })
      .min(1, t('password-required')),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
export const useSendEmailSchema = () => {
  return z.object({
    email: z
      .string({ required_error: 'Email address is required' })
      .email({ message: 'Please enter a valid email address' }),
  });
};

export type SendEmailFields = z.infer<ReturnType<typeof useSendEmailSchema>>;
export const useVerifyPasswordSchema = () => {
  return z.object({
    verify: z
      .string({ required_error: 'You should enter the code' })
      .min(6, { message: 'Verify code is 6 characters' }),
  });
};

export type VerifyPasswordFields = z.infer<
  ReturnType<typeof useVerifyPasswordSchema>
>;
export const usePasswordResetSchema = () => {
  return z
    .object({
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
      rePassword: z.string({ required_error: 'Please confirm your password' }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords don't match",
      path: ['rePassword'],
    });
};

export type PasswordResetFields = z.infer<
  ReturnType<typeof usePasswordResetSchema>
>;
