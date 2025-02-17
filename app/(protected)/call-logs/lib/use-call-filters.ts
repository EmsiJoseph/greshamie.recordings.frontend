import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";
import { parseBoolean, parseNumber } from "@/lib/utils/parse-values";
import { defaultCallFilterValues } from "./default-filter-values";
import { CallDirections } from "@/constants/call-types";
import { useEffect, useMemo, useRef } from "react";

const getUtcDate = (daysAgo = 0) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString();
};

export const useCallFilters = () => {
  const { resetUrlParams } = useUpdateUrlParams();
  const getUrlParams = useGetUrlParams();

  const retrieveCallFilters = (): ICallFilters | undefined => {
    const finalFilters = { ...defaultCallFilterValues }
    let redirect400 = false;
    Object.keys(defaultCallFilterValues).forEach((key) => {
      const filterKey = key as keyof ICallFilters;
      const value = getUrlParams(key)

      // 01 Handle Start and End Dates 
      if (key === 'startDate' || key === 'endDate') {
        try {
          const parsedDate = new Date(value).toISOString();
          finalFilters[key] = parsedDate;
          return;
        } catch {
          if (value) {
            redirect400 = true;
            return
          }
          const startOrEndDate = key === "startDate" ? 7 : 0;
          const utcString = getUtcDate(startOrEndDate);
          finalFilters[key] = utcString;
          return;
        }
      }

      // 02 Handle CallDirections
      if (key === 'callDirection' && value) {
        const isValid = value.toUpperCase() in CallDirections;
        if (!isValid) {
          redirect400 = true;
          return;
        }
        finalFilters[filterKey] = value as any;
        return;
      }

      // 03 Handle falsy values (delete if necessary)
      // Except for FALSE, 0
      if (value === "" || value === undefined || value === null) {
        delete finalFilters[filterKey];
      }
    });

    if (redirect400) {
      return undefined
    }
    // console.log("Final filters", finalFilters)
    return finalFilters

  };

  const retrievedFilters = retrieveCallFilters()

  const prevFiltersRef = useRef<ICallFilters | undefined>(undefined);

  useEffect(() => {
    prevFiltersRef.current = retrievedFilters;
  }, [retrievedFilters]);
  const prevFilters = prevFiltersRef.current;

  const resetCallFilters = () => {
    resetUrlParams();
  };

  return { retrievedFilters, resetCallFilters, prevFilters };
};
