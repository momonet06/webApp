"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Items from "./Items";
import { ChevronDown } from "lucide-react";
interface ISidebarItem {
  id: number;
  name: string;
  label: string;
  url?: string;
  target: string;
  items?: SubItem[];
  page?: PageProps;
}
interface PageProps {
  id: number;
  documentId: string;
  title: string;
  path: string;
  description: string;
  keywords: string;
  data?: object;
}
interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}
interface SubItem {
  id: number;
  label: string;
  url: string;
  target: string;
  description: string;
  page: PageProps;
  image?: ImageProps;
}
const SidebarItems = ({ item }: { item: ISidebarItem }) => {
  const { label, url, items, page } = item;
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setExpanded(!expanded);
    if (url) {
      router.push(url);
    }
    if (page && page.path) {
      router.push(page.path);
    }
  };

  const isActive = useMemo(() => {
    if (url) {
      return url === pathname;
    }

    if (page) {
      return page?.path === pathname;
    }

    if (items && items.length > 0) {
      if (items.find((item) => (item.page?.path || item.url) === pathname)) {
        return true;
      }
    }
  }, [pathname, url, page, items]);

  return (
    <>
      <div
        className={cn(
          "flex items-center font-bold cursor-pointer justify-between p-2  rounded-md hover:bg-muted hover:text-muted-foreground",
          isActive && "text-blue-700 bg-muted-foreground "
        )}
        onClick={onClick}
      >
        <p className="text-lg font-bold">{label}</p>

        {items && items.length > 0 && (
          <ChevronDown
            size={18}
            className={expanded ? "rotate-180 duration-200" : ""}
          />
        )}
      </div>

      {expanded && items && items.length > 0 && (
        <div className="flex flex-col  px-2 space-y-1 w-full">
          {items.map((item) => (
            <Items item={item} key={item.id} />
          ))}
        </div>
      )}
    </>
  );
};
export default SidebarItems;
