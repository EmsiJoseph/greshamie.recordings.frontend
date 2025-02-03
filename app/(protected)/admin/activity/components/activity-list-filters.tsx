import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ActivityTypes } from "@/constants/activity-types";
import { IActivityFilters, TActivityType } from "@/lib/interfaces/activity-interface";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { Search, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ActivityListFiltersProps {
  onChange: (filters: IActivityFilters) => void;
}

export const ActivityListFilters = ({ onChange }: ActivityListFiltersProps) => {
  const [selectedActivityType, setSelectedActivityType] = useState("ALL");

  const handleSelectActivityType = (value: string) => {
    setSelectedActivityType(value);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-4 flex items-center gap-4 bg-background">
      {/* Toggle Group - Left Side */}
      <ToggleGroup
        type="single"
        defaultValue={selectedActivityType}
        value={selectedActivityType}
        onValueChange={handleSelectActivityType}
        className="flex"
      >
        <ToggleGroupItem value="ALL" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        {Object.keys(ActivityTypes).map((key) => (
          <ToggleGroupItem value={key} aria-label={"Toggle " + key} key={key} className="bg-black">
            {capitalizeFirstLetter(ActivityTypes[key as TActivityType])}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Search Bar + Button - Right Side */}
      <div className="relative flex items-center flex-grow">
        <Input placeholder="Search user, recording item, or date range" className="rounded-md pl-4 pr-10 w-full" />
        <button className="absolute right-2 p-2 rounded-sm">
          <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Additional Button */}
      <Button className="bg-lime-50 text-lime-700 border-lime-700 border-2 font-semibold">
        <Save className="h-5 w-5 mr-2  text-lime-700" />
        Export
       </Button>
    </div>
  );
};
