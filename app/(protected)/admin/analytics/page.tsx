"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { sampleFetchAnalytics } from "@/api/analytics";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import AnalyticsContainer from "./components/analytics-containers";
import { IAnalyticsFilters } from "@/lib/interfaces/analytic_interface";
import AnalyticsList from "./components/analytics-list";

export default function AnalyticsPage() {
  const { updateUrlParams } = useUpdateUrlParams();
  const getUrlParams = useGetUrlParams();

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
    <div className="p-6 bg-gray-100 min-h-screen">
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
