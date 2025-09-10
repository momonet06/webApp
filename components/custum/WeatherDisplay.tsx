"use client";

import { fetchWeather } from "@/app/utils/meteo";
import { cn } from "@/lib/utils";
import { Loader2, BadgeAlert } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  city: string;
}

const WeatherDisplay: React.FC<Props> = ({ city }) => {
  const [weatherData, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      setError(false);
      const data = await fetchWeather(city);
      if (data) {
        setData(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchDate();
  }, [city]);

  if (error) {
    return <BadgeAlert size={22} color="red" className="self-center" />;
  }
  if (loading) {
    return (
      <Loader2
        size={22}
        className="text-dark animate-spin inline-block justify-center self-center"
      />
    );
  }
  return (
    <div className="relative text-dark">
      <p className="inline-block">
        {Math.round(weatherData.main.temp)}
        <sup>°C</sup>
        <span
          className={cn(
            `inline-block `,
            Math.round(weatherData.main.temp) > 37 ? "text-red-500" : ""
          )}
        >
          <RenderIcon
            icon={weatherData.weather[0].icon}
            description={weatherData.weather[0].description}
          />
        </span>
      </p>
    </div>
  );
};

export default WeatherDisplay;
const RenderIcon = ({
  icon,
  description,
}: {
  icon: string;
  description: string;
}) => {
  switch (icon) {
    case "01d":
      return (
        <Image
          src={"/weather/01d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "02d":
      return (
        <Image
          src={"/weather/02d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "03d":
      return (
        <Image
          src={"/weather/03d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "04d":
      return (
        <Image
          src={"/weather/04d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "09d":
      return (
        <Image
          src={"/weather/09d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "35d":
      return (
        <Image
          src={"/weather/35d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "11d":
      return (
        <Image
          src={"/weather/11d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "13d":
      return (
        <Image
          src={"/weather/13d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    case "50d":
      return (
        <Image
          src={"/weather/50d.png"}
          width={35}
          height={35}
          alt={description}
          quality={100}
          className="rounded-full  mt-[2px]"
        />
      );
      break;
    default:
      break;
  }
};
