import { CircleCheckBig, CircleSlash2, ClipboardCheck, ClipboardX, ListFilter, Video, VideoOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ICallAdvanceFilterComponent, ICallFilters } from "@/lib/interfaces/call-interface"
import { DateTimePicker } from "@/components/common/date-time-picker"
import { SingleToggleGroupFilter } from "@/components/filters/single-toggle-group-filter"
import { CallAdvanceFilterSchema } from "@/lib/schema/call-advance-filter-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormStateError } from "@/components/common/form-state-error"
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params"
import { useState, useEffect } from "react"
import { DualRangeSliderCustomLabel } from "@/components/ui/slider"

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
    const { watch, setValue, formState, handleSubmit, reset } = useForm<z.infer<typeof CallAdvanceFilterSchema>>({
        resolver: zodResolver(CallAdvanceFilterSchema),
        defaultValues: {
            startDate: retrievedCallFilters?.startDate,
            endDate: retrievedCallFilters?.endDate,
            minimumDurationSeconds: retrievedCallFilters?.minimumDurationSeconds,
            maximumDurationSeconds: retrievedCallFilters?.maximumDurationSeconds,
            hasPciCompliance: retrievedCallFilters?.hasPciCompliance,
            hasQualityEvaluation: retrievedCallFilters?.hasQualityEvaluation,
            hasVideoRecording: retrievedCallFilters?.hasVideoRecording,
        },
    })

    const [resetSlider, setResetSlider] = useState(false);

    const formError = formState.errors;

    const startDate = watch("startDate")
    const handleStartDateChange = (date: Date | undefined) => {
        setValue("startDate", date);
    };

    const endDate = watch("endDate")
    const handleEndDateChange = (date: Date | undefined) => {
        setValue("endDate", date);
    };

    // Range Slider
    const handleDurationChange = (values: number[]) => {
        setValue("minimumDurationSeconds", values[0]); // Explicitly set 0
        setValue("maximumDurationSeconds", values[1]); // Ensure max has a fallback
    };

    const handleResetSlider = () => {
        localStorage.removeItem('dualRangeSliderValues');
        handleDurationChange([0, 3600]);
        setResetSlider(true);
    };

    useEffect(() => {
        if (resetSlider) {
            setResetSlider(false);
        }
    }, [resetSlider]);
    
    // Booleans
    const hasVideoRecording = watch("hasVideoRecording")
    const hasPciCompliance = watch("hasPciCompliance")
    const hasQualityEvaluation = watch("hasQualityEvaluation")

    const handleBoolChange = (value?: string, rhfKey?: keyof ICallAdvanceFilterComponent) => {
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
        const parsedValues: Record<string, string | number | boolean> = {};
        console.log(parsedValues)
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
                    <DialogTitle>Advanced Filters</DialogTitle>
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
                        <Label htmlFor="call-duration-range" className="font-semibold text-[1rem] ">Duration (Minutes)</Label>
                        <div className="h-4"></div>
                        {/* New Range Input */}
                        <div className="flex gap-4 w-full" id="call-duration-range">

                            {/* // <div className="w-full">
                            //     <Label className="text-right">
                            //         Minimum
                            //     </Label>
                            //     <Input
                            //         type="number"
                            //         placeholder="0"
                            //         {...register("minimumDurationSeconds")}
                            //     />
                            //     <FormStateError error={formError.minimumDurationSeconds?.message} />
                            // </div>
                            // <div className="w-full">
                            //     <Label className="text-right">
                            //         Maximum
                            //     </Label>
                            //     <Input
                            //         type="number"
                            //         placeholder="0"
                            //         {...register("maximumDurationSeconds")}

                            //     />
                            //     <FormStateError error={formError.maximumDurationSeconds?.message} />
                            // </div> */}
                            <DualRangeSliderCustomLabel 
                                onDurationChange={handleDurationChange}
                                reset={resetSlider}
                            />
                            <FormStateError error={formError.minimumDurationSeconds?.message} />
                            <FormStateError error={formError.maximumDurationSeconds?.message} />
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
                    <Button variant="destructive" onClick={() => { resetCallFilters(); reset(); handleResetSlider() }}>Reset</Button>
                    <Button type="submit" form="call-filter-form">Apply filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
