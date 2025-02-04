import { Input } from "@/components/ui/input";
import { ToggleGroupFilter } from "@/components/filters/toggle-group-filter";
import { ActivityTypes } from "@/constants/activity-types";
import { IActivityFilters, TActivityType } from "@/lib/interfaces/activity-interface";
import { Search, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useRetrieveActivityFilters } from "../lib/useRetrieveActivityFilters";

interface ActivityListFiltersProps {
  onChange: (filters: IActivityFilters) => void;
}

const all = ActivityTypes.ALL;

export const ActivityListFilters = ({ onChange }: ActivityListFiltersProps) => {

  
  const [search, setSearch] = useState<IActivityFilters['search']>("");
  const debouncedSearch = useDebounce(search);

  const { action: initialActionType } = useRetrieveActivityFilters();
  const defaultToggleGroupValue = initialActionType ?? all;

  const handleSelectActivityType = (value: string) => {
    if (value === "ALL") {
        onChange({ action: "" });
    }
    if (value !== "ALL" && value !== "") {
        const action = value as TActivityType; 
        onChange({ action });
    }
  }

  useEffect(() => {
      onChange({search: debouncedSearch})
  }, [debouncedSearch]);

  return (
    <div className="flex gap-4">
        <ToggleGroupFilter
            defaultValue={defaultToggleGroupValue}
            onValueChange={handleSelectActivityType}
            options={ActivityTypes}
        />
        <div className="relative w-full">
            <Input className="pr-9" placeholder="Search phone number, participants, or date range..." onChangeCapture={(e) => setSearch(e.currentTarget.value)} />
            <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Button className="bg-lime-50 text-lime-700 border-lime-700 border-2 font-semibold">
          <Save className="h-5 w-5 mr-2  text-lime-700" />
          Export
        </Button>
    </div>
  );
};
