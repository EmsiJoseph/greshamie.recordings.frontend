import { CallTypes } from "@/constants/call-types";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";


export const useRetrieveCallFilters = () => {
    const getUrlParams = useGetUrlParams();

    return {
        search: getUrlParams("search") || "",
        callType: Object.keys(CallTypes).includes(getUrlParams("callType") as string)
            ? (getUrlParams("callType") as keyof typeof CallTypes)
            : undefined,  // fallback to undefined
        minDuration: parseFloat(getUrlParams("minDuration") || "0"),
        maxDuration: parseFloat(getUrlParams("maxDuration") || "0"),
    }
}