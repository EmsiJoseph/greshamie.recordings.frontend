import { CallAdvanceFilterSchema } from "@/lib/schema/call-advance-filter-schema";
import { getDateString } from "@/lib/utils/date-utils";
import { z } from "zod";

export const handleSubmitFilter = (
    formValues: z.infer<typeof CallAdvanceFilterSchema>,
    updateUrlParams: (param: Record<string, any>) => void,
    setOpen: (param: boolean) => void
) => {
    console.log("Final form values", formValues)
    // Combine the dates and times into 1 entity
    // date should be en-gb locale format
    const startDateISO = formValues.startDate
        ? `${formValues.startDate}T${formValues.startTime || "00:00:00.000Z"}`
        : undefined;
    const endDateISO = formValues.endDate
        ? `${formValues.endDate}T${formValues.endTime || "00:00:00.000Z"}`
        : undefined;

    // Append the converted locale date string
    formValues.startDate = getDateString(startDateISO, "ISO")
    formValues.endDate = getDateString(endDateISO, "ISO")

    let parsedFormValue: Record<string, any> = {}
    Object.entries(formValues)
        .filter(([key, value]) => {
            // Filter out undefined and empty strings
            return value !== undefined || value !== "";
        })
        .forEach(([key, value]) => {
            if (key !== "startTime" && key !== "endTime") {
                parsedFormValue[key] = value;  // Assign the value to parsedFormValue
            }
        });

    updateUrlParams(parsedFormValue);
    setOpen(false);
};