import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { TEventType } from "@/lib/interfaces/activity-interface";

export const useActivityFilters = () => {
    const { resetUrlParams } = useUpdateUrlParams();

    const retrieveActivityFilters = () => {
        const getUrlParams = useGetUrlParams();
        const eventTypeParams = getUrlParams("eventType")?.split(",") || []; 

        return {
            search: getUrlParams("search") || "",
            // eventType: eventTypeParams as TEventType[], 
            eventType: getUrlParams("eventType") as TEventType || undefined,
            startDate: getUrlParams("startDate") ? new Date(getUrlParams("startDate")) : undefined,
            endDate: getUrlParams("endDate") ? new Date(getUrlParams("endDate")) : undefined,
        };
    };

    const retrievedFilters = retrieveActivityFilters();

    const resetActivityFilters = () => {
        resetUrlParams();
    };

    return { retrievedFilters, resetActivityFilters };
};
