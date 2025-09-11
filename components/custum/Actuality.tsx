"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Autoplay, EffectFade } from "swiper/modules";
import { getStrapiMedia } from "@/lib/helper-api";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";
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

export default function Actuality({
  actuality,
}: {
  actuality: ActualityProps;
}) {
  const [isNew, setIsNew] = useState(false);
  const dateDiff = (date: Date) => {
    const toDay: Date = new Date();
    const tmp = toDay.getTime() - date.getTime();
    return Math.abs(Math.ceil(tmp) / 86400000);
  };
  useEffect(() => {
    if (dateDiff(new Date(actuality.createdAt)) <= 7) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [actuality.createdAt]);

  return (
    <div className="relative flex">
      <Link
        href={`/actualities/${actuality.documentId}`}
        key={actuality.id}
        target="_self"
        prefetch={false}
      >
        <Card
          key={actuality.id}
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
              {actuality.image.map((img: any) => (
                <SwiperSlide
                  key={img.id}
                  className="relative w-full object-contain aspect-1"
                >
                  <Image
                    src={getStrapiMedia(img.url) ?? "/placeholder.svg"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="rounded-md object-fill"
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
              {actuality.title}
            </p>
          </CardContent>
          <CardFooter className="absolute inset-x-0 bottom-0 justify-between px-1 py-1 bg-primary z-10 rounded-b-md">
            <div className="flex">
              <p className="z-10  text-sm text-red-600">
                {formatDate(actuality.createdAt)}
              </p>
            </div>
            <div className="relative flex z-20 gap-1">
              <EyeIcon size={20} className="text-cyan-800 opacity-100" />
              <span className="text-sm text-cyan-900 font-medium">
                {actuality.view}
              </span>
            </div>
          </CardFooter>
        </Card>
        <LoadingIndicator />
        <div
          className={`${
            isNew ? "visible" : "hidden"
          } text-white  font-bold absolute top-0 right-0 -mr-2 -mt-1 w-10 justify-center text-center h-6 rounded-sm bg-[#f16a2b] z-10 rotate-45 text-sm`}
        >
          جديد
        </div>
      </Link>
    </div>
  );
}
