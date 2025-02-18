import { ICallFilters } from "@/lib/interfaces/call-interface";
import { defaultCallFilterValues } from "./default-filter-values";
import { isValidDate } from "@/lib/utils/date-utils";

export const useParseAdvanceFilterDefaults = () => {
    const parseFilterDefaults = (retrievedFilters?: ICallFilters) => {
        if (!retrievedFilters) {
            return defaultCallFilterValues;
        }

        let startDate: string | undefined;
        let endDate: string | undefined;
        let startTime: string | undefined;
        let endTime: string | undefined;

        const formatDateAndTime = (dateString: string) => {
            const isValid = isValidDate(dateString, "locale");
            if (!isValid) {
                console.log("is not valid", dateString)
                return { date: "", time: "" }
            }

            // Extract local date and time separately
            const [date, time] = dateString.split(",").map(part => part.trim());
            const [day, month, year] = date.split("/");
            const [hours, minutes] = time.split(":")

            return { date: `${year}-${month}-${day}`, time: `${hours}:${minutes}` }
        };

        if (retrievedFilters?.startDate) {
            const formatted = formatDateAndTime(retrievedFilters.startDate);
            startDate = formatted.date;
            startTime = formatted.time;
        }

        if (retrievedFilters?.endDate) {
            const formatted = formatDateAndTime(retrievedFilters.endDate);
            endDate = formatted.date;
            endTime = formatted.time;
        }

        return {
            startDate,
            endDate,
            startTime,
            endTime,
            minimumDurationSeconds: retrievedFilters?.minimumDurationSeconds ?? undefined,
            maximumDurationSeconds: retrievedFilters?.maximumDurationSeconds ?? undefined,
            hasPciCompliance: retrievedFilters?.hasPciCompliance ?? undefined,
            hasQualityEvaluation: retrievedFilters?.hasQualityEvaluation ?? undefined,
            hasVideoRecording: retrievedFilters?.hasVideoRecording ?? undefined,
        };
    };

    return { parseFilterDefaults };
};
