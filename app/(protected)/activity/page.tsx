"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/api/activities";
import { ActivityListFilters } from "./components/filters/activity-list-filters";
import { ActivityList } from "../activity/components/activity-list";
import { useActivityFilters } from "./lib/use-activity-filters";
import { IActivityFilters, } from "@/lib/interfaces/activity-interface";
import { useEffect } from "react";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useUpdateUrlParams } from "@/hooks/use-url-params";

export default function ActivityPage() {
  const { updateUrlParams } = useUpdateUrlParams();

  const { retrievedFilters, resetActivityFilters } = useActivityFilters();
  // 01 Prepare filters for query key
  let filters = { ...retrievedFilters } as Record<string, any>;
  Object.entries(retrievedFilters).forEach(([key, value]) => {
    if (value instanceof Date) {
      filters[key] = value.toISOString();
    }
  });

  // --> Convert filters to an array and clean falsy values
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["activities", ...filterValues],
    queryFn: () => fetchActivity({ ...retrievedFilters }),
  });

  if (isError) {
    handleApiClientSideError({
      error: "Something went wrong. Try again later.",
      isSuccessToast: false,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      const paginationData: IActivityFilters = {
        hasNext: data.data.hasNext,
        hasPrevious: data.data.hasPrevious,
        pageSize: data.data.pageSize,
        pageOffSet: data.data.pageOffSet,
        totalCount: data.data.totalCount,
        totalPages: data.data.totalPages,
      };
      updateUrlParams(paginationData);
    }
  }, [isSuccess, updateUrlParams, data]);

  return (
    <div>
      <ActivityListFilters
        retrievedFilters={retrievedFilters}
        resetActivityFilters={resetActivityFilters}
      />
      <ActivityList activities={data?.data} isFetching={isFetching} />
    </div>
  );
}