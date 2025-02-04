import { IAnalyticsCategory } from "@/lib/interfaces/analytic_interface";

export const sampleAnalyticsData: IAnalyticsCategory[] = [
  {
    categoryName: "Live Stats",
    data: [
      { label: "In Progress", value: 10 },
      { label: "Average Duration", value: "00:34:18" },
      { label: "Max Duration", value: "01:40:00" },
    ],
  },
  {
    categoryName: "Today's Stats",
    data: [
      { label: "Recordings", value: "00:25:23" },
      { label: "Average Duration", value: "00:18:53" },
      { label: "Max Duration", value: 4 },
    ],
  },
  {
    categoryName: "All Time Live Stats",
    data: [
      { label: "In Progress", value: 24 },
      { label: "Average Duration", value: "20:10:00" },
      { label: "Max Duration", value: "50:30:20" },
    ],
  },
  {
    categoryName: "Storage Stats",
    data: [
      { label: "Recordings", value: 1967 },
      { label: "Screen Recordings", value: 54 },
      { label: "Space Used (GB)", value: 29.12 },
    ],
  },
];
