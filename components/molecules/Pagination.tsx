import { Button } from '@/components/atoms/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex gap-2">
      <Button
        className="rounded-md text-sm py-0 bg-white border border-gray-200 px-2 h-8 w-8 hover:bg-gray-100"
        onClick={() => onPageChange(-1)}
        disabled={page === 1}
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </Button>
      <Button
        className={cn(
          'rounded-md text-sm py-0 border border-gray-200 px-2 h-8 w-8 hover:bg-gray-10',
          'bg-blue-700 text-white',
        )}
      >
        {page}
      </Button>
      <Button
        className="rounded-md text-sm py-0 bg-white border border-gray-200 px-2 h-8 w-8 hover:bg-gray-100"
        onClick={() => onPageChange(1)}
        disabled={page === totalPages}
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default Pagination;
