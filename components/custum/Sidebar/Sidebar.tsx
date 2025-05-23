"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarItems from "./SidebarItems";
import { Button } from "@/components/ui/button";
import {MenuIcon} from "lucide-react"
import useSWR from "swr";
const Sidebar = () => {
  const {data:menu} = useSWR('/api/nav')
  if(!menu) return <span className="sr-only">Loading</span>
  const {data}:any = menu

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="ghost" size={"sm"} className="sm:hidden">
           <MenuIcon  className="dark:text-slate-700 text-white "/>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-muted">
        <SheetHeader>
          <SheetTitle>القائمة الرئيسية</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-10 w-full pt-5">
          <div>
           
            {data.menu.map((submenu: any) => (
              <SidebarItems item={submenu} key={submenu.id} />
            ))} 
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;
