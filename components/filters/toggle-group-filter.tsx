import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";

interface ToggleGroupFilterProps<T extends string> {
    defaultValue?: T;
    onValueChange: (value: T) => void;
    options: Record<T, string>;
    ariaLabelPrefix?: string;
}

export const ToggleGroupFilter = <T extends string>({
    defaultValue,
    onValueChange,
    options,
    ariaLabelPrefix = "Toggle filter ",
}: ToggleGroupFilterProps<T>) => {
    return (
        <ToggleGroup
            type="single"
            defaultValue={defaultValue}
            onValueChange={onValueChange}
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