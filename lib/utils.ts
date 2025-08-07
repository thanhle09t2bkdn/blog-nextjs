import { currencyCultureCodes } from '@/constants/data';
import { ICurrency } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions,
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const insertStringVariables = (text: string, ...args: string[]) => {
  let str = text;
  for (const arg of args) {
    str = str.replace('{}', arg);
  }
  return str;
};

// export const getPaymentStatusColor = (status: string) => {
//   switch (status) {
//     case PaymentStatus.Pending:
//       return "bg-orange-500 text-white";
//     case PaymentStatus.Canceled:
//       return "bg-gray-500 text-white";
//     case PaymentStatus.Paid:
//       return "bg-green-500 text-white";
//     default:
//       return "bg-gray-500 text-black";
//   }
// };

export const formatCurrency = (amount: number, currency: string) => {
  return amount.toLocaleString(currencyCultureCodes[currency] || 'de-DE', {
    style: 'currency',
    currency,
  });
};

export const getLastPrice = (price: number, currency: ICurrency) => {
  const lastPrice = price * currency.exchangeRate;
  return Math.ceil(lastPrice);
};

export function addCurrentTimeToDate(date: Date) {
  const currentDate = new Date(date); // Create a Date object from the input date
  const now = new Date(); // Get the current date and time

  // Extract hours and minutes from the current time
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Set the hours and minutes of the input date to match the current time
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(seconds);
  return currentDate;
}
