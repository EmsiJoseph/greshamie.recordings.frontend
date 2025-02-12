import { date, z } from "zod";

export const CallAdvanceFilterSchema = z
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
        minimumDurationSeconds: z.preprocess(
            (val) => {
                const num = Number(val);
                return val === "" || val === null || isNaN(num) ? undefined : num;
            },
            z.number().min(0, "Min. duration must be at least 0").optional()
        ),
        maximumDurationSeconds: z.preprocess(
            (val) => {
                const num = Number(val);
                return val === "" || val === null || isNaN(num) ? undefined : num;
            },
            z.number().min(1, "Max. duration must be at least 1").optional()
        ),
        hasVideoRecording: z.boolean().optional(),
        hasPciCompliance: z.boolean().optional(),
        hasQualityEvaluation: z.boolean().optional(),
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
    )
    .refine(
        (data) => {
            if (data.minimumDurationSeconds !== undefined && data.maximumDurationSeconds !== undefined) {
                return data.minimumDurationSeconds <= data.maximumDurationSeconds;
            }
            return true;
        },
        {
            message: "Min. duration should not be greater than max. duration.",
            path: ["minDuration"], // This sets the error on the minDuration field
        }
    );
