"use client";

import React, { useState } from "react";
import AnalyticsList from "./analytics-list";
import { IAnalyticsFilters } from "@/lib/interfaces/analytic_interface";

interface AnalyticsContainerProps {
  filters: IAnalyticsFilters;
  isFetching: boolean;
  data: any;
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
        {/* Example search filter */}
        <input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="p-2 border rounded-md w-full"
        />
        {/* Example category filter */}
        <input
          type="text"
          placeholder="Category Filter"
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="p-2 border rounded-md w-full mt-2"
        />
      </div>

      {/* Loading, Error, and Analytics List */}
      {isFetching && <div className="text-center text-gray-500">Loading analytics...</div>}
      {data && <AnalyticsList data={data} />}
    </div>
  );
}
