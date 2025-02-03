import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CallTypes } from "@/constants/call-types";
import { ICallFilters, TCallType } from "@/lib/interfaces/call-interface";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { SelectLabel } from "@radix-ui/react-select";
import { useState } from "react";

interface CallListFiltersProps {
    onChange: (filters: ICallFilters) => void;
}

export const CallListFilters = ({ onChange }: CallListFiltersProps) => {
    const [selectedCallType, setSelectedCallType] = useState("ALL")

    const handleSelectCallType = (value: string) => {
        setSelectedCallType(value)
    }

    return (
        <div>
            <ToggleGroup
                type="single"
                defaultValue={selectedCallType}
                value={selectedCallType}
                onValueChange={handleSelectCallType}
            >
                <ToggleGroupItem value="ALL" aria-label="Toggle all">
                    All
                </ToggleGroupItem>
                {Object.keys(CallTypes).map((key) => (
                    <ToggleGroupItem value={key} aria-label={"Toggle " + key} key={key}>
                        {capitalizeFirstLetter(CallTypes[key as TCallType])}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            {/* <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select call type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Call types</SelectLabel>
                        {Object.keys(CallTypes).map((key) => (
                            <SelectItem key={key} value={key}>
                                {capitalizeFirstLetter(CallTypes[key as TCallType])}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select> */}
        </div>
    )
}
