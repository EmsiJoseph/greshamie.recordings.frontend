import { Input } from "@/components/ui/input";
import { ToggleGroupFilter } from "@/components/filters/multi-toggle-group-filter";
import { ActivityTypes } from "@/constants/activity-types";
import { IActivityFilters, TActivityType } from "@/lib/interfaces/activity-interface";
import { Search, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useRetrieveActivityFilters } from "../lib/useRetrieveActivityFilters";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { useForm } from "react-hook-form";
import { AdvanceFilters } from "@/components/filters/advance-filters";

export const ActivityListFilters = () => {

  const { updateUrlParams, deleteUrlParam } = useUpdateUrlParams()
  const { action: selectedActionTypes } = useRetrieveActivityFilters();

   // Function to handle updates from ActivityListFilters
  const handleFilterChange = (updatedFilters?: IActivityFilters) => {
    updateUrlParams(updatedFilters);
  };

  // Handle reset call types
  const handleResetActionTypes = () => {
    deleteUrlParam("action");
  }
  const isResetButtonActive = selectedActionTypes.length < 1;

  // 1. Search
  const [search, setSearch] = useState<IActivityFilters['search']>("");
  const debouncedSearch = useDebounce(search);

  // Handle changes in SINGLE call type selection.
  const handleSelectActivityType = (value: TActivityType[]) => {
    handleFilterChange({ action: value });
  };

   // For search, update url params
  useEffect(() => {
    handleFilterChange({ search: debouncedSearch });
  }, [debouncedSearch, handleFilterChange]);

  // 02 Advance Filters
  const { register, handleSubmit, watch } = useForm();

  // Show the count of activities for each action type
  // const getActivityCount = (action: string) => {
  //   if (action === all) {
  //       return sampleActivities.length;
  //   }
  //   return sampleActivities.filter(activity => activity.action === action).length;
  // };

  // const activityOptions = Object.fromEntries(
  //   Object.entries(ActivityTypes).map(([key, value]) => [
  //     key,
  //     `${value} ${getActivityCount(value)}`,
  //   ])
  // ) as Record<TActivityType, string>;

  return (
    <div className="flex gap-4">
        <ToggleGroupFilter
            value={selectedActionTypes}
            onValueChange={handleSelectActivityType}
            onResetSelection={handleResetActionTypes}
            options={ActivityTypes}
            isResetButtonActive={isResetButtonActive}
        />
        <AdvanceFilters register={register} />
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
