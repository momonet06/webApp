import Link from "next/link";
import { Metadata } from "next";
import { getStrapiData } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronLeft } from "lucide-react";
import { SliderTab } from "@/components/custum/SliderTab";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "السدود بنابل",
  description: "متابعة يومية لوضعية السدود الكبرى بالوطن القبلي",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const barrages = await getStrapiData("/api/barrages");
  if (!barrages) return <>Loading...</>;
  const { data } = barrages;
  return (
    <>
      <Breadcrumb className="sticky top-[39px] sm:top-[80px] p-3 z-20 bg-dark">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="flex flex-row items-start">
              <HomeIcon size={16} />
              الرئيسية
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <Link href="/barrages">السدود الكبرى</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="relative w-full space-y-2 container flex-col sm:inline-flex gap-2  mx-auto">
        <div className="max-w-sm mx-auto">
          <SliderTab data={data} />
        </div>

        {children}
      <GoogleTagManager gtmId="GTM-T6ZZ29CC" />
      </section>
    </>
  );
}
