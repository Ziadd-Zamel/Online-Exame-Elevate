'use client';

// React & Next.js
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas & Types
import {
  RegistrationFields,
  useRegisterSchema,
} from '@/lib/schemes/auth.schema';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import TextField from '../../_components/text-field';
import PasswordField from '../../_components/password-field';

export default function RegisterForm() {
  const router = useRouter();

  // Hooks
  const registerSchema = useRegisterSchema();

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
    },
  });

  function onSubmit(values: RegistrationFields) {
    console.log(values);
    router.push('/auth/login');
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
              href={'/auth/login'}
            >
              Login
            </Link>
          </p>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-14 mt-10 rounded-3xl shadow-secondary bg-primaryMain text-white hover:bg-primaryMain"
          >
            Create Account{' '}
          </Button>
        </div>
      </form>
    </Form>
  );
}
