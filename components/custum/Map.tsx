"use client";
import { memo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  GeoJSON,
  Circle,
  Tooltip,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Calendar } from "@/components/ui/calendar";
import useSWR from "swr";
import { arTN } from "date-fns/locale";
//import Pluviometrie from "./GarphicalChart/Precipitation";

const marker = [
  { code: 51, position: [10.6924, 36.4414] },
  { code: 52, position: [10.7279, 36.4929] },
  { code: 53, position: [10.7997, 36.5001] },
  { code: 54, position: [10.8123, 36.6298] },
  { code: 55, position: [10.8457, 36.7204] },
  { code: 56, position: [10.9381, 36.8048] },
  { code: 57, position: [11.0498, 36.8262] },
  { code: 58, position: [11.0767, 36.9126] },
  { code: 59, position: [10.9142, 36.9511] },
  { code: 60, position: [10.6801, 36.8077] },
  { code: 61, position: [10.5251, 36.7163] },
  { code: 62, position: [10.6754, 36.6688] },
  { code: 63, position: [10.6294, 36.6237] },
  { code: 64, position: [10.4471, 36.5911] },
  { code: 65, position: [10.5885, 36.5253] },
  { code: 66, position: [10.4675, 36.4298] },
];
type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

type MapProps = {
  center: LatLngLiteral;
};

export const Map: React.FC<MapProps> = memo(({ center }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mapType, setMapType] = useState<MapType>("satellite");
  const [isMounted, setIsMounted] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dateLimite =
    new Date().getMonth() < 9
      ? `09/01/${new Date().getFullYear() - 1}`
      : `09/01/${new Date().getFullYear()}`;
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== undefined) {
      if (window.innerWidth < 640) {
        setIsDesktop(true);
      } else setIsDesktop(false);
    }
  }, [isDesktop]);

  const { data: delegations } = useSWR("/api/delegations");
  const { data: pluviomtrie } = useSWR(
    `/api/pluviometries?filters[Date_Jour][$eq]=${date?.toLocaleDateString(
      "en-CA"
    )}`
  );

  /**Images satellites */
  const getUrl = () => {
    const mapTypeUrls: Record<MapType, string> = {
      roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      satellite: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
      hybrid: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
      terrain: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    };
    return mapTypeUrls[mapType];
  };

  if (!pluviomtrie) console.log("chargement ...");
  else console.log(JSON.stringify(pluviomtrie));
  if (!delegations) return <>Loading data ...</>;
  return isMounted ? (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="relative flex"
      >
        <MapContainer
          center={center}
          zoom={isDesktop ? 9 : 10}
          minZoom={5}
          maxZoom={17}
          zoomSnap={0.1}
          zoomDelta={0.25}
          zoomControl={false}
          attributionControl={false}
          style={{
            width: "100%",
            height: "100%",
            border: "2px dotted #8b94a5",
          }}
          className="absolute z-10"
        >
          <TileLayer url={getUrl()} />
          <ZoomControl position="topleft" />
          {delegations.data.map((deleg: any) => (
            <div key={deleg.id}>
              <GeoJSON
                data={deleg.geodata}
                style={{ color: "black" }}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(
                    `
                  <div key=${deleg.id} style="color:#0B8BA8;font-family:Amiri;font-size:16px;text-align:right;">
                  <h3 style="color:#d55e14;text-align:center;">${feature.properties.N_DELEG}</h3>
                  <h2>معدل التساقطات السنــــوي:&nbsp;<strong style="color:#d55e14;">${feature.properties.Precip_Moy} </strong>مم</h2>
                  </div>
                  `,
                    {
                      direction: "center",
                      opacity: 1,
                      offset: [120, 0],
                      sticky: true,
                    }
                  );
                }}
              />
            </div>
          ))}
          {marker.map(({ code, position }) => (
            <Circle
              key={code}
              center={{
                lat: position[1],
                lng: position[0],
              }}
              radius={20}
              pathOptions={{ fillColor: "blue" }}
            >
              {pluviomtrie &&
                pluviomtrie.data &&
                pluviomtrie.data.map(({ Precipitation }: any) =>
                  Precipitation.map(
                    ({ delegation, quantity }: any) =>
                      delegation.code_deleg === code && (
                        <Tooltip
                          permanent
                          key={code}
                          offset={[40, 0]}
                          direction="center"
                          opacity={0.7}
                        >
                          <span className="font-lateef text-lg text-blue-900">
                            {quantity}&nbsp;مم
                          </span>
                        </Tooltip>
                      )
                  )
                )}
            </Circle>
          ))}
        </MapContainer>
        <Calendar
          mode="single"
          locale={arTN}
          selected={date}
          onSelect={setDate}
          fromDate={new Date(dateLimite)}
          toDate={new Date()}
          styles={{
            caption: { color: "darkcyan" },
            caption_label: { fontWeight: "bolder", fontSize: "150%" },
            head_row: { display: "none" },
          }}
          className="z-20 ms-2 mt-2 rounded-md shadow absolute border bg-primary-foreground scale-50 -translate-y-20 translate-x-16 sm:transform-none "
        />
        {/* <Pluviometrie jour={date} /> */}
      </div>
      <div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
        <button onClick={() => setMapType("roadmap")}>Roadmap</button>
        <button onClick={() => setMapType("satellite")}>Satellite</button>
        <button onClick={() => setMapType("hybrid")}>Hybrid</button>
        <button onClick={() => setMapType("terrain")}>Terrain</button>
      </div>
    </>
  ) : (
    <>Data loading ...</>
  );
});
