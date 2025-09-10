"use client";

//import Icon from "@/components/custum/Icon";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { getStrapiMedia } from "@/lib/helper-api";
import { DynamicIcon } from "lucide-react/dynamic";
import useSWR from "swr";
import WeatherDisplay from "./WeatherDisplay";
import Counter from "./Counter";
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
  const { data: header, error } = useSWR("/api/header");
  if (error) return <span className="sr-only">Erreur: {error.message}</span>;
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
          loading="eager"
          className=" bg-secondary rounded-full border-primary border-2 mx-auto hidden sm:block -mr-[6px]"
        />
      </div>

      <div className="flex items-center px-1">
        <h1 className="text-[13px] sm:text-xl md:text-2xl text-secondary">
          المندوبية الجهوية للتنمية الفلاحية بنابل
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
        <WeatherDisplay city="douane" />
        <div className="flex items-center  px-2 z-50">
          {data.socialmedia.map((item: any) => (
            <Link href={item.target.url} key={item.id} target="_blank">
              {item.icon == "facebook" ? (
                <>
                  <DynamicIcon
                    name="facebook"
                    size={28}
                    color="#0866FF"
                    fill="#0866FF"
                    strokeWidth={1}
                  />
                  <Counter />
                </>
              ) : (
                <DynamicIcon
                  name="twitter"
                  size={28}
                  color={item.color}
                  fill={item.color}
                  strokeWidth={1}
                />
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
