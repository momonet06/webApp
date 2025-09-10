import styles from "@/app/css/pages.module.css";
import { getStrapiData } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ContentParsed from "@/lib/pars-content";
import RepartitionSuperficie from "@/components/custum/GarphicalChart/Repartition";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, HomeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/helper-api";

type Params = Promise<{ id: string }>;
async function getDelegation(id: string) {
  const page = await getStrapiData(
    `/api/delegations?filters[code_deleg][$eq]=${id}&populate[banner][fields]=url,caption,alternativeText`
  );

  return page;
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const id = (await props.params).id;
  const { data } = await getDelegation(id);

  return {
    title: data[0].name,
    openGraph: {
      title: data[0].name,
      images: data[0].banner.alternativeText,
    },
  };
}

export default async function Page(props: { params: Params }) {
  const id = (await props.params).id;
  const { data } = await getDelegation(id);
  const content = data[0].monographie;
  if (!data) notFound();

  return (
    <>
      <Breadcrumb className="relative top-10 sm:top-20 p-3 z-20 bg-dark">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="flex flex-row items-start">
              <HomeIcon size={16} />
              الرئيسية
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <Link href="#">مونوغرافيا المعتمديات</Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbPage>{data[0].name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={styles.page}>
        <div className=" py-[0px] sticky sm:top-20 top-10 bg-dark z-10 mx-auto">
          <h1>{data[0].name}</h1>
        </div>
        <article className="block">
          <div className="relative  mx-auto sm:float-end sm:mx-10 w-52  h-52 sm:w-80 sm:h-80 border-2 border-dashed border-cyan-800 rounded-md shadow-md shadow-primary overflow-hidden">
            <Image
              src={getStrapiMedia(data[0].banner.url) ?? "/placeholder.svg"}
              fill
              sizes="100vw"
              priority
              alt={data[0].name}
              className="bg-cyan-600 pl-4 scale-125 object-fill"
            />
          </div>
          <ContentParsed content={content} />
        </article>
        {id === "qqhsvd0vli1ui0ettmdzb043" && <RepartitionSuperficie />}
      </div>
    </>
  );
}
