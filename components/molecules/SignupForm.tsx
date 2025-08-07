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

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      email: '',
      password: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      contactPerson: '',
      contactEmail: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormValidation>) => {
    setIsLoading(true);

    try {
      const customer = {
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        address: values.address,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: values.country,
        phone: values.phone,
        contactPerson: values.contactPerson,
        contactEmail: values.contactEmail,
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

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <section className="mb-3">
          <h1
            className={cn(
              'text-base font-bold mb-3 border-b border-gray-200',
              "after:content-[''] after:w-[50%] after:border-[0.5px] after:border-blue-700 after:block after:mt-2",
            )}
          >
            Create an account
          </h1>
          <p className="text-blue-700 text-sm mt-0">
            Insert your account information:
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="companyName"
          label="Company"
          placeholder="Company"
          iconSrc="/assets/icons/company.svg"
          iconAlt="company"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="******"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="Address"
          placeholder="Address"
          iconSrc="/assets/icons/address.svg"
          iconAlt="address"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="city"
          label="City"
          placeholder="City"
          iconSrc="/assets/icons/city.svg"
          iconAlt="city"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="state"
          label="State"
          placeholder="State"
          iconSrc="/assets/icons/state.svg"
          iconAlt="state"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="zip"
          label="Zip"
          placeholder="Zip"
          iconSrc="/assets/icons/zip.svg"
          iconAlt="zip"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="country"
          label="Country"
          placeholder="Country"
          iconSrc="/assets/icons/country.svg"
          iconAlt="country"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Phone"
          iconSrc="/assets/icons/phone.svg"
          iconAlt="phone"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="contactPerson"
          label="Contact Person"
          placeholder="Contact Person"
          iconSrc="/assets/icons/contact.svg"
          iconAlt="contact-name"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="contactEmail"
          label="Contact Email"
          placeholder="Contact Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="contact-email"
        />

        <div className="flex flex-col gap-2">
          <p className="text-sm mt-0">
            If you have an account, please&nbsp;
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={handleLogin}
            >
              Login Here
            </span>
          </p>
        </div>

        <SubmitButton isLoading={isLoading} className="w-full bg-blue-700">
          Register
        </SubmitButton>
      </form>
    </Form>
  );
};
