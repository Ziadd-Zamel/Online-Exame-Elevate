'use client';

// React & Next.js
import { useRouter } from 'next/navigation';

// Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas & Types
import { LoginFields, useLoginSchema } from '@/lib/schemes/auth.schema';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import TextField from '../../_components/text-field';
import PasswordField from '../../_components/password-field';

export default function LoginForm() {
  const router = useRouter();
  // Hooks
  const LoginSchema = useLoginSchema();

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFields) {
    console.log(values);
    router.push('/auth/login');
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
        <div className="flex flex-col ">
          <Link
            className="no-underline text-end -mt-2 text-primaryMain "
            href="/auth/password/email"
          >
            Recover Password ?
          </Link>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-14 mt-10 rounded-3xl shadow-main bg-primaryMain text-white hover:bg-primaryMain"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
