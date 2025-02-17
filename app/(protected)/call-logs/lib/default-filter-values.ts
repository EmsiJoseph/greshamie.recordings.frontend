import { defaultPaginationValues } from "@/constants/pagination-values";
import { ICallFilters } from "@/lib/interfaces/call-interface";

export const defaultCallFilterValues: ICallFilters = {
    search: undefined,
    callDirection: undefined,
    startDate: undefined,
    endDate: undefined,
    minimumDurationSeconds: undefined,
    maximumDurationSeconds: undefined,
    ...defaultPaginationValues
}