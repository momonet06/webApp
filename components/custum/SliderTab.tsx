"use client";
/** */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
export const SliderTab = ({ data }: any) => {
  const [position, setPosition] = useState({
    left: 0,
    opacity: 0,
    width: 0,
  });
  const path = usePathname();
  return (
    <div dir="ltr" className="flex flex-col overflow-hidden mx-0.5">
      <ul
        onMouseLeave={() =>
          setPosition((preview) => ({ ...preview, opacity: 0 }))
        }
        className="relative mx-auto rounded-full border-2 border-black bg-white flex w-fit p-1"
      >
        {data.map((brg: any) => (
          <TabsHeader position={setPosition} key={brg.id}>
            <Link
              rel="preload"
              href={`/barrages/${brg.documentId}`}
              key={brg.id}
              className={cn(
                path.endsWith(brg.documentId) ? "text-orange-500" : ""
              )}
            >
              {brg.name}
            </Link>
          </TabsHeader>
        ))}
        <Curseur position={position} />
      </ul>
    </div>
  );
};

const TabsHeader = ({
  children,
  position,
}: Readonly<{ children: React.ReactNode; position: any }>) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        position({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="block z-10 cursor-pointer px-3 text-xs text-white mix-blend-difference py-1.5 md:px-5 md:text-base"
    >
      {children}
    </li>
  );
};

const Curseur = ({ position }: any) => {
  return (
    <motion.li
      animate={position}
      className=" bg-black absolute z-0 h-[22px] rounded-full md:h-9"
    />
  );
};
