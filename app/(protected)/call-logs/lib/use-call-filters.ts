import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";


export const useCallFilters = () => {
    const { resetUrlParams } = useUpdateUrlParams()

    const retrieveCallFilters = (): ICallFilters => {
        const getUrlParams = useGetUrlParams();
        const callTypesParams = getUrlParams("callTypes")?.split(',');
        // let callTypes: TCallDirections[] = [];

        // if (callTypesParams.length > 1 || !callTypesParams.includes('')) {
        //     callTypes = callTypesParams as TCallDirections[];
        // }

        return {
            search: getUrlParams("search") || "",
            // callDirection: callTypes as TCallDirections[],
            callDirection: getUrlParams("callDirection") as TCallDirections || undefined,
            startDate: getUrlParams("startDate") ? new Date(getUrlParams("startDate")) : undefined,
            endDate: getUrlParams("endDate") ? new Date(getUrlParams("endDate")) : undefined,
            minimumDurationSeconds: parseFloat(getUrlParams("minimumDurationSeconds") || ""),
            maximumDurationSeconds: parseFloat(getUrlParams("maximumDurationSeconds") || ""),
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