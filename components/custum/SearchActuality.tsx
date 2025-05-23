"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchActuality() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: any) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 3000);

  return (
    <div className="relative w-72 rounded-md py-2 shadow-sm">
      <div className="pointer-events-none absolute inset-x-0 mr-1.5 mt-2">
        <Search
          size={15}
          className="text-primary"
          aria-hidden="true"
        />
      </div>

      <Input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder="بحث في الأنشطة ..."
        className="peer block w-full border-2 bg-white pr-6 text-lg font-semibold text-black"
      />
    </div>
  );
}
