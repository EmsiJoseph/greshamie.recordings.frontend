import { ActivityTypes } from "@/constants/activity-types"

export type TActivityType = typeof ActivityTypes[keyof typeof ActivityTypes]

export interface IActivity {
    id: number,
    userName: string,
    eventName: TActivityType,
    timestamp: Date,
    recordingItem: string,
}

export interface IActivityFilters {
    search?: string,
    eventName?: TActivityType[],
    startDate?: Date,
    endDate?: Date,
    userName?: string,
    recordingItem?: string,
}