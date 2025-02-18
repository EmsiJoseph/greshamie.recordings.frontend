import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosHeaders, AxiosResponse } from "axios";
import { buildQueryParams } from "@/lib/utils/build-query-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { operateOnDays, isValidDate, getDateString } from "@/lib/utils/date-utils";

export const useFetchCalls = () => {
    const { updateUrlParams } = useUpdateUrlParams();

    const fetchCalls = async (filters: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
        // let redirect400 = false;

        // // Check if startDate is valid
        // if (filters.startDate) {
        //     const isValid = isValidDate(filters.startDate, "locale");
        //     console.log("isValid StartDate", isValid);

        //     const isoString = getDateString(filters.startDate, "locale");
        //     filters['startDate'] = isValid ? operateOnDays(isoString) : undefined;
        //     if (!isValid) {
        //         console.log("Invalid StartDate detected");
        //     }
        //     redirect400 = !isValid; // Set redirect400 to true if invalid
        // } else {
        //     filters['startDate'] = operateOnDays(undefined, -7);
        //     console.log("No StartDate provided, defaulting to 7 days ago");
        // }

        // // Check if endDate is valid
        // if (filters.endDate) {
        //     const isValid = isValidDate(filters.endDate, "locale");
        //     console.log("isValid endDate", isValid);

        //     const isoString = getDateString(filters.endDate, "locale");
        //     filters['endDate'] = isValid ? operateOnDays(isoString) : undefined;
        //     if (!isValid) {
        //         console.log("Invalid EndDate detected");
        //     }
        //     redirect400 = redirect400 || !isValid; // If either date is invalid, set redirect400
        // } else {
        //     filters['endDate'] = operateOnDays();
        //     console.log("No EndDate provided, defaulting to today");
        // }

        // console.log("redirect400 flag is: ", redirect400);

        // // If invalid date parameters are detected, handle the error and stop further execution
        // if (redirect400) {
        //     console.log("Invalid date parameters detected. Returning 400 Bad Request");
        //     const errorResponse = {
        //         data: { items: [] },
        //         status: 400,
        //         statusText: "Bad Request",
        //         headers: new AxiosHeaders(),
        //         config: { headers: new AxiosHeaders() },
        //     };

        //     // Throw an error explicitly
        //     throw new Error(JSON.stringify(errorResponse)); // Throw an error with detailed information
        // }

        // // Update browser params and continue with the request
        // const browserParams = { ...filters };
        // browserParams['startDate'] = getDateString(filters.startDate, "ISO");
        // browserParams['endDate'] = getDateString(filters.endDate, "ISO");
        // updateUrlParams(browserParams);


        if (filters.startDate && filters.endDate) {
            filters['startDate'] = getDateString(filters.startDate, "locale")
            filters['endDate'] = getDateString(filters.endDate, "locale")
        }
        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    };

    return { fetchCalls };
};
