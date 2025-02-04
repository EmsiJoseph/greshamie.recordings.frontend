// /components/analytics-list.tsx

import { IStatItem } from "@/lib/interfaces/analytic_interface";
import React from "react";

interface AnalyticsListProps {
  statItem: IStatItem[];
}

export default function AnalyticsList({ statItem }: AnalyticsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {statItem.map((item, index) => (
        <div key={index} className="border p-3 rounded-lg text-center">
          <p className="text-gray-600 text-sm">{item.label}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
