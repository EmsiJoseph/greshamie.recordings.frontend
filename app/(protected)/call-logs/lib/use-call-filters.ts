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
  let shouldAppendDefaultParams = false
  let hasInvalidFilter = false;
  let isAutoFetchEnabled = false;

  const retrieveCallFilters = (): ICallFilters => {
    const finalFilters = { ...defaultCallFilterValues }
    Object.keys(defaultCallFilterValues).forEach((key) => {
      const filterKey = key as keyof ICallFilters;
      const value = getUrlParams(key)

      // 01 Handle Default Params | Start, End Date
      if (key === 'startDate' || key === 'endDate') {
        if (!value) {
          shouldAppendDefaultParams = true
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

      // 02 Handle Default Params | PageOffSet
      // if (key === 'pageOffSet') {
      //   if (!value) {
      //     shouldAppendDefaultParams = true
      //     delete finalFilters[filterKey];
      //     return
      //   }

      //   // Check validity
      //   const numericValue = parseNumber(value)
      //   if (!numericValue || numericValue === 0) { hasInvalidFilter = true; console.log("invalid number: ", numericValue); return; }

      //   finalFilters[key as keyof ICallFilters] = numericValue as any
      // }

      // 03 Handle CallDirections
      if (key === 'callDirection' && value) {
        const isValid = value.toUpperCase() in CallDirections;
        if (!isValid) {
          hasInvalidFilter = true;
          return;
        }
        finalFilters[key] = value;
        return;
      }

      // 04 Numeric values
      if (key === "minDurationSeconds" || key === "maxDurationSeconds" && value) {
        const numericValue = parseNumber(value)
        if (!numericValue) { hasInvalidFilter = true; return; }

        finalFilters[key as keyof ICallFilters] = value as any
      }

      // 05 Boolean values
      if (key === "hasVideoRecording" && value) {
        const booleanValue = parseBoolean(value); // True | False | Undefined
        if (booleanValue === undefined) {
          hasInvalidFilter = true;
          return
        }

        finalFilters[key as keyof ICallFilters] = value as any
        return
      }

      // 06 Handle falsy values (delete if necessary)
      // Except for 'false' && 0
      if (value === "" || value === undefined || value === null) {
        delete finalFilters[filterKey];
        return
      }

      // 07 For all other strings
      finalFilters[key as keyof ICallFilters] = value as any
    });

    shouldAppendDefaultParams = shouldAppendDefaultParams ? shouldAppendDefaultParams : Object.keys(finalFilters).length === 0
    return finalFilters
  };

  const retrievedFilters = retrieveCallFilters() // Empty object at the very least
  console.log("Final Filters", retrievedFilters)

  const hasFilterValues = Object.keys(retrievedFilters).length > 0

  // Enable if: 01. Has filter values, 02. Has no invalid filters, 03. If dates are present already
  isAutoFetchEnabled = hasFilterValues && !hasInvalidFilter && !shouldAppendDefaultParams

  const resetCallFilters = () => {
    resetUrlParams();
  };

  return {
    retrievedFilters,
    hasInvalidFilter,
    shouldAppendDefaultParams,
    isAutoFetchEnabled,
    resetCallFilters
  };
};
