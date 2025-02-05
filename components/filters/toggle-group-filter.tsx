import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";

interface ToggleGroupFilterProps<T extends string> {
    value?: T;
    onValueChange: (value: T) => void; // Callback receives an array of T
    options: Record<T, string>;
    ariaLabelPrefix?: string;
}

export const ToggleGroupFilter = <T extends string>({
    value,
    onValueChange,
    options,
    ariaLabelPrefix = "Toggle filter ",
}: ToggleGroupFilterProps<T>) => {
    return (
        <ToggleGroup
            type="single"
            onValueChange={onValueChange}
            value={value}
        >
            {Object.keys(options).map((key) => (
                <ToggleGroupItem
                    value={key}
                    aria-label={`${ariaLabelPrefix} ${key}`}
                    key={key}
                >
                    {capitalizeFirstLetter(options[key as T])}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};