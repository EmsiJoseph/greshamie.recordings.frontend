import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";

export const useCallFilters = () => {
  const { resetUrlParams } = useUpdateUrlParams();
  const getUrlParams = useGetUrlParams();

  const retrieveCallFilters = (): ICallFilters => {
    const minimumDurationSeconds = getUrlParams("minimumDurationSeconds")
      ? parseFloat(getUrlParams("minimumDurationSeconds")!)
      : undefined;

    const maximumDurationSeconds = getUrlParams("maximumDurationSeconds")
      ? parseFloat(getUrlParams("maximumDurationSeconds")!)
      : undefined;

    const hasVideoRecording =
      getUrlParams("hasVideoRecording") === ""
        ? undefined
        : getUrlParams("hasVideoRecording") === "true";

    const hasPciCompliance =
      getUrlParams("hasPciCompliance") === ""
        ? undefined
        : getUrlParams("hasPciCompliance") === "true";

    const hasQualityEvaluation =
      getUrlParams("hasPciCompliance") === ""
        ? undefined
        : getUrlParams("hasPciCompliance") === "true";

    return {
      search: getUrlParams("search") || undefined,
      callDirection:
        (getUrlParams("callDirection") as TCallDirections) || undefined,
      startDate: getUrlParams("startDate") ?? undefined,
      endDate: getUrlParams("endDate") ?? undefined,
      minimumDurationSeconds,
      maximumDurationSeconds,
      hasVideoRecording,
      hasPciCompliance,
      hasQualityEvaluation,
    };
  };

  const retrievedFilters = retrieveCallFilters();

  const resetCallFilters = () => {
    resetUrlParams();
  };

  return { retrievedFilters, resetCallFilters };
};
