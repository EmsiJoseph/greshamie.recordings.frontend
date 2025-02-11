import { ActivityTypes } from "@/constants/activity-types"

export type TActivityType = typeof ActivityTypes[keyof typeof ActivityTypes]

export interface IActivity {
    id: number,
    date: Date,
    user: string,
    recordingItem: string,
    action: TActivityType,
}

export interface IActivityFilters {
    search?: string,
    action?: TActivityType[],
    startDate?: Date,
    endDate?: Date,
    user?: string,
    recordingItem?: string,
}