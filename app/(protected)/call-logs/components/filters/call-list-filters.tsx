import { Input } from "@/components/ui/input";
import { CallDirections } from "@/constants/call-types";
import { useDebounce } from "@/hooks/use-debounce";
import { ICallFilters, TCallDirections } from "@/lib/interfaces/call-interface";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUrlParams } from "@/hooks/use-url-params";
import { SingleToggleGroupFilter } from "@/components/filters/single-toggle-group-filter";
import { SingleChoiceDropdown } from "@/components/common/single-choice-dropdown";
import { CallListAdvanceFilters } from "./advance-filter/call-list-advance-filters";
import { CallLogsPeriodFilter } from "./call-logs-period-filter";
import { getDateString } from "@/lib/utils/date-utils";
interface CallListFiltersProps {
  retrievedFilters?: ICallFilters;
}

export const CallListFilters = ({ retrievedFilters }: CallListFiltersProps) => {
  const { updateUrlParams } = useUpdateUrlParams();
  // 01 Call Types
  // ---> Handle changes in call type selection.
  const handleSelectCallType = (value: TCallDirections) => {
    updateUrlParams({ callDirection: value });
  };

  // 02 Search
  const [search, setSearch] = useState<ICallFilters["search"]>("");
  // ---> Delay search update
  const debouncedSearch = useDebounce(search); // always refer to debounced value

  // 3. Period
  const handlePeriodChange = (startDate: Date, endDate: Date) => {
    const formattedStartDate = getDateString(startDate.toDateString(), "ISO") 
    const formattedEndDate = getDateString(endDate.toDateString(), "ISO") 
    updateUrlParams({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  useEffect(() => {
    updateUrlParams({ search: debouncedSearch });
  }, [debouncedSearch, updateUrlParams]);

  return (
    <div className="flex gap-4">
      <SingleToggleGroupFilter
        value={retrievedFilters?.callDirection}
        onValueChange={handleSelectCallType}
        options={CallDirections}
        className="hidden lg:block"
      />

      <SingleChoiceDropdown
        value={retrievedFilters?.callDirection}
        onValueChange={handleSelectCallType}
        options={CallDirections}
        className="block lg:hidden"
      />

      <CallLogsPeriodFilter
        onPeriodChange={handlePeriodChange}
      />

      {retrievedFilters && Object.keys(retrievedFilters).length > 0 &&
        <CallListAdvanceFilters />
      }


      <div className="relative w-full">
        <Input
          className="pr-9"
          placeholder="Search phone number or participants..."
          onChangeCapture={(e) => setSearch(e.currentTarget.value)}
        />
        <Search className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};