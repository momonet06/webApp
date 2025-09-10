"use client";
import { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type MapProps = {
  center: LatLngLiteral;
};
const LocalisationMap: React.FC<MapProps> = memo(({ center }) => {
  return (
    <MapContainer
      center={center}
      zoom={20}
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
    >
      <TileLayer
        url={"http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"}
      />
      <Marker position={{ lng: 10.735851, lat: 36.459223 }} >
        <Popup className="text-xs text-left font-semibold">
          CRDA DE NABEUL
        </Popup>
      </Marker>
    </MapContainer>
  );
});
export default LocalisationMap;
