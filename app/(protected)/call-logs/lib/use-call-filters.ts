import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICall, ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";
import { parseBoolean, parseNumber } from "@/lib/utils/parse-values";
import { defaultCallFilterValues } from "./default-filter-values";
import { CallDirections } from "@/constants/call-types";
import { useEffect, useMemo, useRef } from "react";
import { isValidDate } from "@/lib/utils/date-utils";

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
        const isValid = isValidDate(value, "locale")
        // redirect400 = !isValid
        finalFilters[key as keyof ICallFilters] = value as any
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
        return
      }

      // Else
      finalFilters[key as keyof ICallFilters] = value as any
    });

    return redirect400 ? undefined : finalFilters
  };

  const retrievedFilters = retrieveCallFilters()

  const resetCallFilters = () => {
    resetUrlParams();
  };

  return { retrieveCallFilters, retrievedFilters, resetCallFilters };
};
