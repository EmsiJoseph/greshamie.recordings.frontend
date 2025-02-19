import { defaultPaginationValues } from "@/constants/pagination-values";
import { ICallFilters } from "@/lib/interfaces/call-interface";

export const defaultCallFilterValues: ICallFilters = {
    search: undefined,
    callDirection: undefined,
    startDate: undefined,
    endDate: undefined,
    minimumDurationSeconds: undefined,
    maximumDurationSeconds: undefined,
    hasVideoRecording: undefined,
    hasPciCompliance: undefined,
    hasQualityEvaluation: undefined,
    pageOffSet: defaultPaginationValues.pageOffSet,
    pageSize: defaultPaginationValues.pageSize
    // Do not include other pagination fields here because they are not necessary for API query params
}