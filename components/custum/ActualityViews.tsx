"use client";
import Ping from "./Ping";
import { EyeIcon } from "lucide-react";

import useActuality from "@/app/utils/hooks/useActuality";

export default function Views({ id }: { id: string }) {
  const { actuality } = useActuality(id);

  if (!actuality) return <>Loading...</>;

  return (
    <div className="view-container">
      <div className=" absolute -top-2 -right-2">
        <Ping />
      </div>
      <div className="flex gap-1 justify-center">
        <EyeIcon size={24} />
        <p className=" text-[15px] font-black ">{actuality?.data.view}</p>
       
      </div>
    </div>
  );
}
