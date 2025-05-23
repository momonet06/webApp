"use client";

import React, { lazy } from "react";

const Barrages = lazy(() => import("@/components/custum/Barrage"));

function page() {
  return (
    <div className="relative w-full flex justify-center items-center">
      <Barrages />
    </div>
  );
}

export default page;
