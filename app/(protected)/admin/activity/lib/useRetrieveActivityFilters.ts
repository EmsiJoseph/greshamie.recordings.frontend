import { ActivityTypes } from "@/constants/activity-types";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { TActivityType } from "@/lib/interfaces/activity-interface";
import { act } from "react";

export const useRetrieveActivityFilters = () => {
    const getUrlParams = useGetUrlParams();
    const actionParams = getUrlParams("action")?.split(',');
    let action: TActivityType[] = [];

    if (actionParams.length > 1 || !actionParams.includes('')) {
        action = actionParams as TActivityType[];
    }

    return {
        search: getUrlParams("search") || "",
        action: action as TActivityType[],
    }
}