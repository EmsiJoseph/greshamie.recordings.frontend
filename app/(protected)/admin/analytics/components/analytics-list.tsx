// /components/analytics-list.tsx

import React from "react";

interface StatItem {
  label: string;
  value: string | number;
}

interface AnalyticsListProps {
  data: StatItem[];
}

export default function AnalyticsList({ data }: AnalyticsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <div key={index} className="border p-3 rounded-lg text-center">
          <p className="text-gray-600 text-sm">{item.label}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
