import { useGetUrlParams } from "@/hooks/browser-url-params/use-get-url-params";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";
import { parseBoolean, parseNumber } from "@/lib/utils/parse-values";

const filterKeys: Record<keyof ICallFilters, "string" | "number" | "boolean"> = {
  search: "string",
  callDirection: "string",
  startDate: "string",
  endDate: "string",
  minimumDurationSeconds: "number",
  maximumDurationSeconds: "number",
  hasVideoRecording: "boolean",
  hasPciCompliance: "boolean",
  hasQualityEvaluation: "boolean",
  hasNext: "boolean",
  hasPrevious: "boolean",
  pageSize: "number",
  pageOffSet: "number",
  totalCount: "number",
  totalPages: "number",
};


export const useCallFilters = () => {
  const { resetUrlParams } = useUpdateUrlParams();
  const getUrlParams = useGetUrlParams();

  const retrieveCallFilters = (): ICallFilters => {
    return Object.keys(filterKeys).reduce((acc, key) => {
      const type = filterKeys[key as keyof ICallFilters];
      let value;

      if (type === "number") {
        value = parseNumber(getUrlParams(key));
      } else if (type === "boolean") {
        value = parseBoolean(getUrlParams(key));
      } else if (type === "string") {
        value = getUrlParams(key) === "" ? undefined : getUrlParams(key);
      }

      return { ...acc, [key]: value };
    }, {} as ICallFilters);
  };

  const retrievedFilters = retrieveCallFilters()



  const resetCallFilters = () => {
    resetUrlParams();
  };

  return { retrievedFilters, resetCallFilters };
};
