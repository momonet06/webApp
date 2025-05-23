"use client";
import { Chart } from "react-google-charts";

export default function RepartitionSuperficie() {
  const superficies = [
    ["type", "superficie (ha)", { role: "tooltip" }],
    ["مساحات بعلية", 149844, "مساحات بعليّة 149844 هك"],
    ["مساحات سقوية", 49500, "مساحات سقويّة 49500 هك"],
    ["مساحات غابيّة", 61029, "مساحات غابيّة 61029 هك"],
    ["مساحات غير فلاحية", 23627, "مساحات غير صالحة للزراعة 23627 هك"],
  ];
  const terreDomaniales = [
    ["desc", "superficie (ha)", { role: "tooltip" }],
    [
      "الأراضي الفلاحية المهيكلة",
      8611.488,
      "الأراضي الفلاحية المهيكلة 8611.488 هك",
    ],
    [
      "الوحدات التعاضدية للإنتاج الفلاحي",
      2150.5,
      "وحدات التصرف في الإنتاج الفلاحي 2150.500 هك",
    ],
    ["المركّبات الفلاحية", 11753, "مركّبات الإنتاج الفلاحي 11753 هك"],
    [
      "أراضي خاضعة لنظام الغابات",
      37893.77,
      "أراضي خاضعة لنظام الغابات 37893.77 هك",
    ],
    ["كراء (وزارة أملاك الدولة)", 880, "كراء عن طريق وزارة أ.الدولة 800 هك"],
    ["أراضي دولية فلاحيةأخرى", 19711, "أراضي دولية أخرى 19711 هك"],
  ];
  const exploitations = [
    ["desc", "superficie (ha)"],
    ["أقل من 5 هك", 28800],
    ["بين 5 و10 هك", 6400],
    ["بين 10 و50 هك", 4400],
    ["أكثر من 50 هك", 400],
  ];
  const participation = [
    [
      "culture",
      "المساهمة في الإنتاج الوطني",
      { role: "annotation" },
      { role: "style" },
    ],
    ["الفراولة", 98, "98%", "#bf3030"],
    ["التوابل", 90, "90%", "#b74045"],
    ["القوارص", 75, "75%", "orange"],
    ["عنب التحويل", 60, "60%", "#3e3959"],
    ["البطاطــا", 42, "42%", "#cc6600"],
    ["الطماطـم", 30, "30%", "red"],
    ["اللحوم البيضاء", 42, "42%", "slate"],
    ["اللحوم الحمراء", 10, "10%", "#cc3300"],
    ["الحليب", 9, "9%", "#99ccff"],
    ["الصيد البحري", 12, "12%", "yellow"],
  ];
  const options1 = {
    title: "توزيع المساحات بالولايــة",
    titleTextStyle: {
      color: "#ff7c00",
      fontName: "amiri",
      fontSize: 20,
      bold: true,
    },
    slices: {
      0: { color: "#bd6200" },
      1: { color: "#1093e9" },
      2: { color: "#02850c" },
      3: { color: "#7d8b8c" },
    },
    pieHole: 0,
    is3D: true,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: { color: "#0b62e3", fontSize: 15, fontName: "lateef" },
    },
    backgroundColor: "transparent",
    pieSliceTextStyle: { fontName: "Times", bold: true, fontSize: 14 },
    tooltip: {
      showColorCode: true,
      textStyle: { fontName: "lateef", fontSize: 18, bold: true },
      ignoreBounds: true,
    },
  };
  const options2 = {
    title: "الأراضي الدولية الفلاحية",
    titleTextStyle: {
      color: "#ff7c00",
      fontName: "amiri",
      fontSize: 20,
      bold: true,
    },
    pieHole: 0.5,
    is3D: true,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: { color: "#0b62e3", fontSize: 15, fontName: "lateef" },
    },
    backgroundColor: "transparent",
    pieSliceTextStyle: { fontName: "Times", bold: true, fontSize: 14 },
    tooltip: {
      showColorCode: true,
      textStyle: { fontName: "lateef", fontSize: 18, bold: true },
      ignoreBounds: true,
    },
  };
  const options3 = {
    title: "توزيع المستغلات الفلاحية",
    titleTextStyle: {
      color: "#ff7c00",
      fontName: "amiri",
      fontSize: 20,
      bold: true,
    },
    is3D: true,
    pieHole: 0.5,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: { color: "#0b62e3", fontSize: 15, fontName: "lateef" },
    },
    backgroundColor: "transparent",
    pieSliceTextStyle: { fontName: "Times", bold: true, fontSize: 14 },
    tooltip: {
      showColorCode: true,
      textStyle: { fontName: "lateef", fontSize: 18, bold: true },
      ignoreBounds: true,
    },
  };
  return (
    <div className="flex flex-wrap gap-2 justify-center text-center w-full mt-2">
      <div className="relative w-full border sm:w-[305px] h-[333px] shadow-md border-primary rounded-xl items-center justify-center">
        <Chart
          chartType="PieChart"
          options={options1}
          data={superficies}
          width={"100%"}
          height={"100%"}
          className="border-2 rounded-xl bg-primary/95 shadow-muted-foreground shadow-lg"
        />
      </div>
      <div className="relative w-full border sm:w-[305px] h-[333px] shadow-md border-primary rounded-xl">
        <Chart
          chartType="PieChart"
          options={options2}
          data={terreDomaniales}
          style={{ width: "100%", height: "100%" }}
          className="border-2 rounded-xl bg-primary/95 shadow-muted-foreground shadow-lg"
        />
      </div>
      <div className="relative w-full border sm:w-[305px] h-[333px] shadow-md border-primary rounded-xl">
        <Chart
          chartType="PieChart"
          options={options3}
          data={exploitations}
          style={{ width: "100%", height: "100%" }}
          className="border-2 rounded-xl bg-primary/95 shadow-muted-foreground shadow-lg "
        />
      </div>
      <div className="relative w-full border sm:w-[305px] h-[333px] shadow-md border-primary rounded-xl">
        <Chart
          chartType="BarChart"
          options={{
            title: "المساهمة في الإنتاج الوطني",
            titleTextStyle: {
              color: "#ff7c00",
              fontName: "amiri",
              fontSize: 20,
              bold: true,
            },
            legend: "none",
            backgroundColor: "transparent",
            tooltip: { trigger: "none" },
            animation: {
              duration: 1000,
              easing: "'inAndOut",
            },
            vAxis: {
              textStyle: { fontSize: 12, bold: true, color: "#bdbdbd" },
            },
            chartArea: { left: 90 },
            annotations: {
              alwaysOutside: true,
              highContrast: true,
              textStyle: { bold: true, opacity: 1 },
            },
          }}
          data={participation}
          style={{ width: "100%", height: "100%" }}
          className="border-2 rounded-xl bg-primary/95 shadow-muted-foreground shadow-lg "
        />
      </div>
    </div>
  );
}
