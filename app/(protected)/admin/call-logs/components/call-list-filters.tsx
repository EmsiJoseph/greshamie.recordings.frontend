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
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";

export const CallListFilters = () => {
    const { updateUrlParams, deleteUrlParam } = useUpdateUrlParams()
    const { callTypes: selectedCallTypes } = useRetrieveCallFilters();
    
    // Function to handle updates from CallListFilters
    const handleFilterChange = (updatedFilters?: ICallFilters) => {
        updateUrlParams(updatedFilters);
    };
    // Handle reset call types 
    const handleResetCallTypes = () => {
        deleteUrlParam("callTypes");
    }
    const isResetButtonActive = selectedCallTypes.length < 1;


    // 01 Search
    const [search, setSearch] = useState<ICallFilters['search']>("");
    const debouncedSearch = useDebounce(search); // always refer to debounced value

    // Handle changes in SINGLE call type selection.
    const handleSelectCallType = (value: TCallType[]) => {
        handleFilterChange({ callTypes: value });
    };

    // For search, update url params
    useEffect(() => {
        handleFilterChange({ search: debouncedSearch })
    }, [debouncedSearch, handleFilterChange]);

    // 02 Advance Filters
    const { register, handleSubmit, watch } = useForm();

    return (
        <div className="flex gap-4">
            <ToggleGroupFilter
                value={selectedCallTypes}
                onValueChange={handleSelectCallType}
                onResetSelection={handleResetCallTypes}
                options={CallTypes}
                isResetButtonActive={isResetButtonActive}
            />
            <AdvanceFilters register={register} />
            <div className="relative w-full">
                <Input className="pr-9" placeholder="Search phone number, participants, or date range..." onChangeCapture={(e) => setSearch(e.currentTarget.value)} />
                <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    )
}
