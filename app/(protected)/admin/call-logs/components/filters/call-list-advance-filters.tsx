import { CalendarIcon, ListFilter } from "lucide-react"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroupFilter } from "@/components/filters/toggle-group-filter"
import { CallTypes } from "@/constants/call-types"
import { ICallFilters } from "@/lib/interfaces/call-interface"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { DatePicker } from "@/components/common/date-picker"

interface AdvanceFiltersProps {
    title?: string
    description?: string,
    retrievedCallFilters?: ICallFilters
}

export const CallListAdvanceFilters = ({
    title = "Advance Filters",
    description = "Filter your list by more specific criteria",
    retrievedCallFilters
}: AdvanceFiltersProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><ListFilter /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    {/* Call Type Toggle Group */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="call-type-adv-filter" className="text-right">
                            Call type
                        </Label>
                        <ToggleGroupFilter
                            props={{ id: "call-type-adv-filter" }}
                            options={CallTypes}
                            defaultValue={retrievedCallFilters?.callTypes}
                        />
                    </div>
                    {/* Date Range */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <DatePicker date={retrievedCallFilters?.startDate} setDate={() => { }} />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
