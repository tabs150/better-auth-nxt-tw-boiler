'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormFields = z.infer<typeof schema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: 'test@email.com',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      // throw new Error();
      console.log(data);
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'This email is already registered or invalid.',
      });
    }
  };

  return (
    <form
      className='max-w-sm w-full space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input {...register('email')} type='email' id='email' name='email' />
      </div>
      {errors.email && (
        <div className='text-destructive'>
          <span>{errors.email.message}</span>
        </div>
      )}

      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          {...register('password')}
          type='password'
          id='password'
          name='password'
        />
      </div>
      {errors.password && (
        <div className='text-destructive'>
          <span>{errors.password.message}</span>
        </div>
      )}

      <button
        disabled={isSubmitting}
        type='submit'
        className='w-full bg-blue-500 text-white py-2 rounded'
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      {errors.root && (
        <div className='text-destructive'>
          <span>{errors.root.message}</span>
        </div>
      )}
    </form>
  );
};
