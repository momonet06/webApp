"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { getStrapiMedia } from "@/lib/helper-api";

interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface CarouselProps {
  data: {
    id: number;
    heading: string;
    subheading: string;
    banner: ImageProps[];
  };
}

export default function Carousels({ data }: Readonly<CarouselProps>) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000 }), Fade()]}
    >
      <CarouselContent className="px-1 mx-auto">
        {data.banner.map((img: any) => (
          <CarouselItem
            key={img.id}
            className=" aspect-w-1 aspect-h-1 sm:aspect-h-[0.42]"
          >
            <Image
              src={getStrapiMedia(img.url) as string}
              alt={img.alternativeText ?? "culture"}
              fill
              style={{ width: "100%", height: "100%" }}
              //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-md object-fill"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h2 className="text-white font-semibold text-2xl">
                {img.subheading}
              </h2>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
