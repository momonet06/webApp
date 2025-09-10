"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar/Sidebar";
import useSWR from "swr";
import { getStrapiMedia } from "@/lib/helper-api";
import Image from "next/image";

function Navbar() {
  const [banner, setBanner] = useState<any>(null);
  const pathname = usePathname();
  const { data: menu } = useSWR("/api/nav");
  if (!menu) return <span className="sr-only">Loading</span>;
  const { data }: any = menu;
  return (
    <>
      <nav className="sm:pr-[35px] bg-dark ">
        <div className="container ">
          <div className=" relative justify-center items-center mr-0 ml-5 sm:mx-4 pt-[2px] sm:pt-0 ">
            <NavigationMenu
              dir="rtl"
              className="relative hidden sm:inline-block min-w-fit justify-items-start"
            >
              <NavigationMenuList className=" space-x-0 bg-dark">
                {data.menu.map((item: any) =>
                  item.items.length > 0 ? (
                    <NavigationMenuItem
                      key={item.id}
                      className={cn(
                        pathname.startsWith(item.name) && "text-blue-800"
                      )}
                    >
                      <NavigationMenuTrigger className="sm:text-lg md:text-xl lg:text-2xl text-2xl font-semibold rounded-none font-lateef bg-dark px-[2px]">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-lvw max-w-screen-md">
                          <div className=" grid grid-cols-3">
                            <div className="relative col-span-2">
                              <div className="flex flex-wrap">
                                {item.items.map((link: any) => (
                                  <ul className="w-1/2 p-2" key={link.id}>
                                    <Link
                                      className="w-64 min-w-60 "
                                      onMouseLeave={() => setBanner(null)}
                                      onMouseOver={() =>
                                        link.image
                                          ? setBanner(
                                              getStrapiMedia(link.image.url)!
                                            )
                                          : setBanner(null)
                                      }
                                      href={
                                        link.page
                                          ? `/pages/${link.page.documentId}`
                                          : link.url
                                      }
                                      replace
                                      scroll={false}
                                    >
                                      <p className=" inline-block text-lg select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        {link.label}

                                        <span className="block text-sm leading-tight text-muted-foreground py-2 indent-1">
                                          {link.description}
                                        </span>
                                      </p>
                                    </Link>
                                  </ul>
                                ))}
                              </div>
                            </div>

                            <div className="relative flex-1 m-2 overflow-hidden min-h-64 float-start">
                              {banner && (
                                <Image
                                  src={banner}
                                  alt=""
                                  fill
                                  priority
                                  sizes="100%"
                                  className="w-full h-auto object-fill rounded-lg max-h-64"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem
                      key={item.id}
                      className={cn(
                        "mx-0",
                        pathname === item.page.path && "text-blue-800"
                      )}
                    >
                      <Link
                        href={item.page.path ?? item.url}
                        scroll={false}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-xl font-semibold rounded-none "
                        )}
                        replace
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <Sidebar />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
