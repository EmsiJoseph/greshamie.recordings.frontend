import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { ReactNode } from "react";

interface SingleToggleGroupFilterProps<T extends string> {
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void; // Callback receives an array of T
    options: Record<T, string | { label: ReactNode, value: string }>;
    ariaLabelPrefix?: string;
    props?: any;
    toggleItemClass?: string
}

export const SingleToggleGroupFilter = <T extends string>({
    value,
    defaultValue,
    onValueChange,
    options,
    ariaLabelPrefix = "Toggle filter ",
    props,
    toggleItemClass
}: SingleToggleGroupFilterProps<T>) => {
    return (
        <ToggleGroup
            defaultValue={defaultValue}
            type="single"
            onValueChange={onValueChange}
            value={value}
            {...props}
            className="gap-2 sm:gap-4 flex-col sm:flex-row"
        >
            {Object.keys(options).map((key: string) => {
                const option = options[key as T]; // Retrieve the option using the key
                return (
                    <ToggleGroupItem
                        value={key}
                        aria-label={`${ariaLabelPrefix} ${key}`}
                        key={key}
                        className={toggleItemClass}
                    >
                        {typeof option === "string"
                            ? capitalizeFirstLetter(option)
                            : option.label}
                    </ToggleGroupItem>
                );
            })}
        </ToggleGroup>
    );
};
