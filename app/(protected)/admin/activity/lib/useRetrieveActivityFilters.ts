import { ActivityTypes } from "@/constants/activity-types";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";

export const useRetrieveActivityFilters = () => {
    const getUrlParams = useGetUrlParams();

    return {
        search: getUrlParams("search") || "",
        action: Object.keys(ActivityTypes).includes(getUrlParams("action") as string)
            ? (getUrlParams("action") as keyof typeof ActivityTypes)
            : undefined,  // fallback to undefined
    }
}