import { CallTypes } from "@/constants/call-types"

export type TCallType = typeof CallTypes[keyof typeof CallTypes]

export interface ICall {
    id: number,
    date: Date,
    caller: string,
    receiver: string,
    callType: TCallType,
    duration: number, 
    recorder: string,
}

export interface ICallFilters {
    search?: string,
    callTypes?: TCallType[],
    startDate?: Date,
    endDate?: Date,
    minDuration?: number,
    maxDuration?: number,
    caller?: string,
    receiver?: string,
    recorder?: string,
    hasVideoRecording?: boolean,
    hasPciCompliance?: boolean,
    hasQualityEvaluation?: boolean,
    page?: number
}