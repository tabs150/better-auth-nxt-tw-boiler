import { LoginForm } from "@/components/forms/login-form";
import { SignInOauthButton } from '@/components/signin-oauth-button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex items-center justify-center h-dvh'>
      <div className='flex justify-center gap-8 flex-col items-center'>
        <h1 className='text-6xl font-bold'>Better Auth Pro</h1>

        <LoginForm />

        <p className='text-muted-foreground text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/register' className='hover:text-foreground'>
            Register
          </Link>
        </p>

        <hr className='max-w-sm' />
      </div>
      <div className='flex flex-col max-w-sm gap-4'>
        <SignInOauthButton provider='google' />
      </div>
    </div>
  );
}