import { EventTypes } from "@/constants/activity-types"

export type TEventType = typeof EventTypes[keyof typeof EventTypes]

export interface IActivity {
    id: number,
    userName: string,
    eventType: TEventType,
    eventName: TEventType,
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
    eventType?: TEventType,
    startDate?: Date,
    endDate?: Date,
    user?: string,
    recordingItem?: string,
}