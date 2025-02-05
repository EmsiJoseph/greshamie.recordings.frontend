import { ToggleGroupFilter } from "@/components/filters/toggle-group-filter";
import { Input } from "@/components/ui/input";
import { CallTypes } from "@/constants/call-types";
import { useDebounce } from "@/hooks/use-debounce";
import { ICallFilters, TCallType } from "@/lib/interfaces/call-interface";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRetrieveCallFilters } from "../../lib/use-retrieve-call-filters";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { CallListAdvanceFilters } from "./call-list-advance-filters";

interface CallListFiltersProps {
    retrievedFilters: ICallFilters
}

export const CallListFilters = ({ retrievedFilters }: CallListFiltersProps) => {
    const { updateUrlParams, deleteUrlParam } = useUpdateUrlParams()
    // 01 Call Types
    // ---> Handle reset call types 
    const handleResetCallTypes = () => {
        deleteUrlParam("callTypes");
    }

    // ---> Handle changes in call type selection.
    const handleSelectCallType = (value: TCallType[]) => {
        updateUrlParams({ callTypes: value });
    };

    const isResetButtonActive = retrievedFilters?.callTypes ? retrievedFilters?.callTypes?.length < 1 : false;

    // 02 Search
    const [search, setSearch] = useState<ICallFilters['search']>("");
    // ---> Delay search update
    const debouncedSearch = useDebounce(search); // always refer to debounced value

    useEffect(() => {
        updateUrlParams({ search: debouncedSearch })
    }, [debouncedSearch, updateUrlParams]);

    // 02 Advance Filters

    return (
        <div className="flex gap-4">
            <ToggleGroupFilter
                value={retrievedFilters?.callTypes}
                onValueChange={handleSelectCallType}
                onResetSelection={handleResetCallTypes}
                options={CallTypes}
                isResetButtonActive={isResetButtonActive}
            />
            <CallListAdvanceFilters retrievedCallFilters={retrievedFilters} />
            <div className="relative w-full">
                <Input className="pr-9" placeholder="Search phone number, participants, or date range..." onChangeCapture={(e) => setSearch(e.currentTarget.value)} />
                <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    )
}
