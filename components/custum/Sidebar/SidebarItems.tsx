"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Items from "./Items";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
interface ISidebarItem {
  id: number;
  name: string;
  label: string;
  url?: any;
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
const SidebarItems = ({
  item,
  setOpen,
}: {
  item: ISidebarItem;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { label, url, items, page } = item;
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setExpanded(!expanded);

    if (url) {
      router.push(url, { scroll: true });
    } else if (page) {
      router.push(`/pages/${page.documentId}`, { scroll: true });
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
      <AnimatePresence initial={false}>
        {expanded && items && items.length > 0 && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="flex flex-col  px-2 space-y-1 w-full"
          >
            {items.map((item) => (
              <Items item={item} key={item.id} setOpen={setOpen} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default SidebarItems;
