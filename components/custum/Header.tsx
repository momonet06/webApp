"use client";

//import Icon from "@/components/custum/Icon";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { getStrapiMedia } from "@/lib/helper-api";
import { Facebook, Twitter } from "lucide-react";
import useSWR from "swr";
interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface HeaderProps {
  data: {
    id: number;
    title: string;
    logo: ImageProps;
    socialmedia: any;
  };
}
export default function Header() {
  const { data: header } = useSWR("/api/header");
  if (!header) return <span className="sr-only">Loading</span>;
  const { data }: HeaderProps = header;

  return (
    <div className="bg-primary absolute sm:relative top-0 flex w-full h-10 rounded-none sm:overflow-visible sm:rounded-r-full">
      <div className="w-[60px] h-full">
        <Image
          src={getStrapiMedia(data.logo.url) ?? "/logo.jpg"}
          width={60}
          height={60}
          alt="logo"
          className=" bg-secondary rounded-full border-primary border-2 mx-auto hidden sm:block -mr-[6px]"
        />
      </div>

      <div className="flex items-center px-1">
        <h1 className="text-[13px] sm:text-xl md:text-2xl text-secondary">
          المندوبية الجهوية للتنمية الفلاحية بنابل
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex items-center  px-2 z-50">
          {data.socialmedia.map((item: any) => (
            <Link href={item.target.url} key={item.id} target="_blank">
              {item.icon == "facebook" ? (
                <Facebook size={28} color={item.color} />
              ) : (
                <Twitter size={28} color={item.color} />
              )}
            </Link>
          ))}
        </div>

        <div className=" flex items-center justify-center w-10">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
