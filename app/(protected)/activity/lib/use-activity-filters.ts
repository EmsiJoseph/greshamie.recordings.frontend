import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { IActivityFilters, TEventType } from "@/lib/interfaces/activity-interface";

export const useActivityFilters = () => {
    const { resetUrlParams } = useUpdateUrlParams();
    const getUrlParams = useGetUrlParams();

    const retrieveActivityFilters = (): IActivityFilters => {

        return {
            search: getUrlParams("search") || "",
            eventType: getUrlParams("eventType") as TEventType || undefined,
            startDate: getUrlParams("startDate") ?? undefined,
            endDate: getUrlParams("endDate") ?? undefined,
        };
    };

    const retrievedFilters = retrieveActivityFilters();

    const resetActivityFilters = () => {
        resetUrlParams();
    };

    return { retrievedFilters, resetActivityFilters };
};
