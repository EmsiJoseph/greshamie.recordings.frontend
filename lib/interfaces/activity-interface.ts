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
    hasNext?: boolean,
    hasPrevious?: boolean,
    items?: IActivity[] | [],
    pageSize?: number
    pageOffset?: number
    totalCount?: number,
    totalPages?: number
}

export interface IActivityFilters {
    search?: string,
    eventType?: TEventType,
    startDate?: Date,
    endDate?: Date,
    user?: string,
    recordingItem?: string,
}