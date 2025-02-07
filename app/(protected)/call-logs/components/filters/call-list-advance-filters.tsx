import { CircleCheckBig, CircleSlash2, ClipboardCheck, ClipboardX, ListFilter, Video, VideoOff } from "lucide-react"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ICall, ICallFilters } from "@/lib/interfaces/call-interface"
import { DateTimePicker } from "@/components/common/date-time-picker"
import { SingleToggleGroupFilter } from "@/components/filters/single-toggle-group-filter"
import { CallAdvanceFilterSchema } from "@/lib/schema/call-advance-filter-schema"
import { date, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormStateError } from "@/components/common/form-state-error"
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

interface AdvanceFiltersProps {
    retrievedCallFilters?: ICallFilters,
    resetCallFilters: () => void
}

const hasVideoOptions = {
    true: { label: <div className="flex gap-2 items-center"><Video /> <p>With Video</p></div>, value: "true" },
    false: { label: <div className="flex gap-2 items-center"><VideoOff /> <p>No Video</p></div>, value: "false" },
}
const hasPciOptions = {
    true: { label: <div className="flex gap-2 items-center"><ClipboardCheck /> <p>Compliant</p></div>, value: "true" },
    false: { label: <div className="flex gap-2 items-center"><ClipboardX /> <p>Non-compliant</p></div>, value: "false" },
}
const hasQualityOptions = {
    true: { label: <div className="flex gap-2 items-center"><CircleCheckBig /> <p>Quality Evaluated</p></div>, value: "true" },
    false: { label: <div className="flex gap-2 items-center"><CircleSlash2 /> <p>Not Evaluated</p></div>, value: "false" },
}
const toggleItemClass = "border data-[state=on]:bg-[#f8ffe8] data-[state=on]:border-[#65a30d] w-full flex-row"


export const CallListAdvanceFilters = ({
    retrievedCallFilters,
    resetCallFilters
}: AdvanceFiltersProps) => {
    const [open, setOpen] = useState(false);
    const { updateUrlParams } = useUpdateUrlParams()
    const { register, watch, setValue, getValues, formState, handleSubmit, reset } = useForm<z.infer<typeof CallAdvanceFilterSchema>>({
        resolver: zodResolver(CallAdvanceFilterSchema),
        defaultValues: {
            startDate: retrievedCallFilters?.startDate,
            endDate: retrievedCallFilters?.endDate,
            minDuration: retrievedCallFilters?.minDuration,
            maxDuration: retrievedCallFilters?.maxDuration,
            hasPciCompliance: retrievedCallFilters?.hasPciCompliance,
            hasQualityEvaluation: retrievedCallFilters?.hasQualityEvaluation,
            hasVideoRecording: retrievedCallFilters?.hasVideoRecording,
        },
    })

    const formError = formState.errors;

    const startDate = watch("startDate")
    const handleStartDateChange = (date: Date | undefined) => {
        setValue("startDate", date);
    };

    const endDate = watch("endDate")
    const handleEndDateChange = (date: Date | undefined) => {
        setValue("endDate", date);
    };

    // Booleans
    const hasVideoRecording = watch("hasVideoRecording")
    const hasPciCompliance = watch("hasPciCompliance")
    const hasQualityEvaluation = watch("hasQualityEvaluation")

    const handleBoolChange = (value?: string, rhfKey?: Exclude<keyof ICallFilters, "search" | "page" | "caller" | "receiver" | "callTypes" | "recorder">) => {
        if (!rhfKey) {
            return
        }
        if (value === "true") {
            setValue(rhfKey, true);
            return
        }
        if (value === "false") {
            setValue(rhfKey, false);
            return
        }

        setValue(rhfKey, undefined);
    }

    const handleSubmitFilter = (formValues: z.infer<typeof CallAdvanceFilterSchema>) => {
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
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}><ListFilter /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Advance Filters</DialogTitle>
                </DialogHeader>
                <form className="grid gap-5 py-4" id="call-filter-form" onSubmit={handleSubmit(handleSubmitFilter)}>
                    {/* Date Range */}
                    <div className="w-full">
                        <Label htmlFor="call-date-range" className="font-semibold text-[1rem] ">Date & Time</Label>
                        <div id="call-date-range" className="flex gap-4 flex-col sm:flex-row w-full">
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
                    {/* Duration Range */}
                    <div className="w-full">
                        <Label htmlFor="call-duration-range" className="font-semibold text-[1rem]">Duration (minutes)</Label>
                        <div className="flex gap-4 w-full" id="call-duration-range">
                            <div className="w-full">
                                <Label className="text-right">
                                    Minimum
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...register("minDuration")}
                                />
                                <FormStateError error={formError.minDuration?.message} />
                            </div>
                            <div className="w-full">
                                <Label className="text-right">
                                    Maximum
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...register("maxDuration")}

                                />
                                <FormStateError error={formError.maxDuration?.message} />
                            </div>
                        </div>
                    </div>


                    {/* Boolean Filters */}
                    <div className="w-full" >
                        <Label htmlFor="call-has-video" className="font-semibold text-[1rem]">
                            Boolean Filters
                        </Label>
                        {/* --> 01 Has Video Recording */}
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full">
                                <Label className="text-right">
                                    Video Recording
                                </Label>
                                <SingleToggleGroupFilter
                                    onValueChange={
                                        (value: string) => handleBoolChange(value, "hasVideoRecording")
                                    }
                                    options={hasVideoOptions}
                                    value={hasVideoRecording?.toString() || ""}
                                    toggleItemClass={toggleItemClass}
                                />
                                <FormStateError error={formError.hasVideoRecording?.message} />
                            </div>

                            {/* --> 02 Has PCI Compliance */}
                            <div className="w-full">
                                <Label className="text-right">
                                    PCI Compliance
                                </Label>
                                <SingleToggleGroupFilter
                                    onValueChange={
                                        (value: string) => handleBoolChange(value, "hasPciCompliance")
                                    }
                                    options={hasPciOptions}
                                    value={hasPciCompliance?.toString() || ""}
                                    toggleItemClass={toggleItemClass}
                                />
                                <FormStateError error={formError.hasPciCompliance?.message} />
                            </div>

                            {/* --> 03 Has Quality Evaluation */}
                            <div className="w-full">
                                <Label className="text-right">
                                    Quality Evaluation
                                </Label>
                                <SingleToggleGroupFilter
                                    onValueChange={
                                        (value: string) => handleBoolChange(value, "hasQualityEvaluation")
                                    }
                                    options={hasQualityOptions}
                                    value={hasQualityEvaluation?.toString() || ""}
                                    toggleItemClass={toggleItemClass}
                                />
                                <FormStateError error={formError.hasQualityEvaluation?.message} />
                            </div>
                        </div>
                    </div>
                </form>
                <DialogFooter className="gap-2">
                    <Button variant="destructive" onClick={() => { resetCallFilters(); reset() }}>Reset</Button>
                    <Button type="submit" form="call-filter-form">Apply filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
