import { date, z } from "zod";

export const ActivityAdvanceFilterSchema = z
    .object({
        startDate: date()
            .refine((date) => date <= new Date(), {
                message: "Start date should not be in the future.",
            })
            .optional(),
        endDate: date()
            .refine((date) => date <= new Date(), {
                message: "End date should not be in the future.",
            })
            .optional(),
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.startDate <= data.endDate;
            }
            return true;
        },
        {
            message: "Start date should not be greater than end date.",
            path: ["startDate"], // This sets the error on the startDate field
        }
    );
