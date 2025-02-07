import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { TActivityType } from "@/lib/interfaces/activity-interface";

export const useActivityFilters = () => {
    const { resetUrlParams } = useUpdateUrlParams()

    const retrieveActivityFilters = () => {
        const getUrlParams = useGetUrlParams();
        const activityTypesParams = getUrlParams("action")?.split(',');
        let activityTypes: TActivityType[] = [];

        if (activityTypesParams.length > 1 || !activityTypesParams.includes('')) {
            activityTypes = activityTypesParams as TActivityType[];
        }

        return {
            search: getUrlParams("search") || "",
            activityTypes: activityTypes as TActivityType[],
            startDate: getUrlParams("startDate") ? new Date(getUrlParams("startDate")) : undefined,
            endDate: getUrlParams("endDate") ? new Date(getUrlParams("endDate")) : undefined,
            
        }
    }

    const retrievedFilters = retrieveActivityFilters()

    const resetActivityFilters = () => {
        resetUrlParams()
    }

    return { retrievedFilters, resetActivityFilters }
}