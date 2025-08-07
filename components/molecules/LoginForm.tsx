"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/atoms/form";
import { UserFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Mail } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { cn } from "@/lib/utils";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useRouter } from "next/navigation";
import { httpRequest } from "@/lib/apis/httpRequest";
import { ApiUrl } from "@/constants/api-url";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/hooks/use-currency";
import { Role } from "@/types";

export const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { setCurrencies, setCurrency } = useCurrency();
  const { setUser, setIsLoggedIn, setAccessToken } = useUser();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
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
      setAccessToken(data?.result?.accessToken);

      const [userResponse, currenciesResponse] = await Promise.all([
        httpRequest.get(ApiUrl.GET_PROFILE),
        httpRequest.get(ApiUrl.CURRENCIES),
      ]);
      setUser(userResponse.data?.result || data?.result);
      setCurrencies(currenciesResponse.data?.result?.data || []);
      setCurrency(currenciesResponse.data?.result?.data[0] || []);

      if (data?.result?.role === Role.Admin) {
        router.refresh();
        const timestamp = new Date().getTime();
        router.push(`/manage/dashboard?t=${timestamp}`);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  if (isForgotPassword) {
    return <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />;
  }

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
            Sign In
          </h1>
          <p className="text-blue-700 text-sm mt-0">
            Insert your account information:
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="user@gmail.com"
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
            <Mail className="w-4 h-4" />
            <p
              className="text-sm mt-0"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot your password?
            </p>
          </div>
          <p className="text-sm mt-0">
            Don&apos;t have an account?&nbsp;
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={handleSignUp}
            >
              Sign Up
            </span>
          </p>
        </div>

        <SubmitButton isLoading={isLoading} className="w-full bg-blue-700">
          Login
        </SubmitButton>
      </form>
    </Form>
  );
};
