import { ICallFilters } from "@/lib/interfaces/call-interface";
import { defaultCallFilterValues } from "./default-filter-values";

export const useParseAdvanceFilterDefaults = () => {
    const parseFilterDefaults = (retrievedFilters?: ICallFilters) => {
        console.log("use parse advance: ", retrievedFilters);

        if (!retrievedFilters) {
            return defaultCallFilterValues;
        }

        let startDate: string | undefined;
        let endDate: string | undefined;
        let startTime: string | undefined;
        let endTime: string | undefined;

        const formatDateAndTime = (isoString: string) => {
            try {
                const dateObj = new Date(isoString);

                if (isNaN(dateObj.getTime())) throw new Error("Invalid Date");

                // Extract local date and time separately
                const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
                const hours = dateObj.getUTCHours().toString().padStart(2, "0");
                const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

                console.log("fasfsa: ", {
                    date,
                    hours,
                    minutes
                })

                return { date, time: `${hours}:${minutes}` };
            } catch (error) {
                console.error("Date parsing error:", error);
                return { date: undefined, time: undefined };
            }
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
        console.log("final adv filter ", {
            startDate,
            endDate,
            startTime,
            endTime,
            minimumDurationSeconds: retrievedFilters?.minimumDurationSeconds ?? undefined,
            maximumDurationSeconds: retrievedFilters?.maximumDurationSeconds ?? undefined,
            hasPciCompliance: retrievedFilters?.hasPciCompliance ?? undefined,
            hasQualityEvaluation: retrievedFilters?.hasQualityEvaluation ?? undefined,
            hasVideoRecording: retrievedFilters?.hasVideoRecording ?? undefined,
        })
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
