'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/atoms/form';
import { SignupFormValidation } from '@/lib/validation';

import CustomFormField, { FormFieldType } from './CustomFormField';
import SubmitButton from './SubmitButton';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { httpRequest } from '@/lib/apis/httpRequest';
import { ApiUrl } from '@/constants/api-url';
import { toast } from '@/hooks/use-toast';
import BackHomeBreadcrumb from '@/components/organisms/breadcrumbs/BackHomeBreadcrumb';
import Link from 'next/link';

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormValidation>) => {
    setIsLoading(true);

    try {
      const customer = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      const newCustomer = await httpRequest.post(ApiUrl.REGISTER, customer);
      if (newCustomer) {
        router.push('/login');
      }
      toast({
        title: 'Success',
        description: 'Account created successfully',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <BackHomeBreadcrumb />
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign up!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeholder="******"
            />

            <div className="flex items-center gap-3">
              <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  href="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <SubmitButton isLoading={isLoading} className="w-full bg-blue-700">
              Register
            </SubmitButton>
          </form>
        </Form>
      </div>

    </div>
  );
};
