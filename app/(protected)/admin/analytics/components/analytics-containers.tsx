"use client";

import React, { useState } from "react";
import AnalyticsList from "./analytics-list";
import {
  IAnalyticsCategory,
  IAnalyticsFilters,
  IStatItem,
} from "@/lib/interfaces/analytic-interface";

interface AnalyticsContainerProps {
  filters: IAnalyticsFilters;
  isFetching: boolean;
  data: IAnalyticsCategory[];
  onFilterChange: (updatedFilters?: IAnalyticsFilters) => void;
}

export default function AnalyticsContainer({
  filters,
  isFetching,
  data,
  onFilterChange,
}: AnalyticsContainerProps) {
  return (
    <div>
      {/* Filter Inputs */}
      {/* Add your filter inputs here, similar to the 'CallListFilters' */}
      <div>
        {/* Example category filter */}
        <input
          type="text"
          placeholder="Category Filter"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="p-2 border rounded-md w-full mt-2"
        />
      </div>

      {/* Loading, Error, and Analytics List */}
      {isFetching && (
        <div className="text-center text-gray-500">Loading analytics...</div>
      )}
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold mb-4">{item.categoryName}</h2>
            <AnalyticsList statItem={item.data} />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
}
