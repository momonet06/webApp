"use client";
import { Chart } from "react-google-charts";
import useSWR from "swr";

export default function Pluviometrie({ jour }: { jour: Date | undefined }) {
  const { data: pluviomtrie } = useSWR(
    `/api/pluviometries?filters[Date_Jour][$eq]=${jour?.toLocaleDateString(
      "en-CA"
    )}`
  );

  const data = [["Delegation", "الكميات المسجلة"]];

  pluviomtrie &&
    pluviomtrie.data &&
    pluviomtrie.data.forEach((enreg: any) => {
      enreg.Precipitation.forEach((p: any) =>
        data.push([p.delegation.name, p.quantity])
      );
    });
  return (
    <div className="absolute z-10 bottom-0 sm:ms-2 sm:mb-2 mx-auto px-0">
      <Chart
        chartType="Bar"
        
        width="100%"
        height="100%"
        style={{ backgroundColor: "inherit" }}
        data={data}
        options={{
          bars:"horizontal",
          animation: {
            duration: 1000,
            easing: "out",
          },
          title: `الكميات المسجلة ليوم ${jour?.toLocaleDateString("en-CA")}`,
          titleTextStyle: {
            color: "#000",
            fontName: "lateef",
            fontSize: 20,
            bold: true,
          },
          legend: "none",
          colors: ["#4287f5"],
          vAxis: {
            title: "المحطات",
            titleTextStyle: {
              color: "#000",
              fontName: "lateef",
              fontSize: 18,
              bold: true,
            },
            textStyle: {
              fontName: "lateef",
              fontSize: 15,
            },
          },
          hAxis: {
            minValue: 0,
            maxValue: 50,
            format: "short",

            title: "التساقطات بالمم",
            titleTextStyle: {
              color: "#000",
              fontName: "lateef",
              fontSize: 18,
              bold: true,
            },
          },
          chartArea: { width: "50%" },
          tooltip: { textStyle: { bold: true } },
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
