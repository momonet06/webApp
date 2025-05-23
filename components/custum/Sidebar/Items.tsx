"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemProps {
  id: number;
  url: string;
  page: { path: string; documentId: string };
  label: string;
}
const Items = ({ item }: { item: ItemProps }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.page ? `/pages/${item.page.documentId}` : item.url}
      className={`w-full rounded-md p-2 text-sm ${
        (item.url === pathname || item.page?.path === pathname) &&
        "text-blue-700 bg-white"
      } `}
    >
      {item.label}
    </Link>
  );
};

export default Items;
