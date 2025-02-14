import { CircleCheckBig, CircleSlash2, ClipboardCheck, ClipboardX, ListFilter, Video, VideoOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ICallAdvanceFilterComponent, ICallFilters } from "@/lib/interfaces/call-interface"
import { SingleToggleGroupFilter } from "@/components/filters/single-toggle-group-filter"
import { CallAdvanceFilterSchema } from "@/lib/schema/call-advance-filter-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormStateError } from "@/components/common/form-state-error"
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params"
import { useState, useEffect } from "react"
import { DualRangeSliderCustomLabel } from "@/components/ui/slider"
import { useParseAdvanceFilterDefaults } from "../../../lib/use-parse-advance-filter-defaults"
import { handleSubmitFilter } from "./handle-submit-filter"

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
const customInputClass = "w-full outline-solid border-solid border-[1.5px] rounded-md h-10 p-4";

export const CallListAdvanceFilters = ({
    retrievedCallFilters,
    resetCallFilters
}: AdvanceFiltersProps) => {
  console.log("Retrieveddd", retrievedCallFilters)

    const [open, setOpen] = useState(false);
    const [resetSlider, setResetSlider] = useState(false);

    const { updateUrlParams } = useUpdateUrlParams()
    const { parseFilterDefaults } = useParseAdvanceFilterDefaults()
    const defaultValues = parseFilterDefaults(retrievedCallFilters)
    const { watch, setValue, formState, handleSubmit, reset } = useForm<z.infer<typeof CallAdvanceFilterSchema>>({
        resolver: zodResolver(CallAdvanceFilterSchema),
        defaultValues,
    })
    const formError = formState.errors;

    // ---> Date and Time
    const startDate = watch("startDate")
    const startTime = watch("startTime")
    const endDate = watch("endDate")
    const endTime = watch("endTime")

    console.log("start date", startDate)

    const handleDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        rhfKey: keyof ICallAdvanceFilterComponent,
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
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>, rhfKey: keyof ICallAdvanceFilterComponent) => {
        const time = event.target.value;
        if (time) {
            setValue(rhfKey, time);
        } else {
            setValue(rhfKey, "");
        }
    };


    // ---> Range Slider
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

    const onFormSubmit = (formValues: z.infer<typeof CallAdvanceFilterSchema>) => {
        handleSubmitFilter(formValues, updateUrlParams, setOpen)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}><ListFilter /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[700px] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                </DialogHeader>
                <form className="grid gap-5 py-4" id="call-filter-form" onSubmit={handleSubmit(onFormSubmit)}>
                    {/* Date Range */}
                    <div className="w-full">
                        <Label htmlFor="call-date-range" className="font-semibold text-[1rem] ">Date & Time</Label>
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

                    {/* Duration Range */}
                    <div className="w-full">
                        <Label htmlFor="call-duration-range" className="font-semibold text-[1rem] ">Duration (Minutes)</Label>
                        <div className="h-4"></div>
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
                        {/* New Range Input */}
                        <div className="flex gap-4 w-full" id="call-duration-range">
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
                                        (defaultValue: string) => handleBoolChange(defaultValue, "hasVideoRecording")
                                    }
                                    options={hasVideoOptions}
                                    value={hasVideoRecording?.toString() || ""}
                                    toggleItemClass={toggleItemClass}
                                />
                                <FormStateError error={formError.hasVideoRecording?.message} />
                            </div>
                            {/* --> 02 Has PCI Compliance */}
                            {/* <div className="w-full">
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
                            </div> */}
                            {/* --> 03 Has Quality Evaluation */}
                            {/* <div className="w-full">
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
                            </div> */}
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
