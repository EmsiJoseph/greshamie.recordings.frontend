"use client";

import { useQuery } from "@tanstack/react-query";
import { useFetchActivity } from "@/api/activities";
import { ActivityListFilters } from "./components/filters/activity-list-filters";
import { ActivityList } from "../activity/components/activity-list";
import { useActivityFilters } from "./lib/use-activity-filters";
import { IActivityFilters, IActivityResponse, } from "@/lib/interfaces/activity-interface";
import { useEffect } from "react";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useUpdateUrlParams } from "@/hooks/use-url-params";
import { AxiosResponse } from "axios";
import { getDateString, operateOnDays } from "@/lib/utils/date-utils";

export default function ActivityPage() {
  const { updateUrlParams } = useUpdateUrlParams();
  const {
    retrievedFilters,
    queryKey,
    hasInvalidFilter,
    shouldAppendDefaultParams,
    isAutoFetchEnabled
  } = useActivityFilters();
  const { fetchActivity } = useFetchActivity();

  // 01 Fetching Call logs and filtering
    const qKeyStr = JSON.stringify(queryKey)
    const { data, isFetching, isError } = useQuery<
      AxiosResponse<IActivityResponse>
    >({
      queryKey: ["activities", qKeyStr],
      queryFn: () => fetchActivity({ ...queryKey }),
      enabled: isAutoFetchEnabled
    });

  useEffect(() => {
     // Append start and end dates onto the URL
     if (shouldAppendDefaultParams) {
       // Convert ISO to Locale
       const startDate = getDateString(operateOnDays(undefined, -7), "ISO") // 7 days ago
       const endDate = getDateString(operateOnDays(), "ISO") // now
       const pageOffSet = 1;
       const pageSize = 10;
 
       let defaultParams: IActivityFilters = {};
       defaultParams['startDate'] = retrievedFilters.startDate ? retrievedFilters.startDate : startDate
       defaultParams['endDate'] = retrievedFilters.endDate ? retrievedFilters.endDate : endDate
       defaultParams['pageOffSet'] = retrievedFilters.pageOffSet ? retrievedFilters.pageOffSet : pageOffSet
       defaultParams['pageSize'] = retrievedFilters.pageSize ? retrievedFilters.pageSize : pageSize
 
       updateUrlParams(defaultParams)
     }

      // Redirect to /400
      if (hasInvalidFilter) {
        window.location.href = "/400";
        return;
      }
    }, [shouldAppendDefaultParams, hasInvalidFilter, operateOnDays, updateUrlParams, getDateString]);

    useEffect(() => {
      if (data?.data) {
        const pagination = { ...data?.data }
        delete pagination.items
  
        const pageOffSet = pagination?.pageOffSet ? pagination?.pageOffSet + 1 : 1
        pagination.pageOffSet = pageOffSet;
  
        updateUrlParams(pagination)
      }
    }, [data?.data])

    useEffect(() => {
      if (isError) {
        handleApiClientSideError({
          error: "Something went wrong. Try again later.",
          isSuccessToast: false,
        });
      }
    }, [isError]);
  
  

  return (
    <div>
      <ActivityListFilters
        retrievedFilters={retrievedFilters}/>
      <ActivityList activities={data?.data} isFetching={isFetching} />
    </div>
  );
}