import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosResponse } from "axios";
import { CallDirections } from "@/constants/call-types";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
export const useFetchCalls = () => {
    const { deleteUrlParam } = useUpdateUrlParams(); // This should be called at the top level
    const fetchCalls = async (filters?: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
        let finalEndpoint = callsEndpoint;
        if (filters) {
            // Handle queryParams logic here without using hooks inside conditionals
            const queryParams = Object.entries(filters)
                .reduce((acc, [key, value]) => {
                    // Handle falsy values
                    if (!value) {
                        deleteUrlParam(key); // Always call this at the top level, not inside filter/map
                        return acc; // Skip adding this key-value pair
                    }

                    // Handle startDate or endDate formatting
                    if (key === "startDate" || key === "endDate") {
                        try {
                            new Date(value).toISOString();
                        } catch {
                            deleteUrlParam(key);
                            return acc;
                        }
                    }

                    // Handle callDirection value
                    if (key === "callDirection" && !(value?.toUpperCase() in CallDirections)) {
                        deleteUrlParam(key);
                        return acc;
                    }

                    // Accumulate valid key-value pairs
                    acc.push(`${key}=${value}`);
                    return acc;
                }, [] as string[]) // Use reduce to accumulate valid params

                .join('&')
            if (queryParams) {
                // If there are existing params in the endpoint, append with '&', else use '?'
                finalEndpoint = callsEndpoint.includes('?')
                    ? `${callsEndpoint}&${queryParams}`
                    : `${callsEndpoint}?${queryParams}`;
            }
        }

        return await GreshamAxiosConfig.get(finalEndpoint);
    };

    return { fetchCalls };
};
