import { start } from "node:repl";
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
        // Time format should be HH:mm (24-hour time format)
        startTime: z
            .string()
            .regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, {
                message: 'Start time should be in HH:mm (24-hour) format.',
            })
            .optional(),
        endTime: z
            .string()
            .regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, {
                message: 'End time should be in HH:mm (24-hour) format.',
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
    // --> 01 Has time but no Dates
    .refine(
        (data) => {
            if (!data.startDate && data.startTime) {
                return false;
            }
            return true;
        },
        {
            message: "Start date is required when start time is not empty.",
            path: ["startDate"],  // Error will be set on the startDate field
        }
    )
    .refine(
        (data) => {
            if (!data.endDate && data.endTime) {
                return false;
            }
            return true;
        },
        {
            message: "End date is required when end time is not empty.",
            path: ["endDate"],
        }
    )
    // ---> 03 Check Date time range [conditionally add the time if present]
    .refine(
        (data) => {
            const startDate = data.startDate;
            const endDate = data.endDate
            const startTime = data.startTime
            const endTime = data.endTime

            if (startDate) {
                if (startTime) {
                    const [startHours, startMinutes] = startTime.split(":").map(Number);  // Convert to numbers from string regex
                    startDate.setHours(startHours, startMinutes, 0, 0) // Set hours, minutes, seconds, milliseconds
                }
            }

            if (endDate) {
                if (endTime) {
                    const [endHours, endMinutes] = endTime.split(":").map(Number);
                    endDate.setHours(endHours, endMinutes, 0, 0)
                }
            }

            if (startDate && endDate) {
                return startDate <= endDate;
            }
            return true;
        },
        {
            message: "Start date-time should not be greater than end date-time.",
            path: ["startDate"],
        }
    )
    // --> Check duration range
    .refine(
        (data) => {
            if (data.minimumDurationSeconds !== undefined && data.maximumDurationSeconds !== undefined) {
                return data.minimumDurationSeconds <= data.maximumDurationSeconds;
            }
            return true;
        },
        {
            message: "Min. duration should not be greater than max. duration.",
            path: ["minimumDurationSeconds"], // This sets the error on the minDuration field
        }
    );
