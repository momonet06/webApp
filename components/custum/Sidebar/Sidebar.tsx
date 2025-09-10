"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarItems from "./SidebarItems";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import useSWR from "swr";
import { useState } from "react";
const Sidebar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { data: menu } = useSWR("/api/nav");
  if (!menu) return <span className="sr-only">Loading</span>;
  const { data }: any = menu;
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"sm"} className="sm:hidden">
          <MenuIcon className="dark:text-slate-700 text-white " />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-muted/80">
        <SheetHeader>
          <SheetTitle>القائمة الرئيسية</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-10 w-full pt-5">
          <div>
            {data.menu.map((submenu: any) => (
              <SidebarItems
                item={submenu}
                key={submenu.id}
                setOpen={setSheetOpen}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;
