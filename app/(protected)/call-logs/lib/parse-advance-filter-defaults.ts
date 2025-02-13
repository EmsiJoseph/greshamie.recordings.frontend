import { ICallFilters } from "@/lib/interfaces/call-interface";

export const parseAdvanceFilterDefaults = (retrievedFilters?: ICallFilters) => {
    if (!retrievedFilters) {
        return {
            startDate: undefined,
            endDate: undefined,
            startTime: undefined,
            endTime: undefined,
            minimumDurationSeconds: undefined,
            maximumDurationSeconds: undefined,
            hasPciCompliance: undefined,
            hasQualityEvaluation: undefined,
            hasVideoRecording: undefined,
        }
    }

    let startDate: string | undefined;
    let endDate: string | undefined;
    let startTime: string | undefined;
    let endTime: string | undefined;

    if (retrievedFilters?.startDate) {
        try {
            // Convert to UTC Date to check validity
            const dateObj = new Date(retrievedFilters.startDate)
            const [date, time] = dateObj.toISOString().split("T");
            startDate = date; // Time format: <input type="date" /> 

            // Split the time and format
            const [hh, mm] = time.split(":")
            startTime = `${hh}:${mm}` // Time format: <input type="time" />
        } catch {
            startDate = undefined
            startTime = undefined
        }
    }

    if (retrievedFilters?.endDate) {
        try {
            // Convert to UTC Date to check validity
            const dateObj = new Date(retrievedFilters.endDate)
            const [date, time] = dateObj.toISOString().split("T");
            endDate = date // Time format: <input type="date" /> 

            // Split the time and format
            const [hh, mm] = time.split(":")
            endTime = `${hh}:${mm}` // Time format: <input type="time" />

        } catch {
            endDate = undefined
            endTime = undefined
        }
    }

    const parsedValues = {
        startDate,
        endDate,
        startTime,
        endTime,
        minimumDurationSeconds: retrievedFilters?.minimumDurationSeconds ?? undefined,
        maximumDurationSeconds: retrievedFilters?.maximumDurationSeconds ?? undefined,
        hasPciCompliance: retrievedFilters?.hasPciCompliance ?? undefined,
        hasQualityEvaluation: retrievedFilters?.hasQualityEvaluation ?? undefined,
        hasVideoRecording: retrievedFilters?.hasVideoRecording ?? undefined,
    }
    return parsedValues
}