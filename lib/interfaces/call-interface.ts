import { CallTypes } from "@/constants/call-types"

export type TCallType = typeof CallTypes[keyof typeof CallTypes] | ""

// Type: To get the keys later and print it later
export interface ICall {
    id: number,
    date: Date,
    caller: string,
    receiver: string,
    callType: TCallType,
    duration: number, // in minutes
    recorder: string, 
    size: number // in kilobytes
}

export interface ICallFilters {
    search?: string,
    callType?: TCallType | "",
    minDuration?: number,
    maxDuration?: number,
    caller?: string,
    receiver?: string,
    recorder?: string,
    size?: number,
    page?: number
}