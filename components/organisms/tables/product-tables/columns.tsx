'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProduct } from '@/types';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CheckIcon, XIcon } from 'lucide-react';

export const columns: ColumnDef<IProduct>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row }) => <p className="min-w-[100px]">{row.original.name}</p>,
  },
  {
    id: 'picture',
    header: 'PICTURE',
    cell: ({ row }) => (
      <Image
        src={row.original.picture}
        alt={row.original.name}
        width={50}
        height={50}
        className="rounded-md bg-white border border-gray-200"
      />
    ),
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ row }) => (
      <p className="min-w-[100px] line-clamp-1">{row.original.description}</p>
    ),
  },
  {
    accessorKey: 'barcode',
    header: 'BARCODE',
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    cell: ({ row }) => (
      <span className="min-w-[120px]">
        {formatCurrency(row.original.price, 'EUR')}
      </span>
    ),
  },
  {
    accessorKey: 'stopSale',
    header: 'ON SALE',
    cell: ({ row }) => (
      <span className="min-w-[120px]">
        {!row.original.stopSale ? (
          <CheckIcon className="w-4 h-4 text-green-500" />
        ) : (
          <XIcon className="w-4 h-4 text-red-500" />
        )}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
