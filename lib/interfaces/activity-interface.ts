import { EventTypes } from "@/constants/activity-types"
import { IPagination } from "./pagination-interface"

export type TEventType = typeof EventTypes[keyof typeof EventTypes]

export interface IActivity {
    id: number,
    userName: string,
    eventType: TEventType,
    eventName: TEventType,
    recordingId: string,
    timestamp: Date,
}
export interface IActivityResponse extends IPagination {
    items: IActivity[] | []
}

export interface IActivityFilters extends IPagination {
    search?: string,
    eventType?: TEventType,
    startDate?: string,
    endDate?: string,
}

export interface IActivityAdvanceFilterComponent {
    startDate?: string,
    endDate?: string,
    startTime?: string,
    endTime?: string,
}