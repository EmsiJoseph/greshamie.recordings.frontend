import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosResponse } from "axios";
import { buildQueryParams } from "@/lib/utils/build-query-params";
import { getDateString } from "@/lib/utils/date-utils";

export const useFetchCalls = () => {
    const fetchCalls = async (filters: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
        // Convert Dates to UTC Strings
        if (filters.startDate && filters.endDate) {
            filters['startDate'] = getDateString(filters.startDate, "locale")
            filters['endDate'] = getDateString(filters.endDate, "locale")
        }

        if (filters.pageOffSet && filters.pageOffSet > 0) {
            filters['pageOffSet'] = filters.pageOffSet - 1
        }
        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    };

    return { fetchCalls };
};
