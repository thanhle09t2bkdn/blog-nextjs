"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/atoms/form";
import { ForgotPasswordFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";
import { httpRequest } from "@/lib/apis/httpRequest";
import { ApiUrl } from "@/constants/api-url";
import { toast } from "@/hooks/use-toast";

type Props = {
  setIsForgotPassword: (value: boolean) => void;
};

export const ForgotPasswordForm = ({ setIsForgotPassword }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ForgotPasswordFormValidation>
  ) => {
    setIsLoading(true);

    try {
      const { data } = await httpRequest.post(ApiUrl.FORGOT_PASSWORD, {
        email: values.email,
      });
      if (data.result) {
        toast({
          title: "Email sent",
          description: "We have sent you an email to reset your password.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-3">
          <h1
            className={cn(
              "text-base font-bold mb-3 border-b border-gray-200",
              "after:content-[''] after:w-[50%] after:border-[0.5px] after:border-blue-700 after:block after:mt-2"
            )}
          >
            Reset your password
          </h1>
          <p className="text-blue-700 text-sm mt-0">
            We will send you an email to reset your password.
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          placeholder="user@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <div className="flex gap-4">
          <SubmitButton isLoading={isLoading} className="w-1/2 bg-blue-700">
            Submit
          </SubmitButton>
          <Button className="w-1/2" onClick={() => setIsForgotPassword(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
