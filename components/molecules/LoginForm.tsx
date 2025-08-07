'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/atoms/form';
import { UserFormValidation } from '@/lib/validation';

import CustomFormField, { FormFieldType } from './CustomFormField';
import { Mail } from 'lucide-react';
import SubmitButton from './SubmitButton';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useRouter } from 'next/navigation';
import { httpRequest } from '@/lib/apis/httpRequest';
import { ApiUrl } from '@/constants/api-url';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types';
import BackHomeBreadcrumb from '@/components/organisms/breadcrumbs/BackHomeBreadcrumb';
import Link from 'next/link';

export const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { setUser, setIsLoggedIn, setAccessToken } = useUser();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      const { data } = await httpRequest.post(ApiUrl.LOGIN, user);
      setIsLoggedIn(true);
      setAccessToken(data?.token);

      const [userResponse] = await Promise.all([
        httpRequest.get(ApiUrl.GET_PROFILE),
      ]);
      setUser(userResponse.data?.result || data?.user);

      if (data?.user?.role.name === Role.Admin) {
        router.refresh();
        const timestamp = new Date().getTime();
        router.push(`/manage/dashboard?t=${timestamp}`);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.errors || error);
      toast.toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  if (isForgotPassword) {
    return <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />;
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <BackHomeBreadcrumb />
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-6"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="user@gmail.com"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeholder="******"
              iconAlt="password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form.control}
                  name="keepLoggedIn"
                  label="Keep me logged in"
                />
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton isLoading={isLoading} className="w-full bg-blue-700">
              Login
            </SubmitButton>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

        </Form>

      </div>
    </div>
  );
};
