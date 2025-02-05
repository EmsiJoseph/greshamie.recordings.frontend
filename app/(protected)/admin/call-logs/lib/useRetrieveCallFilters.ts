import { CallTypes } from "@/constants/call-types";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { TCallType } from "@/lib/interfaces/call-interface";


export const useRetrieveCallFilters = () => {
    const getUrlParams = useGetUrlParams();
    const callTypesParams = getUrlParams("callTypes")?.split(',');
    let callTypes: TCallType[] = [];

    if (callTypesParams.length > 1 || !callTypesParams.includes('')) {
        callTypes = callTypesParams as TCallType[];
    }

    return {
        search: getUrlParams("search") || "",
        callTypes: callTypes as TCallType[],
        minDuration: parseFloat(getUrlParams("minDuration") || "0"),
        maxDuration: parseFloat(getUrlParams("maxDuration") || "0"),
    }
}