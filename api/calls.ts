import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosResponse } from "axios";
export const fetchCalls = async (filters?: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
    let finalEndpoint = callsEndpoint;

    if (filters) {
        const queryParams = Object.entries(filters)
            .filter(([key, value]) => {
                // Check if the value is a non-empty array, or if it's a non-falsy string or number
                return value && (Array.isArray(value) ? value.length > 0 : true);
            })
            .map(([key, value]) => {
                // If the value is a Date, convert it to an ISO string
                if (value instanceof Date) {
                    value = value.toISOString();
                }
                return `${key}=${value}`;
            })
            .join('&'); // Join the query parameters with '&'

        if (queryParams) {
            // If there are existing params in the endpoint, append with '&', else use '?'
            finalEndpoint = callsEndpoint.includes('?')
                ? `${callsEndpoint}&${queryParams}`
                : `${callsEndpoint}?${queryParams}`;
        }
    }

    console.log(finalEndpoint); // Log the final endpoint with query params
    return await GreshamAxiosConfig.get(finalEndpoint);
};