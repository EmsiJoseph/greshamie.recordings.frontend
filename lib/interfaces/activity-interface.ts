import { ActivityTypes } from "@/constants/activity-types"
import { ActivityTypesFilter } from "@/constants/activity-types"

export type TActivityType = typeof ActivityTypes[keyof typeof ActivityTypes]
export type TActivityTypeFilter = typeof ActivityTypesFilter[keyof typeof ActivityTypesFilter]

export interface IActivity {
    id: number,
    userName: string,
    eventType: TActivityTypeFilter,
    eventName: TActivityType,
    recordingId: string,
    timestamp: Date,
}
export interface IActivityResponse {
    items?: IActivity[] | [],
    pageOffset?: number,
    pageSize?: number,
    totalPages?: number,
    totalCount?: number,
    hasPrevious?: boolean,
    hasNext?: boolean,
}

export interface IActivityFilters {
    search?: string,
    eventType?: TActivityTypeFilter[],
    startDate?: Date,
    endDate?: Date,
    user?: string,
    recordingItem?: string,
}