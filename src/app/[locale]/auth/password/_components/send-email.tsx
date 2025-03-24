'use client';
// React & Next.js
import { useRouter } from 'next/navigation';

// Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas & Types
import { SendEmailFields, useSendEmailSchema } from '@/lib/schemes/auth.schema';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import TextField from '../../_components/text-field';

export default function SendEmail() {
  const router = useRouter();
  // Hooks
  const SendEmailSchema = useSendEmailSchema();

  // Form
  const form = useForm<SendEmailFields>({
    resolver: zodResolver(SendEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: SendEmailFields) {
    console.log(values);
    router.push('/auth/password/verify');
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
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
