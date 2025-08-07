'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Modal } from '@/components/atoms/modal';
import { Calendar } from '@/components/atoms/calendar';

interface CharityPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date | undefined) => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const CharityPaymentModal: React.FC<CharityPaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = 'Send Charity Payment',
  description = 'Please choose a date to send the payment.',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      className="w-fit px-8"
    >
      <div className="flex items-center justify-center w-fit mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={() => {
            onConfirm(date);
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
