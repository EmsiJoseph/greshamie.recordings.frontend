import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { activityEndpoint } from "./endpoints/activity-endpoints";
import { IActivityFilters, IActivityResponse } from "@/lib/interfaces/activity-interface";
import { AxiosResponse } from "axios";
import { getDateString } from "@/lib/utils/date-utils";
import { buildQueryParams } from "@/lib/utils/build-query-params";

export const useFetchActivity = () => {
    const fetchActivity = async (filters: IActivityFilters): Promise<AxiosResponse<IActivityResponse>> => {
        if (filters.startDate && filters.endDate) {
            filters['startDate'] = getDateString(filters.startDate, "locale")
            filters['endDate'] = getDateString(filters.endDate, "locale")
        }

        if (filters.pageOffSet && filters.pageOffSet > 0) {
            filters['pageOffSet'] = filters.pageOffSet - 1
        }
        const finalEndpoint = activityEndpoint + buildQueryParams(filters);
        return await GreshamAxiosConfig.get(finalEndpoint);
    };
    return { fetchActivity };
}