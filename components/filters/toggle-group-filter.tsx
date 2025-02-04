import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";

interface ToggleGroupFilterProps<T extends string> {
    onValueChange: (value: T | "ALL") => void;
    selectionObject: Record<T, string>;
}

export const ToggleGroupFilter = <T extends string>({
    onValueChange,
    selectionObject,
}: ToggleGroupFilterProps<T>) => {
    return (
        <ToggleGroup
            type="single"
            defaultValue={"ALL"}
            onValueChange={(value: T | "ALL") => onValueChange(value)}
        >
            {/* All is not included in the selectionObject */}
            <ToggleGroupItem value="ALL" aria-label="Toggle all">
                All
            </ToggleGroupItem>
            {Object.keys(selectionObject).map((key) => (
                <ToggleGroupItem value={key} aria-label={`Toggle ${key}`} key={key}>
                    {key === ""
                        ? "No call type"
                        : capitalizeFirstLetter(selectionObject[key as T])}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};