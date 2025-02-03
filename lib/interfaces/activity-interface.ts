import { ActivityTypes } from "@/constants/activity-types"

export type TActivityType = typeof ActivityTypes[keyof typeof ActivityTypes]

// Type: To get the keys later and print it later
export interface IActivity {
    id: number,
    date: Date,
    user: string,
    recordingItem: string,
    action: TActivityType,
}

export interface IActivityFilters {
    search?: string,
    action?: TActivityType,
    user?: string,
    recordingItem?: string,
}