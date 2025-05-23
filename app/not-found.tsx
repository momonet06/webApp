"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center m-auto h-fit">
      <div className="flex w-full flex-col items-center justify-center ">
        <h1 className="text-9xl font-extrabold tracking-widest text-muted-foreground">
          404
        </h1>
        <div className="absolute rotate-12 rounded bg-[#FF6A3D] px-2 text-sm">
          لم يتم العثور على الصفحة
        </div>
        <button className="mt-5">
          <div className="group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500">
            <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative block rounded border border-current bg-[#1A2238] px-8 py-3">
              <Link href={"/"} className="text-md font-semibold">
                الصفحة الرئيسيّة
              </Link>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
