"use client";
import { Loader2 } from "lucide-react";
import Carousels from "@/components/custum/Carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/helper-api";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data: carouselData, error, isLoading } = useSWR("/api/home-page");
  if (isLoading)
    return (
      <div className="block justify-center text-center mx-0">
        <span>Tentative de chargement des données</span>
        <Loader2
          size={60}
          className="text-teal-300 animate-spin inline-block justify-center"
        />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 justify-center text-center h-full block">
        Erreur de connexion avec le serveur !
      </div>
    );
  const { carousel, blocks } = carouselData.data;
  return (
    <div className="relative flex flex-col justify-center gap-4 ">
      <div className="relative w-full px-2" dir="auto">
        <Carousels data={carousel} />
      </div>
      <div className="px-2 w-full">
        <div className="relative flex  flex-col  gap-4 sm:flex-row flex-wrap sm:justify-between">
          {blocks.map((portail: any) => (
            <Link
              href={portail.link.url}
              key={portail.id}
              target={portail.link.isExternal ? "_blank" : "_self"}
            >
              <Card className="relative shadow-lg shadow-muted-foreground border-black border-2 basis-1/2 sm:w-[280px]  h-[150px] bg-white ">
                <CardHeader className="p-2">
                  <CardTitle className="text-xl font-bold text-black text-center">
                    {portail.heading}
                  </CardTitle>
                  <CardDescription className=" line-clamp-2 text-sm font-medium text-slate-600">
                    {portail.subHeading}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative w-full h-12  items-end">
                  <Image
                    alt="portail"
                    src={getStrapiMedia(portail.images[0].url) as string}
                    fill
                    loading="eager"
                    sizes="(max-widh:680px) 50vw,100vw"
                    className="object-contain "
                  />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
