"use client";
import { Chart } from "react-google-charts";

const data = [
  ["Annee", "Investissement", { role: "annotation" }, "Subvention"],
  ["2023", 0.628, "0.628", 0.264],
  ["2022", 1.479, "1.479", 0.597],
  ["2021", 1.95, "1.950", 0.792],
  ["2020", 2.707, "2.707", 1.195],
  ["2019", 4.586, "4.586", 1.86],
  ["2018", 6.256, "6.256", 2.475],
  ["2017", 2.273, "2.273", 0.761],
  ["2016", 2.2, "2.2", 0.685],
];
const data2 = [
  ["Secteur", "Investissement", { role: "annotation" }],
  ["ري فلاحي", 112800, "112800"],
  ["تربية الماشية", 121044, "121044"],
  ["معدات فلاحية", 241980, "241980"],
  ["زراعة الأشجار", 9140, "9140"],
  ["البناءات", 30217, "30217"],
  ["الصيد البحري", 112675, "112675"],
];
const options = {
  title: "تطور قيمة الإستثمار",
  titlePosition: "out",
  titleTextStyle: {
    color: "#e68a00",
    fontSize: 24,
    fontName: "lateef",
    bold: true,
  },
  vAxis: {
    title: "السنة",
    titleTextStyle: { bold: true, color: "#3366cc", fontSize: 14 },
    textStyle: { bold: true, fontName: "Times-Roman", color: "#804d00" },
  },
  hAxis: {
    title: "القيمة يالمليون دينار",
    titleTextStyle: { bold: true, color: "#3366cc", fontSize: 14 },
    textStyle: { bold: true, fontName: "Times-Roman" },
    gridlines: { minSpacing: 3, color: "transparent", count: 2 },
  },
  legend: {
    position: "bottom",
    textStyle: { bold: true, color: "#804d00", fontSize: 12 },
    alignment: "center",
    maxLines: 2,
  },
  tooltip: { trigger: "selection" },
  animation: {
    duration: 1000,
    easing: "inAndOut",
  },
  series: {
    0: { color: "#339999", labelInLegend: "قيمة الإستثمار" },
    1: { labelInLegend: "قيمة المنحة" },
  },
  backgroundColor: "transparent",
  annotations: {
    alwaysOutside: true,
    highContrast: true,
    textStyle: {
      fontName: "Times-Roman",
      fontSize: 14,
      bold: true,
      color: "#338110",
      opacity: 1,
    },
  },
};
export default function FinancementChart() {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center mx-auto my-2">
      <div className="relative w-[450px] h-[400px] shadow-lg border-2 border-primary  rounded-xl">
        <Chart
          chartType="BarChart"
          options={options}
          data={data}
          height={"100%"}
          width={"100%"}
          className="rounded-xl bg-primary/95 shadow-muted-foreground/90 shadow-xl border-2 px-0"
        />
      </div>
      <div className="relative w-[450px] h-[400px] shadow-lg border-2 border-primary  rounded-xl">
        <Chart
          chartType="PieChart"
          data={data2}
          options={{
            is3D: true,
            title: "توزيع الإستثمارات حسب النشاط الفلاحي",
            titleTextStyle: {
              color: "#e68a00",
              bold: true,
              fontSize: 24,
              fontName: "lateef",
            },
            tooltip: {
              showColorCode: true,
              textStyle: { fontName: "lateef", fontSize: 18, bold: true },
              ignoreBounds: true,
            },
            backgroundColor: "transparent",
            legend: {
              position: "bottom",
              textStyle: { bold: true, color: "#804d00", fontSize: 12 },
              alignment: "center",
              maxLines: 2,
            },
          }}
          height={"100%"}
          width={"100%"}
          className="rounded-xl bg-primary/95 shadow-muted-foreground/90 shadow-xl border-2 px-0"
        />
      </div>
    </div>
  );
}
