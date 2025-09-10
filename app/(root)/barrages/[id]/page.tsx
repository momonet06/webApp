
import { getStrapiData } from "@/lib/data";
import Image from "next/image";

import { getStrapiMedia } from "@/lib/helper-api";
import React from "react";
import { forbidden } from "next/navigation";
import { Metadata,ResolvingMetadata } from "next";
import { unstable_cache } from "next/cache";
import BarrageDetails from "@/components/custum/BarrageDetails";

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
  const getCachedBarrage = unstable_cache(async()=>{return { data: await getBarrage(param.id) };},[param.id],{tags:["barrages"],revalidate:3600});
  const barrage = await getCachedBarrage().then(res=>res.data)
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
    <BarrageDetails barrage={barrage}/>
    </div>
  );
}
