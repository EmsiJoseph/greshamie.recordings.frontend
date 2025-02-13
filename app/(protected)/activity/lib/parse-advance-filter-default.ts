import { IActivityFilters } from "@/lib/interfaces/activity-interface";

export const parseAdvanceFilterDefaults = (retrieveFilters?: IActivityFilters) => {
    if (!retrieveFilters) {
        return {
            startDate: undefined,
            endDate: undefined,
            startTime: undefined,
            endTime: undefined,
        }
    }

    let startDate: string | undefined;
    let endDate: string | undefined;
    let startTime: string | undefined;
    let endTime: string | undefined;

    if (retrieveFilters?.startDate) {
        try {
            // Convert to UTC Date to check validity
            const dateObj = new Date(retrieveFilters.startDate)
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

    if (retrieveFilters?.endDate) {
        try {
            // Convert to UTC Date to check validity
            const dateObj = new Date(retrieveFilters.endDate)
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
    }
    return parsedValues;
}