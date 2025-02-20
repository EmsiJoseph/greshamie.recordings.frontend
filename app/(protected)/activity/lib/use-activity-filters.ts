import { useUpdateUrlParams } from "@/hooks/use-url-params";
import {
  IActivityFilters,
  TEventType,
} from "@/lib/interfaces/activity-interface";
import { parseBoolean, parseNumber } from "@/lib/utils/parse-values";
import { defaultActivityFilterValues } from "./default-filter-values";
import { EventTypes } from "@/constants/activity-types";
import { isValidDate } from "@/lib/utils/date-utils";

export const useActivityFilters = () => {
  const { resetUrlParams, getUrlParams } = useUpdateUrlParams();
  let shouldAppendDefaultParams = false
  let hasInvalidFilter = false;
  let isAutoFetchEnabled = false;

  const retrieveActivityFilters = (): IActivityFilters => {
    const finalFilters = { ...defaultActivityFilterValues }
    Object.keys(defaultActivityFilterValues).forEach((key) => {
      const filterKey = key as keyof IActivityFilters;
      const value = getUrlParams(key)

      // 01 Handle Default Params | Start, End Date, PageOffSet, Page Size
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
      if (key === 'pageOffSet' || key === 'pageSize') {
        if (!value) {
          shouldAppendDefaultParams = true
          delete finalFilters[filterKey];
          return
        }
         // Check validity
        const numericValue = parseNumber(value)
        if (!numericValue || numericValue === 0) { hasInvalidFilter = true; return; }

        finalFilters[key as keyof IActivityFilters] = numericValue as any
        return
      }

      if (key === 'eventType' && value) {
        const isValid = value.toUpperCase() in EventTypes;
        if (!isValid) {
          hasInvalidFilter = true;
          return;
        }
        finalFilters[key] = value;
        return;
      }

      if (value === "" || value === undefined || value === null) {
        delete finalFilters[filterKey];
        return
      }

      
      // 07 For all other strings
      finalFilters[key as keyof IActivityFilters] = value as any
    });

    
    shouldAppendDefaultParams = shouldAppendDefaultParams ? shouldAppendDefaultParams : Object.keys(finalFilters).length === 0
    return finalFilters
  }

    const retrievedFilters = retrieveActivityFilters()

    // Use this in react query
    const queryKey = { ...retrievedFilters }
    delete queryKey.hasNext
    delete queryKey.hasPrevious
    delete queryKey.totalCount
    delete queryKey.totalPages


    const hasFilterValues = Object.keys(retrievedFilters).length > 0

    isAutoFetchEnabled = hasFilterValues && !hasInvalidFilter && !shouldAppendDefaultParams

    const resetActivityFilters = () => {
      resetUrlParams();
    }

    return {
      retrievedFilters,
      queryKey,
      hasInvalidFilter,
      shouldAppendDefaultParams,
      isAutoFetchEnabled,
      resetActivityFilters
    }
};