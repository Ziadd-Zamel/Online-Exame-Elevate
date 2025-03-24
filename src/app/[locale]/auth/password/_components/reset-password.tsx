'use client';
// React and Next.js
import { useRouter } from 'next/navigation';

// Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas & Types
import {
  PasswordResetFields,
  usePasswordResetSchema,
} from '@/lib/schemes/auth.schema';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import PasswordField from '../../_components/password-field';
import { Link } from '@/i18n/routing';

export default function VerifyPassword() {
  const router = useRouter();

  // Hooks
  const PasswordResetSchema = usePasswordResetSchema();

  // Form
  const form = useForm<PasswordResetFields>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  });

  function onSubmit(values: PasswordResetFields) {
    console.log(values);
    router.push('/auth/login');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Password */}
        <PasswordField
          control={form.control}
          name="password"
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
            Didn’t receive a code?{' '}
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
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
