import { CallTypes } from "@/constants/call-types";
import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { TCallType } from "@/lib/interfaces/call-interface";
import { get } from "http";


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
        startDate: getUrlParams("startDate") ? new Date(getUrlParams("startDate")) : undefined,
        endDate: getUrlParams("endDate") ? new Date(getUrlParams("endDate")) : undefined,
        minDuration: parseFloat(getUrlParams("minDuration") || "0"),
        maxDuration: parseFloat(getUrlParams("maxDuration") || "0"),
        hasVideoRecording:
            getUrlParams("hasVideoRecording") === "" ?
                undefined :
                getUrlParams("hasVideoRecording") === "true",
        hasPciCompliance:
            getUrlParams("hasPciCompliance") === "" ?
                undefined :
                getUrlParams("hasPciCompliance") === "true",
        hasQualityEvaluation:
            getUrlParams("hasQualityEvaluation") === "" ?
                undefined :
                getUrlParams("hasQualityEvaluation") === "true",
    }
}