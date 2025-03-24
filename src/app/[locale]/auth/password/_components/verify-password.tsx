'use client';

// React & Next.js
import { useRouter } from 'next/navigation';

// Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas & Types
import {
  useVerifyPasswordSchema,
  VerifyPasswordFields,
} from '@/lib/schemes/auth.schema';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import TextField from '../../_components/text-field';

export default function VerifyPassword() {
  const router = useRouter();
  // Hooks
  const verifyPasswordSchema = useVerifyPasswordSchema();

  // Form
  const form = useForm<VerifyPasswordFields>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      verify: '',
    },
  });

  function onSubmit(values: VerifyPasswordFields) {
    console.log(values);
    router.push('/auth/password/reset');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Verification Code */}
        <TextField
          control={form.control}
          name="verify"
          placeholder="Enter Code"
          autoComplete="one-time-code"
        />

        <div className="flex flex-col justify-end ">
          <p className="text-base text-end text-[#313131] font-medium -mt-2">
            Didn't receive a code?{' '}
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
