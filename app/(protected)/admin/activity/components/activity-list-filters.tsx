import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ActivityTypes } from "@/constants/activity-types";
import { IActivityFilters, TActivityType } from "@/lib/interfaces/activity-interface";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { Search, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";

interface ActivityListFiltersProps {
  onChange: (filters: IActivityFilters) => void;
}

export const ActivityListFilters = ({ onChange }: ActivityListFiltersProps) => {

  const [search, setSearch] = useState<IActivityFilters['search']>("");
  const debouncedSearch = useDebounce(search);

  const handleSelectActivityType = (value: string) => {
    if (value === "ALL") {
        onChange({ action: "" });
    }
    if (value !== "ALL" && value !== "") {
        const action = value as TActivityType; // Safely cast to TCallType
        onChange({ action });
    }
  }

  useEffect(() => {
      onChange({search: debouncedSearch})
  }, [debouncedSearch]);

  return (
    <div className="flex gap-4">
        <ToggleGroup
            type="single"
            defaultValue={"ALL"}
            onValueChange={handleSelectActivityType}
        >
            <ToggleGroupItem value="ALL" aria-label="Toggle all">
                All
            </ToggleGroupItem>
            {Object.keys(ActivityTypes).map((key) => (
                <ToggleGroupItem value={key} aria-label={"Toggle " + key} key={key}>
                    {key === ""
                        ? "No call type"
                        : capitalizeFirstLetter(ActivityTypes[key as Exclude<TActivityType, "">])}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>

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
