"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@/components/custum/Map").then((component) => component.Map),
  { ssr: false }
);

const Page = () => {

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        height: "100vh",
        padding:"4px",
        
      }}
    >
      <Map center={{ lng: 10.8, lat: 36.77}} />
     
    </div>
  );
};

export default Page