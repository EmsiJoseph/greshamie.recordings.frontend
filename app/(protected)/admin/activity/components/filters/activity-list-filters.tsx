import { Input } from "@/components/ui/input";
import { MultiToggleGroupFilter } from "@/components/filters/multi-toggle-group-filter";
import { ActivityTypes } from "@/constants/activity-types";
import { IActivityFilters, TActivityType } from "@/lib/interfaces/activity-interface";
import { Search, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useRetrieveActivityFilters } from "../../lib/use-retrieve-activity-filters";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { useForm } from "react-hook-form";
import { ActivityListAdvanceFilters } from "./activity-list-advance-filters";


interface ActivityListFiltersProps {
  retrievedFilters: IActivityFilters
}

export const ActivityListFilters = ({ retrievedFilters }: ActivityListFiltersProps) => {
  const { updateUrlParams, deleteUrlParam } = useUpdateUrlParams()
  // 01 Activity Types

  // Handle reset call types
  const handleResetActionTypes = () => {
    deleteUrlParam("action");
  };

  // Handle changes in SINGLE call type selection.
  const handleSelectActivityType = (value: TActivityType[]) => {
    updateUrlParams({ action: value });
  };


  const isResetButtonActive = retrievedFilters?.action ? retrievedFilters?.action?.length < 1 : false;

  // 2. Search
  const [search, setSearch] = useState<IActivityFilters['search']>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    updateUrlParams({ search: debouncedSearch })
}, [debouncedSearch, updateUrlParams]);

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
        <MultiToggleGroupFilter
            value={retrievedFilters?.action}
            onValueChange={handleSelectActivityType}
            onResetSelection={handleResetActionTypes}
            options={ActivityTypes}
            isResetButtonActive={isResetButtonActive}
        />
        <ActivityListAdvanceFilters retrievedActivityFilters={retrievedFilters} />
        <div className="relative w-full">
          <Input className="pr-9" placeholder="Search phone number, participants, or date range..." onChangeCapture={(e) => setSearch(e.currentTarget.value)} />
          <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
        </div>
    </div>
  );
};
