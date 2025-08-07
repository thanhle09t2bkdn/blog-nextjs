'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const BackHomeBreadcrumb = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
    >
      <ChevronLeft />
      Back to dashboard
    </Link>
  );
};

export default BackHomeBreadcrumb;
