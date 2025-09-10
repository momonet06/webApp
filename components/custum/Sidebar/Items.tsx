"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface ItemProps {
  id: number;
  url: string;
  page: {
    path: string;
    documentId: string;
  };
  label: string;
}
const Items = ({
  item,
  setOpen,
}: {
  item: ItemProps;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  return item.page ? (
    <Link
      onNavigate={() => setOpen(false)}
      href={`/pages/${item.page.documentId}`}
      className={`w-full rounded-md p-2 text-sm ${
        `/pages/${item.page.documentId}` === pathname &&
        "text-blue-700 bg-white "
      } `}
    >
      {item.label}
    </Link>
  ) : (
    <Link
      onNavigate={() => setOpen(false)}
      href={{ pathname: item.url }}
      className={`w-full rounded-md p-2 text-sm ${
        item.url === pathname && "text-blue-700 bg-white "
      } `}
    >
      {item.label}
    </Link>
  );
};

export default Items;
