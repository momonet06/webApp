import { getStrapiData } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStrapiMedia, getStrapiURL } from "@/lib/helper-api";
import React, { Suspense } from "react";
import { forbidden } from "next/navigation";
import ActualityViews from "@/components/custum/ActualityViews";
import Avatar from "@/components/custum/Avatar";
import ImageComponent from "@/components/custum/ImageComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { HomeIcon, ChevronLeft } from "lucide-react";


const authToken = process.env.STRAPI_ACCESS_TOKEN;

async function getActuality(id: string) {
  const actuality = await getStrapiData(`/api/actualities/${id}`).then(
    (res) => res.data
  );

  if (!actuality) forbidden();
  return actuality;
}

 type Params = Promise<{ id: string }>;


const updateActualiy = async (updatedData: number, id: string) => {
  try {
    const res = await fetch(getStrapiURL(`/api/actualities/${id}?populate=*`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data: { view: updatedData } }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const dataUpdated = await res.json();
    return dataUpdated;
  } catch (error) {
    console.error("Error when updating data: ", error);
  }
};
export default async function Page(props: { params: Params }) {
  const param = await props.params;
  let actuality: any = undefined;
  const currentData = await getActuality(param.id);

  if (currentData)
    actuality = await updateActualiy(currentData.view + 1, param.id).then(
      (data) => data.data
    );

  if (!actuality) return <>Loading...</>;

  return (
    <>
      <Breadcrumb className="sticky top-9 p-3 z-20 bg-dark">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="flex flex-row items-start">
              <HomeIcon size={16} />
              الرئيسية
            </Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <Link href="/actualities">أنشطة ومختلفات</Link>
          </BreadcrumbItem>
          <ChevronLeft size={15} className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbPage>{actuality.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto flex flex-col justify-center sm:w-[320px] md:w-[640px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1280px]">
        <div className="relative m-2 flex h-[55px] w-full rounded-full">
          <div className={"mx-2 flex text-lg font-extrabold font-amiri"}>
            <div className="relative aspect-1 rounded-full outline outline-1 outline-offset-1">
              <Image
                src={getStrapiMedia("/uploads/info_icon_bbe40c6afc.png")!}
                alt="filière"
                sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                fill
                className=" rounded-full"
              />
            </div>
            <span className="my-2 inline-block pr-2 align-middle underline underline-offset-8">
              {actuality.category}
            </span>
          </div>
        </div>

        <Card
          key={actuality.id}
          className="relative mx-1 w-full rounded-xl border-2 border-primary/50 bg-secondary/80 shadow-lg"
        >
          <CardHeader className="flex items-center justify-center text-center">
            <CardTitle
              className={"text-center text-3xl text-primary font-lateef"}
            >
              {actuality.title}
            </CardTitle>
            <CardDescription className="relative aspect-1 w-full  sm:w-2/6">
              <ImageComponent
                url={actuality.image[0].url ?? "/placeholder.svg"}
              />
            </CardDescription>
          </CardHeader>
          <CardContent
            className={
              "text-justify indent-8 text-lg leading-relaxed font-amiri"
            }
          >
            <p>{actuality.description}</p>
          </CardContent>
          <CardFooter className="flex w-full  flex-row items-center justify-between">
            <pre className={cn("text-lg text-muted-foreground font-lateef")}>
              نشر بتاريخ&nbsp;
              {formatDate(actuality.createdAt)}
            </pre>
            <code className="font-semibold italic flex items-end text-xs">
              {actuality.createdBy.username}@
              <Avatar id={actuality.updatedBy.id} />
            </code>
          </CardFooter>
        </Card>
      </div>
      <Suspense>
        <ActualityViews id={actuality.documentId} />
      </Suspense>
    </>
  );
}
