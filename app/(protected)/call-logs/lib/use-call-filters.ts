import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { TCallType } from "@/lib/interfaces/call-interface";


export const useCallFilters = () => {
    const { resetUrlParams } = useUpdateUrlParams()

    const retrieveCallFilters = () => {
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
            minDuration: parseFloat(getUrlParams("minDuration") || ""),
            maxDuration: parseFloat(getUrlParams("maxDuration") || ""),
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

    const retrievedFilters = retrieveCallFilters()

    const resetCallFilters = () => {
        resetUrlParams()
    }

    return { retrievedFilters, resetCallFilters }
}