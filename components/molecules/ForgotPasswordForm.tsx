'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/atoms/form';
import { ForgotPasswordFormValidation } from '@/lib/validation';

import CustomFormField, { FormFieldType } from './CustomFormField';
import SubmitButton from './SubmitButton';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/button';
import { httpRequest } from '@/lib/apis/httpRequest';
import { ApiUrl } from '@/constants/api-url';
import { toast } from '@/hooks/use-toast';
import BackHomeBreadcrumb from '@/components/organisms/breadcrumbs/BackHomeBreadcrumb';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ForgotPasswordFormValidation>,
  ) => {
    setIsLoading(true);

    try {
      const { data } = await httpRequest.post(ApiUrl.FORGOT_PASSWORD, {
        email: values.email,
      });
      if (data.result) {
        toast({
          title: 'Email sent',
          description: 'We have sent you an email to reset your password.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <BackHomeBreadcrumb />
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the email address linked to your account, and we’ll send you a link to reset your password.
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



            <SubmitButton isLoading={isLoading} className="w-full bg-blue-700">
              Send Reset Link
            </SubmitButton>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {''}
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
