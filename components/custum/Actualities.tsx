"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Autoplay, EffectFade } from "swiper/modules";
import { getStrapiMedia } from "@/lib/helper-api";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Views from "./ActualityViews";
interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}
interface dataProps {
  data: {
    id: number;
    documentId: string;
    title: string;
    category: string;
    description: string;
    publishedAt: Date;
    createdAt: string;
    view: number;
    image: ImageProps[];
  };
}
export default function Actualities({ data }: dataProps) {
  if (!data)
    return (
      <div className="flex justify-center items-center">
        <p className=" text-2xl font-semibold text-center text-red-600">
          لم يقع بعد اظافة أنشطة للنشر
        </p>
      </div>
    );
  return (
    <div className="flex">
      <Link
        href={`/actualities/${data.documentId}`}
        key={data.id}
        target="_self"
      >
        <Card
          key={data?.id}
          className="relative h-[20rem] w-screen sm:w-[370px]  cursor-pointer rounded-md border-0 bg-secondary-foreground shadow-lg shadow-muted-foreground/50 hover:opacity-75"
        >
          <CardHeader className="relative inset-x-0 top-0 h-full w-full p-1">
            <Swiper
              speed={1000}
              spaceBetween={10}
              autoplay={{
                delay: 9000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              effect="fade"
              modules={[Autoplay, EffectFade]}
              className="relative z-20 min-h-full w-full"
            >
              {data.image.map((img) => (
                <SwiperSlide
                  key={img.id}
                  className="relative w-full object-contain aspect-1"
                >
                  <Image
                    src={getStrapiMedia(img.url) ?? "/placeholder.svg"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="rounded-md object-cover"
                    alt={img.alternativeText ?? "article"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "absolute inset-x-1 bottom-[36px] z-10 line-clamp-1 text-justify indent-4 text-3xl font-semibold text-slate-50 hover:text-amber-400"
              )}
            >
              {data.title}
            </p>
          </CardContent>
          <CardFooter className="absolute inset-x-0 bottom-0 justify-end py-1">
            <p className="z-10  text-sm text-red-600">
              {formatDate(data.createdAt)}
            </p>
            <Views id={data.documentId} />
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
