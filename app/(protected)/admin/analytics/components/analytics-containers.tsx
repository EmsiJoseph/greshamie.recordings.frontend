"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce"; 
import {
  IAnalyticsCategory,
  IAnalyticsFilters,
<<<<<<< HEAD
} from "@/lib/interfaces/analytic_interface";
import AnalyticsList from "./analytics-list";
=======
  IStatItem,
} from "@/lib/interfaces/analytic-interface";
>>>>>>> d529f52dc5abb71f7b67351f1252cbfe96c958f1

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
  // Maintain categorySearch independent of filters.category to prevent unwanted resets
  const [categorySearch, setCategorySearch] = useState(filters.category || "");

  // Debounced value of categorySearch
  const debouncedCategory = useDebounce(categorySearch);

  // Apply filter change only when the debounced value actually changes
  useEffect(() => {
    if (debouncedCategory !== filters.category) {
      onFilterChange({ category: debouncedCategory });
    }
  }, [debouncedCategory, filters.category, onFilterChange]);

  return (
    <div>
      {/* Category Filter Input */}
      <div>
        <input
          type="text"
          placeholder="Category Filter"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="p-2 border rounded-md w-full mt-2"
        />
      </div>

      {/* Analytics List with no unnecessary UI flickers */}
      {isFetching ? (
        <div className="text-center text-gray-500">Loading analytics...</div>
      ) : data && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold mb-4 pt-5">{item.categoryName}</h2>
            <AnalyticsList statItem={item.data} title={""} />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
}
