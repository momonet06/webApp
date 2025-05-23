"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/helper-api";
import Modal from "./Modal";

export default function ImageComponent({ url }: { url: string }) {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className="inline-block  cursor-pointer w-full p-0"
      >
        <Image
          src={getStrapiMedia(url)!}
          alt={"img"}
          sizes="100vw"
          fill
          priority
          className="rounded-md object-scale-down sm:object-fill shadow-lg outline-dotted outline-offset-1 outline-primary/20 "
        />
      </div>
      <Modal
        estVisible={isVisible}
        url={url}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
