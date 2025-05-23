
import { getStrapiData } from "@/lib/data";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/helper-api";
import React from "react";
import { forbidden } from "next/navigation";
import { Metadata,ResolvingMetadata } from "next";

interface BarrageProps {
  id: number;
  documentId: string;
  name: string;
  type: string;
  construction: string;
  initial_capacity: number;
  capacity_actuel: number;
  stock: number;
  images?: [{ url: string; alternativeText: string }];
  geojson: { lat: number; lng: number };
  publishedAt: string;
  delegation: { name: string };
}

async function getBarrage(id: string) {
  const barrage = await getStrapiData(
    `/api/barrages?filters[documentId]=${id}`
  ).then((res) => res.data);

  if (!barrage) forbidden();
  return barrage[0];
}
type Params =Promise<{id:any}>
export async function generateMetadata(props: {params:Params},parent:ResolvingMetadata):Promise<Metadata> {
  const id = (await props.params).id;
  const barrage:BarrageProps = await getBarrage(id);
  const parentTitle = (await parent).title 
  return {
    title: 'سدّ '+barrage.name,...parentTitle,
  };
}
export default async function Page(props:{params:Params}) {
  const param = await props.params
  const barrage: BarrageProps = await getBarrage(param.id);
  if(!barrage)return forbidden()
  return (
    <div className="mx-auto flex flex-col justify-center sm:w-[320px] md:w-[640px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1280px]">
      <div className="relative m-2 flex h-[55px] w-full rounded-full">
        <div className="mx-2 flex text-lg font-extrabold font-amiri">
          <div className="relative h-[50px] w-[50px] rounded-full outline outline-1 outline-offset-1">
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
            {/* {data?.attributes?.filiere?.data.attributes.name} */}
          </span>
        </div>
      </div>

      <Card
        key={barrage.id}
        className="mx-1 rounded-xl border-2 border-primary/10 bg-secondary-foreground/10 shadow-lg"
      >
        <CardHeader className="flex items-center justify-center text-center">
          <CardTitle
            className="text-center text-3xl text-primary font-lateef pb-2"
          >
            سدّ {barrage.name}
          </CardTitle>
          <CardDescription className="relative h-[220px] w-[300px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
            <Image
              src={
                getStrapiMedia(
                  barrage.images?.[0].url ??
                    "/uploads/placeholder_6ee9924f77.svg"
                )!
              }
              alt={(barrage.images?.[0].alternativeText as string) ?? "img"}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              fill
              priority
              className="rounded-md object-fill shadow-lg outline-dotted outline-offset-1 outline-primary/20"
            />
          </CardDescription>
        </CardHeader>
        <CardContent
          className="text-justify indent-8 text-lg leading-relaxed font-amiri"
        >
          <div>
            <ul
              role="list"
              className="mr-1 sm:mr-4 list-outside list-image-checkmark text-lg sm:text-xl font-medium marker:text-lime-600 md:mr-7"
            >
              <li>
                المعتمدية:{" "}
                <span className="font-medium text-blue-600">
                  {barrage.delegation.name}
                </span>
              </li>
              <li>
                سنة الإنشاء:{" "}
                <span className="font-sans font-medium text-cyan-600">
                  {barrage.construction}
                </span>
              </li>

              <li>
                طاقة الإستيعاب الجملية:{" "}
                <span className="font-sans font-medium text-cyan-600">
                  {barrage.initial_capacity} م.م
                  <sup>3</sup>
                </span>
              </li>
              <li>
                طاقة الإستيعاب المتاحة:{" "}
                <span className="font-sans font-medium text-cyan-600">
                  {barrage.capacity_actuel} م.م
                  <sup>3</sup>
                </span>
              </li>

              <li>
                الكميّة المخزنة:{" "}
                <span className="font-sans font-medium text-cyan-600">
                  {barrage.stock} م.م
                  <sup>3</sup>
                </span>
              </li>
              <li>
                نسبة التعبئة لهذا الموسم:{" "}
                <span className="font-sans font-medium text-orange-600">
                  {((barrage.stock / barrage.capacity_actuel) * 100).toFixed(2)}
                  %
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-1 flex-row items-center justify-between">
          <pre className={"text-sm text-muted-foreground font-lateef"}>
            نشر بتاريخ&nbsp;
            {new Date(barrage.publishedAt).toLocaleDateString("ar-TN", {
              weekday: "long",
              month: "long",
              year: "numeric",
              day: "2-digit",
            })}
          </pre>
        </CardFooter>
      </Card>
    </div>
  );
}
