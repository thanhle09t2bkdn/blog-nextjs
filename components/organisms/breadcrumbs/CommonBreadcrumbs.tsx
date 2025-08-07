"use client";

import { ChevronRight } from "lucide-react";

type Props = {
  page: string;
};

const CommonBreadcrumbs = ({ page }: Props) => {
  return (
    <div className=" bg-gray-100 h-[50px]">
      <div className="max-w-[90%] md:max-w-[1200px] px-0 md:px-5 xl:px-0 w-full mx-auto flex items-center gap-2 h-full">
        <a className="text-xs cursor-pointer" href="/">
          Home
        </a>
        <ChevronRight className="w-4 h-4" />
        <h2 className="text-xs text-gray-500">{page}</h2>
      </div>
    </div>
  );
};

export default CommonBreadcrumbs;
