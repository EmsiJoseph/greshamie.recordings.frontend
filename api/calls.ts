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
    const { updateUrlParams } = useUpdateUrlParams()
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

        if (!filters.startDate) {
            filters['startDate'] = getUtcDate(7)
        }

        if (!filters.endDate) {
            filters['endDate'] = getUtcDate()
        }


        updateUrlParams(filters)
        console.log("Filter in calls: ", filters)

        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    }

    return { fetchCalls };
};