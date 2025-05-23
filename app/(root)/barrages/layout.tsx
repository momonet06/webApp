import Link from "next/link";
import { Metadata } from "next";
import { getStrapiData } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronLeft } from "lucide-react";

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
      <Breadcrumb className="sticky top-0 p-3 z-20 bg-dark">
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
          <ul className="flex bg-primary/10 rounded-2xl w-full h-10 items-center justify-between sm:px-2">
            {data.map((brg: any) => (
              <li key={brg.id}>
                <Link
                  href={`/barrages/${brg.documentId}`}
                  className=" hover:text-orange-600 hover:bg-white px-2 rounded-md text-xl"
                >
                  {brg.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {children}
      </section>
    </>
  );
}
