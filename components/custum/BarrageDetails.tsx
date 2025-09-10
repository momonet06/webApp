"use client";

import { getStrapiMedia } from "@/lib/helper-api";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function BarrageDetails({ barrage }: any) {
  return (
    <div className=" block flex-1 place-content-center">
      <AnimatePresence >
        <motion.div
          key={barrage.id}
          variants={{
            initial: {
              opacity: [0.7, 0.3, 0],
            },
            enter: {
              opacity: [0.3, 0.7, 1],
            },
            exit: {
              opacity: [0.7, 0.3, 0],
            },
          }}
          transition={{ duration: 1.5 }}
          initial="initial"
          exit="exit"
          animate="enter"
        >
          <Card
            key={barrage.id}
            className="mx-1 rounded-xl border-2 bg-transparent shadow-lg"
          >
            <CardHeader className="flex items-center justify-center text-center">
              <CardTitle className="text-center text-3xl text-primary font-lateef pb-2">
                سدّ {barrage.name}
              </CardTitle>
              <CardDescription className="relative h-[220px] w-[300px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
                <Image
                  src={
                    getStrapiMedia(
                      barrage.images?.[0].url ??
                        "/uploads/placeholder_6ee9924f77.svg"
                    )!
                  }
                  alt={(barrage.images?.[0].alternativeText as string) ?? "img"}
                  style={{objectFit:'cover'}}
                  fill
                  priority
                  className="rounded-md object-fill shadow-lg outline-dotted outline-offset-1 outline-primary/20"
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="text-justify indent-8 text-lg leading-relaxed font-amiri">
              <ul
                role="list"
                className="mr-1 sm:mr-4 list-outside list-image-checkmark text-lg sm:text-xl font-medium marker:text-lime-600 md:mr-7"
              >
                <li>
                  المعتمدية:{" "}
                  <span className="font-medium text-blue-600">
                    {barrage.delegation.name}
                  </span>
                </li>
                <li>
                  سنة الإنشاء:{" "}
                  <span className="font-sans font-medium text-cyan-600">
                    {barrage.construction}
                  </span>
                </li>

                <li>
                  طاقة الإستيعاب الجملية:{" "}
                  <span className="font-sans font-medium text-cyan-600">
                    {barrage.initial_capacity} م.م
                    <sup>3</sup>
                  </span>
                </li>
                <li>
                  طاقة الإستيعاب المتاحة:{" "}
                  <span className="font-sans font-medium text-cyan-600">
                    {barrage.capacity_actuel} م.م
                    <sup>3</sup>
                  </span>
                </li>

                <li>
                  الكميّة المخزنة:{" "}
                  <span className="font-sans font-medium text-cyan-600">
                    {barrage.stock} م.م
                    <sup>3</sup>
                  </span>
                </li>
                <li>
                  نسبة التعبئة لهذا الموسم:{" "}
                  <span className="font-sans font-medium text-orange-600">
                    {((barrage.stock / barrage.capacity_actuel) * 100).toFixed(
                      2
                    )}
                    %
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex w-full flex-1 flex-row items-center justify-between">
              <pre className={"text-sm text-muted-foreground font-lateef"}>
                نشر بتاريخ&nbsp;
                {new Date(barrage.publishedAt).toLocaleDateString("ar-TN", {
                  weekday: "long",
                  month: "long",
                  year: "numeric",
                  day: "2-digit",
                })}
              </pre>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
