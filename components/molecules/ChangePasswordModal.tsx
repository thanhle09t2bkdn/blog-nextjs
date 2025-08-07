'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Modal } from '@/components/atoms/modal';
import { Form } from '@/components/atoms/form';
import { ChangePasswordFormValidation } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { httpRequest } from '@/lib/apis/httpRequest';
import { ApiUrl } from '@/constants/api-url';
import { toast } from '@/hooks/use-toast';
import CustomFormField, {
  FormFieldType,
} from '@/components/molecules/CustomFormField';
import SubmitButton from '@/components/molecules/SubmitButton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const ChangePasswordModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title = 'Change Password',
  description = 'Please enter your new password.',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordFormValidation>>({
    resolver: zodResolver(ChangePasswordFormValidation),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ChangePasswordFormValidation>,
  ) => {
    setIsLoading(true);
    try {
      await httpRequest.post(ApiUrl.RESET_PASSWORD, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast({
        title: 'Password changed',
        description: 'Your password has been changed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.error ||
          'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClose = () => {
    form.reset();
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    onClose();
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={handleClose}
      key={isOpen.toString()}
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-7 my-4"
          >
            <div className="relative flex items-center gap-2">
              <CustomFormField
                fieldType={
                  showCurrentPassword
                    ? FormFieldType.INPUT
                    : FormFieldType.PASSWORD
                }
                control={form.control}
                name="currentPassword"
                placeholder="Current Password"
                iconSrc="/assets/icons/password.svg"
                iconAlt="password"
              />
              <div
                className="absolute z-10 top-2.5 right-2 w-fit h-fit text-gray-500 cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {!showCurrentPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                )}
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <CustomFormField
                fieldType={
                  showNewPassword ? FormFieldType.INPUT : FormFieldType.PASSWORD
                }
                control={form.control}
                name="newPassword"
                placeholder="New Password"
                iconSrc="/assets/icons/password.svg"
                iconAlt="password"
              />
              <div
                className="absolute z-10 top-2.5 right-2 w-fit h-fit text-gray-500 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {!showNewPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <SubmitButton isLoading={isLoading} className="w-1/2 bg-blue-700">
                Submit
              </SubmitButton>
              <Button className="w-1/2" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
