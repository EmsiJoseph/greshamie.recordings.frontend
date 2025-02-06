// /components/analytics-list.tsx

import { IStatItem } from "@/lib/interfaces/analytic-interface";
import React from "react";

interface AnalyticsListProps {
  statItem: IStatItem[];
  title: string;
}

export default function AnalyticsList({ statItem, title }: AnalyticsListProps) {
  // Split the statItem array into two separate columns
  const half = Math.ceil(statItem.length / 2);
  const leftColumn = statItem.slice(0, half);
  const rightColumn = statItem.slice(half);

  return (
    <div className="mb-4 px-2">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">{title}</h2>
      
      {/* Container with two columns */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {leftColumn.map((item, index) => (
            <div key={index} className="border p-3 rounded-lg shadow-sm bg-white text-center">
              <p className="text-gray-500 text-xs font-medium mb-1">{item.label}</p>
              <p className="text-xl font-bold text-black">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4">
          {rightColumn.map((item, index) => (
            <div key={index} className="border p-3 rounded-lg shadow-sm bg-white text-center">
              <p className="text-gray-500 text-xs font-medium mb-1">{item.label}</p>
              <p className="text-xl font-bold text-black">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
