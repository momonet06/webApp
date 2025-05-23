"use client";
import clsx from "clsx";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationControls {
  currentPage: number;
  totalPages: number;
}

const PaginationControls = ({
  currentPage,
  totalPages,
}: PaginationControls) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  return (
    <div className="my-1 flex flex-row">
      <Link
        href={{
          pathname: "/actualities",
          query: {
            ...(search ? { search } : {}),
            page: currentPage + 1,
          },
        }}
        className={clsx(
          "mx-1 rounded-md border bg-primary px-2  py-0.5 text-sm text-secondary/100 opacity-100",
          currentPage >= totalPages && "pointer-events-none opacity-60"
        )}
      >
        <ChevronsRight size={"18"} />
      </Link>
      <Link
        href={{
          pathname: "/actualities",
          query: {
            ...(search ? { search } : {}),
            page: currentPage > 1 ? currentPage - 1 : 1,
          },
        }}
        className={clsx(
          "mx-1 rounded-md border bg-primary px-2 py-0.5 text-sm text-secondary/100 opacity-100",
          currentPage <= 1 && "pointer-events-none opacity-60"
        )}
      >
        <ChevronsLeft size={"18"} />
      </Link>
    </div>
  );
};
export default PaginationControls;
