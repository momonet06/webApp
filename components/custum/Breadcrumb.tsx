"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};
const keys: { [Key: string]: string } = {
  barrages: "متابعة لوضعية السدود",
  actualities: "أنشطة ومختلفات",
  development: "التنمية الفلاحية",
  v6zj46ym56eifmtlv08qz3x4: "الأراضي الدولية الفلاحية",
  yeywm0l4r3i0fsyd9k02mqf0: "تقديم عام",
  qqhsvd0vli1ui0ettmdzb043: "القطاع الفلاحي يالجهة",
  production: "الإنتاج الفلاحي",
  ca02whhf5a6chw8147zb62yc: "الإنتاج النباتي",
  iqb1s0s7epbpfx3my9f0kk2w: "الإنتاج الحيواني",
  iu9tie7z0ua0obqd6p65vef1: "الصيد البحري",
  tie5hq4pewf27qfr33dlxrv3: "الإستثمار بالقطاع",
};
const Breadcrumbs = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname() ?? ""; // Handle null or undefined paths
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <ul className={containerClasses}>
        <li
          className={cn(
            listClasses,
            "hover:no-underline  hover:text-amber-700"
          )}
        >
          <Link href={"/"} className="flex flex-row items-start">
            <HomeIcon size={20} />
            {homeElement}
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks
            ? link[0] + link.slice(1, link.length)
            : link;

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>
                  {
                    Object.entries(keys).find(
                      ([key]) => key == itemLink
                    )?.[1]
                  }
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
