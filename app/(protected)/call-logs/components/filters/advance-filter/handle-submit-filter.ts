import { CallAdvanceFilterSchema } from "@/lib/schema/call-advance-filter-schema";
import { z } from "zod";

export const handleSubmitFilter = (
    formValues: z.infer<typeof CallAdvanceFilterSchema>,
    updateUrlParams: (param: Record<string, any>) => void,
    setOpen: (param: boolean) => void
) => {
    // Combine the dates and times into 1 entity
    formValues.startDate = formValues.startDate
        ? `${formValues.startDate}T${formValues.startTime || "00:00:00.000Z"}`
        : undefined;
    formValues.endDate = formValues.endDate
        ? `${formValues.endDate}T${formValues.endTime || "00:00:00.000Z"}`
        : undefined;

    let parsedFormValue: Record<string, any> = {}
    Object.entries(formValues)
        .filter(([key, value]) => {
            // Filter out falsy values (empty strings, null, undefined, etc.)
            return Boolean(value);
        })
        .forEach(([key, value]) => {
            if (key !== "startTime" && key !== "endTime") {
                parsedFormValue[key] = value;  // Assign the value to parsedFormValue
            }
        });

    updateUrlParams(parsedFormValue);
    setOpen(false);
};