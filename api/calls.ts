import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICallFilters, ICallLogs } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
import { AxiosHeaders, AxiosResponse } from "axios";
import { buildQueryParams } from "@/lib/utils/build-query-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { operateOnDays, isValidDate, getDateString } from "@/lib/utils/date-utils";

export const useFetchCalls = () => {
    const { updateUrlParams } = useUpdateUrlParams()
    const fetchCalls = async (filters: ICallFilters): Promise<AxiosResponse<ICallLogs>> => {
        let redirect400 = false;

        if (filters.startDate) {
            const isValid = isValidDate(filters.startDate, "locale")
            const isoString = getDateString(filters.startDate, "locale")
            filters['startDate'] = isValid ? operateOnDays(isoString) : undefined
            redirect400 = !isValid
        } else {
            filters['startDate'] = operateOnDays(undefined, -7)
        }

        if (filters.endDate) {
            const isValid = isValidDate(filters.endDate, "locale")
            const isoString = getDateString(filters.endDate, "locale")
            filters['endDate'] = isValid ? operateOnDays(isoString) : undefined
            redirect400 = !isValid
        } else {
            filters['endDate'] = operateOnDays()
        }

        // Invalid request
        if (redirect400) {
            return Promise.resolve({
                data: { items: [] },
                status: 400,
                statusText: "Bad Request",
                headers: new AxiosHeaders(),
                config: { headers: new AxiosHeaders() },
            });
        }

        // Update browser params
        // Convert back to en gb locale
        const browserParams = { ...filters }
        browserParams['startDate'] = getDateString(filters.startDate, "ISO")
        browserParams['endDate'] = getDateString(filters.endDate, "ISO")
        updateUrlParams(browserParams)

        const finalEndpoint = callsEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    }

    return { fetchCalls };
};