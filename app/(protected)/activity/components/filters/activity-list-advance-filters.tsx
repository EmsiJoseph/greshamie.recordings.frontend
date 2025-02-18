import {  ListFilter} from "lucide-react"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IActivityAdvanceFilterComponent, IActivityFilters } from "@/lib/interfaces/activity-interface"
import { ActivityAdvanceFilterSchema } from "@/lib/schema/activity-advance-filter-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormStateError } from "@/components/common/form-state-error"
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params"
import { useState } from "react"
import { parseAdvanceFilterDefaults } from "../../lib/parse-advance-filter-default"
import { handleSubmitFilter } from "@/app/(protected)/call-logs/components/filters/advance-filter/handle-submit-filter"

interface AdvanceFiltersProps {
    retrievedActivityFilters?: IActivityFilters
    resetActivityFilters: () => void
}

const customInputClass = "w-full outline-solid border-solid border-[1.5px] rounded-md h-10 p-4";

export const ActivityListAdvanceFilters = ({
    retrievedActivityFilters,
    resetActivityFilters,
}: AdvanceFiltersProps) => {
        const [open, setOpen] = useState(false);
        const { updateUrlParams } = useUpdateUrlParams()
        const defaultValues = parseAdvanceFilterDefaults(retrievedActivityFilters);
        const { watch, setValue, formState, handleSubmit, reset } = useForm<z.infer<typeof ActivityAdvanceFilterSchema>>({
            resolver: zodResolver(ActivityAdvanceFilterSchema),
            defaultValues,
        })
        
        const formError = formState.errors;

        const startDate = watch("startDate")
        const startTime = watch("startTime")
        const endDate = watch("endDate")
        const endTime = watch("endTime")

        const handleDateChange = (
                event: React.ChangeEvent<HTMLInputElement>,
                rhfKey: keyof IActivityAdvanceFilterComponent,
        ) => {
            const date = event.target.value;
    
            // If has date change, extract the Date ONLY
            if (date) {
                setValue(rhfKey, date);
            } else {
                // Handle empty value (e.g., set to null or default Date)
                setValue(rhfKey, ""); // or you could use an empty string or undefined
            }
        };

        const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>, rhfKey: keyof IActivityAdvanceFilterComponent, currDateStr?: string) => {
            const time = event.target.value;
            if (time) {
                setValue(rhfKey, time);
            } else {
                setValue(rhfKey, "");
            }
    
        };

        const onFormSubmit = (formValues: z.infer<typeof ActivityAdvanceFilterSchema>) => {
            handleSubmitFilter(formValues, updateUrlParams, setOpen)
        }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)} ><ListFilter /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Advance Filters</DialogTitle>
                </DialogHeader>
                <form className="grid gap-5 py-4" id="activity-filter-form" onSubmit={handleSubmit(onFormSubmit)}>
                   {/* Date Range */}
                    <div className="w-full">
                        <Label htmlFor="activity-date-range" className="font-semibold text-[1rem] ">Date & Time</Label>
                        <div id="call-date-range" className="flex gap-4 flex-col w-full">
                            <div className="w-full">
                                {/* Start Date and Time */}
                                <Label className="text-right">
                                    Start
                                </Label>
                                <div className="flex gap-4">
                                    <input
                                        type="date"
                                        value={startDate || ""}
                                        className={customInputClass}
                                        onChange={(e) => handleDateChange(e, "startDate")}
                                    />
                                    <input
                                        type="time"
                                        value={startTime || ""}
                                        onChange={(e) => handleTimeChange(e, "startTime")}
                                        className={customInputClass}
                                    />

                                </div>
                                {/* <DateTimePicker hourCycle={12} value={startDate} onChange={(date: Date | undefined) => handleStartDateChange(date)} /> */}
                                <FormStateError error={formError.startDate?.message} />
                            </div>
                            <div className="w-full">
                                {/* End Date and Time */}
                                <Label className="text-right">
                                    End
                                </Label>
                                <div className="flex gap-4">
                                    <input
                                        type="date"
                                        value={endDate || ""}
                                        className={customInputClass}
                                        onChange={(e) => handleDateChange(e, "endDate")}
                                    />
                                    <input
                                        type="time"
                                        value={endTime || ""}
                                        onChange={(e) => handleTimeChange(e, "endTime")}
                                        className={customInputClass}
                                    />
                                </div>
                                {/* <DateTimePicker hourCycle={12} value={endDate} onChange={(date: Date | undefined) => handleEndDateChange(date)} /> */}
                                <FormStateError error={formError.endDate?.message} />
                            </div>
                        </div>
                    </div>
                </form>
                <DialogFooter className="gap-2">
                    <Button variant="destructive" onClick={() => { resetActivityFilters(); reset() }}>Reset</Button>
                    <Button type="submit" form="activity-filter-form">Apply filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}