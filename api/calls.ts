import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosHeaders, AxiosResponse } from "axios";
import { buildQueryParams } from "@/lib/utils/build-query-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { CallDirections } from "@/constants/call-types";

const getUtcDate = (daysAgo = 0) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - daysAgo);
    return date.toISOString();
};

export const useFetchCalls = () => {
    const fetchCalls = async (filters: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
        if (!filters) {
            return Promise.resolve({
                data: { items: [] },
                status: 400,
                statusText: "Bad Request",
                headers: new AxiosHeaders(),
                config: { headers: new AxiosHeaders() },
            });
        }

        

        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
        // const finalFilters = { ...filters }
        // Object.entries(filters).forEach(([key, value]) => {
        //     const filterKey = key as keyof ICallFilters;

        //     // 01 Handle Start and End Dates 
        //     if (key === 'startDate' || key === 'endDate') {
        //         try {
        //             const parsedDate = new Date(value).toISOString();
        //             finalFilters[key] = parsedDate;
        //             return;
        //         } catch {
        //             if (value) {
        //                 redirect400 = true;
        //                 return
        //             }
        //             const startOrEndDate = key === "startDate" ? 7 : 0;
        //             const utcString = getUtcDate(startOrEndDate);
        //             finalFilters[key] = utcString;
        //             return;
        //         }
        //     }

        //     // 02 Handle CallDirections
        //     if (key === 'callDirection' && value) {
        //         const isValid = value.toUpperCase() in CallDirections;
        //         if (!isValid) {
        //             redirect400 = true;
        //             return;
        //         }
        //         finalFilters[filterKey] = value;
        //         return;
        //     }

        //     // 03 Handle falsy values (delete if necessary)
        //     if (value === "" || value === undefined || value === null) {
        //         delete finalFilters[filterKey];
        //     }
        // });

        // if (redirect400) {
        //     return Promise.resolve({
        //         data: { items: [] },
        //         status: 400,
        //         statusText: "Bad Request",
        //         headers: new AxiosHeaders(),
        //         config: { headers: new AxiosHeaders() },
        //     });
        // }

        // updateUrlParams(finalFilters);
    }

    return { fetchCalls };
};