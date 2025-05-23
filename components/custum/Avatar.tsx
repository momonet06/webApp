"use client";
import useUser from "@/app/utils/hooks/useUser";
import { getStrapiMedia } from "@/lib/helper-api";
import Image from "next/image";

export default function Avatar({ id }: { id: number }) {
  const { user, error } = useUser({ id });
  if (error) return <>{error}</>;
  if (!user) return <>loading...</>;

  return (
    <div className="relative h-11 w-11 rounded-full border-2 border-white overflow-hidden">
      <Image
        src={getStrapiMedia(user.avatar.url) ?? "/placeholder.svg"}
        fill
        sizes="100%"
        alt="Avatar"
        className="object-cover"
      />
    </div>
  );
}
