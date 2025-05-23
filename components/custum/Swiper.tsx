"use client";

import { getStrapiMedia } from "@/lib/helper-api";
import { Autoplay, EffectFade, Zoom, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
export default function SwiperComponent({ medias }: any) {
  return (
    <Swiper
      modules={[Zoom, Pagination, EffectFade, Autoplay]}
      speed={1000}
      spaceBetween={10}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      effect="fade"
      pagination={{ clickable: true }}
      zoom={true}
      className="relative z-20 min-h-full w-full"
    >
      {medias.map((img: any) => (
        <SwiperSlide
          className="relative w-full object-contain aspect-1 border-2 rounded-md border-primary overflow-hidden"
          key={img.id}
        >
          <Image
            src={getStrapiMedia(img.url) ?? "/placeholder.svg"}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 100vw, 33vw"
            priority
            className="rounded-md object-fill"
            alt={img.alternativeText ?? "img"}
          />
          <div className="absolute flex justify-center items-center bottom-5 w-full text-xl font-lateef ">
            {img.alternativeText}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
