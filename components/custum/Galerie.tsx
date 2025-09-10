"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import Fade from "embla-carousel-fade";
interface ImageProps  {
  name: string;
  path: string;
}

const Galerie=({images}:{images:ImageProps[]})=> {

  return (
    <div className="justify-items-center mx-auto" dir="ltr">
      <Carousel
        className="w-full max-w-sm"
        plugins={[Autoplay({ delay: 2000 }), Fade()]}
      >
        <CarouselContent>
          {images.map(({ name, path }, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="relative flex aspect-square items-center justify-center p-4 h-96">
                    <Image
                      src={path}
                      alt={name}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill
                      className="object-contain w-full"
                    />
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs absolute bottom-1 pb-2">
                      {name}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default Galerie