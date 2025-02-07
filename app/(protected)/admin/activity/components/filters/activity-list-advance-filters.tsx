import {  ListFilter} from "lucide-react"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IActivity, IActivityFilters } from "@/lib/interfaces/activity-interface"
import { DateTimePicker } from "@/components/common/date-time-picker"
import { SingleToggleGroupFilter } from "@/components/filters/single-toggle-group-filter"
import { ActivityAdvanceFilterSchema } from "@/lib/schema/activity-advance-filter-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormStateError } from "@/components/common/form-state-error"
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params"
import { useState } from "react"

interface AdvanceFiltersProps {
    retrievedActivityFilters?: IActivityFilters
    resetActivityFilters: () => void
}

export const ActivityListAdvanceFilters = ({
    retrievedActivityFilters,
    resetActivityFilters,
}: AdvanceFiltersProps) => {
        const [open, setOpen] = useState(false);
        const { updateUrlParams } = useUpdateUrlParams()
        const { register, watch, setValue, getValues, formState, handleSubmit, reset } = useForm<z.infer<typeof ActivityAdvanceFilterSchema>>({
          resolver: zodResolver(ActivityAdvanceFilterSchema),
          defaultValues: {
            startDate: retrievedActivityFilters?.startDate,
            endDate: retrievedActivityFilters?.endDate,
          },
        });
        
        const formError = formState.errors;

        const startDate = watch("startDate");
        const handleStartDateChange = (date: Date | undefined) => {
            setValue("startDate", date);
        };

        const endDate = watch("endDate");
        const handleEndDateChange = (date: Date | undefined) => {
            setValue("endDate", date);
        };

        const handleSubmitFilter = (formValues: z.infer<typeof ActivityAdvanceFilterSchema>) => {
            let parsedValues: Record<string, string | number | boolean> = {};
            
            
            Object.entries(formValues).forEach(([key, value]) => {
                if (!value) return;
                
                if (value instanceof Date) {
                    parsedValues[key] = value.toISOString(); // Convert Date to UTC string
                    return;
                }
                parsedValues[key] = value;
            });

            updateUrlParams(parsedValues);
            setOpen(false);
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
                <form className="grid gap-5 py-4" id="activity-filter-form" onSubmit={handleSubmit(handleSubmitFilter)}>
                    {/* Date range */}
                    <div className="w-full">
                        <Label htmlFor="activity-date-range" className="font-semibold text-[1rem] ">Date & Time</Label>
                        <div id="activity-date-range" className="flex gap-4 flex-col sm:flex-row w-full">
                            <div className="w-full">
                                <Label className="text-right">
                                    Start
                                </Label>
                                <DateTimePicker hourCycle={12} value={startDate} onChange={(date: Date | undefined) => handleStartDateChange(date)} />
                                <FormStateError error={formError.startDate?.message} />
                            </div>
                            <div className="w-full">
                                <Label className="text-right">
                                    End
                                </Label>
                                <DateTimePicker hourCycle={12} value={endDate} onChange={(date: Date | undefined) => handleEndDateChange(date)} />
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