import { defaultPaginationValues } from "@/constants/pagination-values";
import { IActivityFilters } from "@/lib/interfaces/activity-interface";

export const defaultActivityFilterValues: IActivityFilters = {
    search: undefined,
    eventType: undefined,
    startDate: undefined,
    endDate: undefined,
    ...defaultPaginationValues
}