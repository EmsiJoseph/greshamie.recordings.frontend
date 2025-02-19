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

        // Convert Dates to UTC Strings
        if (filters.startDate && filters.endDate) {
            filters['startDate'] = getDateString(filters.startDate, "locale")
            filters['endDate'] = getDateString(filters.endDate, "locale")
        }
        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    };

    return { fetchCalls };
};
