"use client";
import { use } from "react";
import Actuality from "@/components/custum/Actuality";
import PaginationControls from "@/components/custum/PaginationControls";
import SearchActuality from "@/components/custum/SearchActuality";

import { Suspense } from "react";
import useSWR from "swr";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}
interface ActualityProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  publishedAt: Date;
  createdAt: string;
  image: ImageProps[];
  view: number;
  category: string;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const param = use(searchParams);
  const page = typeof param.page === "string" ? parseInt(param.page) : 1;
  const search = typeof param.search === "string" ? param.search : "";
  const {
    data: actualities,
    error,
    isLoading,
  } = useSWR(
    `/api/actualities?pagination[page]=${page}&pagination[pageSize]=12${
      search ? `&search=${search}` : ""
    }`
  );
  if (isLoading) return <Loading />;
  if (error) return <div>Erreur: {error.message}</div>;

  const { meta, data } = actualities;

  return (
    <>
      <Breadcrumb className="sticky top-10 sm:top-20 p-3 z-20 bg-dark">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="flex flex-row items-start">
              <HomeIcon size={16} />
              الرئيسية
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />

          <BreadcrumbItem>
            <BreadcrumbPage>أنشطة ومختلفات</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchActuality />
      <PaginationControls
        currentPage={meta.pagination.page}
        totalPages={meta.pagination.pageCount}
      />
      <Suspense key={search + page} fallback={<Loading />}>
        <div className="relative flex gap-4 flex-wrap items-start justify-center sm:justify-start">
          {data.map((act: ActualityProps) => (
            <div key={act.id} className="relative">
              <Actuality actuality={act} />
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <>
      <div className="mx-auto w-full max-w-sm items-center justify-center rounded-md border border-blue-300 p-8 pt-2 shadow">
        <h2>جاري تحميل المعطيات ...🌀</h2>
        <div className="flex animate-pulse space-x-4">
          <div className="h-10 w-10 rounded-full bg-slate-200"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                <div className="col-span-1 h-2 rounded bg-slate-200"></div>
              </div>
              <div className="h-2 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
