import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { Button } from "../ui/button";

interface MultiToggleGroupFilterProps<T extends string> {
    value?: T[];
    defaultValue?: T[];
    onValueChange?: (value: T[]) => void; // Callback receives an array of T
    options: Record<T, string>;
    ariaLabelPrefix?: string;
    onResetSelection?: () => void;
    resetButtonLabel?: string;
    isResetButtonActive?: boolean;
    props?: any;
}

export const MultiToggleGroupFilter = <T extends string>({
    value,
    defaultValue,
    onValueChange,
    onResetSelection,
    options,
    ariaLabelPrefix = "Toggle filter ",
    resetButtonLabel = "All",
    isResetButtonActive,
    props
}: MultiToggleGroupFilterProps<T>) => {
    const activeResetButton = isResetButtonActive && "bg-slate-100";
    return (
        <div className="flex gap-1" {...props}>
            {onResetSelection && <Button
                className={`bg-transparent text-inherit hover:bg-slate-100 ${activeResetButton}`}
                onClick={onResetSelection}
            >
                {resetButtonLabel}
            </Button>}
            <ToggleGroup
                defaultValue={defaultValue}
                type="multiple"
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
        </div>
    );
};
