import { ToggleGroupFilter } from "@/components/filters/toggle-group-filter";
import { Input } from "@/components/ui/input";
import { CallTypes } from "@/constants/call-types";
import { useDebounce } from "@/hooks/use-debounce";
import { ICallFilters, TCallType } from "@/lib/interfaces/call-interface";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRetrieveCallFilters } from "../lib/useRetrieveCallFilters";
import { AdvanceFilters } from "@/components/filters/advance-filters";
import { useForm } from "react-hook-form";

interface CallListFiltersProps {
    onChange: (filters?: ICallFilters) => void;
}

const all = CallTypes.ALL

export const CallListFilters = ({ onChange }: CallListFiltersProps) => {
    // 01 Search and Call Type Selection
    const [search, setSearch] = useState<ICallFilters['search']>("");
    const debouncedSearch = useDebounce(search); // always refer to debounced value
    
    const { callType: initialCallType } = useRetrieveCallFilters();
    const defaultToggleGroupValue = initialCallType ?? all;
    const handleSelectCallType = (value: string) => {
        if (value === all) {
            // Delete the URL Param
            onChange({ callType: "" });
        }
        if (value !== all) {
            const callType = value as TCallType; // Safely cast to TCallType
            onChange({ callType });
        }
    }

    // For search, update url params
    useEffect(() => {
        onChange({ search: debouncedSearch })
    }, [debouncedSearch]);

    // 02 Advance Filters
    const { register, handleSubmit, watch} = useForm();

    return (
        <div className="flex gap-4">
            <ToggleGroupFilter
                defaultValue={defaultToggleGroupValue}
                onValueChange={handleSelectCallType}
                options={CallTypes}
            />
            <AdvanceFilters register={register}/>
            <div className="relative w-full">
                <Input className="pr-9" placeholder="Search phone number, participants, or date range..." onChangeCapture={(e) => setSearch(e.currentTarget.value)} />
                <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    )
}
