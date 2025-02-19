import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICallFilters } from "@/lib/interfaces/call-interface";
import { parseBoolean, parseNumber } from "@/lib/utils/parse-values";
import { defaultCallFilterValues } from "./default-filter-values";
import { CallDirections } from "@/constants/call-types";
import { isValidDate } from "@/lib/utils/date-utils";

export const useCallFilters = () => {
  const { resetUrlParams } = useUpdateUrlParams();
  const getUrlParams = useGetUrlParams();
  let shouldAppendDates = false
  let hasInvalidFilter = false;

  const retrieveCallFilters = (): ICallFilters => {
    const finalFilters = { ...defaultCallFilterValues }
    Object.keys(defaultCallFilterValues).forEach((key) => {
      const filterKey = key as keyof ICallFilters;
      const value = getUrlParams(key)

      // 01 Handle Start and End Dates 
      if (key === 'startDate' || key === 'endDate') {
        if (!value) {
          delete finalFilters[filterKey];
          return
        }

        // Check for valid date
        const isValid = isValidDate(value, "locale");
        if (!isValid) { hasInvalidFilter = true; return }

        // All checks are made, append to finalFilters
        finalFilters[key] = value
        return
      }

      // 02 Handle CallDirections
      if (key === 'callDirection' && value) {
        const isValid = value.toUpperCase() in CallDirections;
        if (!isValid) {
          hasInvalidFilter = true;
          return;
        }
        finalFilters[key] = value;
        return;
      }

      /***
       * 
       * NOTE: ADD VALIDATION FOR STRINGS (or other data types except number and bool) HERE
       * 
       */

      // 03 Numeric and Boolean values
      if (value) {
        const isBoolean = parseBoolean(value);
        const isNumeric = parseNumber(value)

        if (!isBoolean && !isNumeric) {
          hasInvalidFilter = true;
          return
        }

        finalFilters[key as keyof ICallFilters] = value as any
      }

      // 03 Handle falsy values (delete if necessary)
      // Except for 'false' && 0
      if (value === "" || value === undefined || value === null) {
        delete finalFilters[filterKey];
        return
      }
    });

    shouldAppendDates = Object.keys(finalFilters).length === 0 // Only implementation of this var

    return finalFilters
  };

  const retrievedFilters = retrieveCallFilters() // Empty object at the very least

  const resetCallFilters = () => {
    resetUrlParams();
  };

  return { retrievedFilters, hasInvalidFilter, shouldAppendDates, resetCallFilters };
};
