import style from "@/app/css/pages.module.css";
import { getStrapiData } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ContentParsed from "@/lib/pars-content";
import RepartitionSuperficie from "@/components/custum/GarphicalChart/Repartition";
import Swiper from "@/components/custum/Swiper";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, HomeIcon } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ id: string }>;
async function getPage(id: string) {
  const page = await getStrapiData(`/api/pages/${id}`);

  return page;
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const id = (await props.params).id;
  const { data } = await getPage(id);

  return {
    title: data.SEO.title,
    description: data.SEO.description,
    openGraph: {
      title: data.SEO.title,
      images: data.SEO.metaImage.image.alt,
    },
  };
}

export default async function Page(props: { params: Params }) {
  const id = (await props.params).id;
  const {  data } = await getPage(id);
  const content = data.data;
  if (!data) notFound();

  return (
    <>
      <Breadcrumb className="sticky top-10 sm:top-[80px] p-3 z-20 bg-dark">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="flex flex-row items-start">
              <HomeIcon size={16} />
              الرئيسية
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <Link href={data.breadcrumb.ParentTarget ?? "#"}>
              {data.breadcrumb.Parent}
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.breadcrumb.Title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={cn(
          style.page,
          `relative  my-0 mt-1 rounded-md border-2 border-primary/100 pb-1 pt-2 backdrop:mx-[0.5px]`
        )}
      >
        <div>
          <h1>{data.title}</h1>
        </div>
        <div>
          {data.block[0] && (
            <div className="relative mx-auto w-full sm:max-w-[520px] ">
              <Swiper medias={data.block[0].banner} />
            </div>
          )}

          <ContentParsed content={content} />
        </div>
        {id === "qqhsvd0vli1ui0ettmdzb043" && <RepartitionSuperficie />}
      </div>
    </>
  );
}
