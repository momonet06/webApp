"use client";

export default function Barrage() {
  return (
    <div className="relative w-full aspect-1 sm:aspect-2 mx-auto overflow-hidden">
      
        <iframe
          suppressHydrationWarning
          title="Data viewer"
          loading="lazy"
          src="https://catalog.agridata.tn/fr/dataset/barrages/resource/8d70196c-a95e-4a04-9c61-8144b4b60a18/view/6896b101-db43-4676-aa07-9e39e9db4f2e"
          style={{
            border: "none",
            zoom: 0.75,
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: "0",
          }}
        ></iframe>
     
    </div>
  );
}
