"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { sampleFetchAnalytics } from "@/api/analytics";
import { useUpdateUrlParams } from "@/hooks/use-url-params";
import AnalyticsContainer from "./components/analytics-containers";
import { IAnalyticsFilters } from "@/lib/interfaces/analytic-interface";

export default function AnalyticsPage() {
  const { updateUrlParams, getUrlParams } = useUpdateUrlParams();

  // Get filter values from URL
  const search = getUrlParams("search") || "";
  const category = getUrlParams("category") || ""; // Assuming a 'category' filter
  const filters: IAnalyticsFilters = { category };

  // Fetch analytics data based on filters
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["analytics", filters],
    queryFn: () => sampleFetchAnalytics(filters),
  });

  // Re-fetch data when URL params change
  useEffect(() => {
    refetch();
  }, [search, category, refetch]);

  // Function to handle updates from filters
  const handleFilterChange = (updatedFilters?: IAnalyticsFilters) => {
    updateUrlParams(updatedFilters);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Filter UI (optional) */}
      {/* Add your custom filter component here if needed */}
      {data && (
        <AnalyticsContainer
          filters={filters}
          isFetching={isFetching}
          data={data}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* <AnalyticsList statItem={}/> */}

    </div>
  );
}
