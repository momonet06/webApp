"use client";
import { getStrapiMedia } from "@/lib/helper-api";
import Image from "next/image";
import React from "react";

function Modal({
  estVisible,
  url,
  onClose,
}: {
  estVisible: boolean;
  url: string;
  onClose: any;
}) {
  if (!estVisible) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-primary/25 backdrop-blur-sm"
      onClick={() => onClose()}
    >
      <div className={`max-w-xl w-full h-1/2 mx-4 flex flex-col`}>
        <button
          className="relative place-self-start text-red-800 text-xl top-2 z-10"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className=" w-full relative overflow-hidden h-full text-black p-2 rounded-md border-2 border-primary-foreground ">
          <Image
            src={getStrapiMedia(url)!}
            alt=""
            sizes="100vw"
            fill
            className="object-top object-fill opacity-100 transform transition-opacity  duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
