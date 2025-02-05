import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { useState } from "react";
import { Button } from "../ui/button";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";

interface ToggleGroupFilterProps<T extends string> {
    value?: T[];
    onValueChange: (value: T[]) => void; // Callback receives an array of T
    options: Record<T, string>;
    ariaLabelPrefix?: string;
    onResetSelection?: () => void;
    resetButtonLabel?: string;
    isResetButtonActive?: boolean;
}

export const ToggleGroupFilter = <T extends string>({
    value,
    onValueChange,
    onResetSelection,
    options,
    ariaLabelPrefix = "Toggle filter ",
    resetButtonLabel = "All",
    isResetButtonActive
}: ToggleGroupFilterProps<T>) => {
    const activeResetButton = isResetButtonActive && "bg-slate-100";
    return (
        <div className="flex gap-1">
            {onResetSelection && <Button
                className={`bg-transparent text-inherit hover:bg-slate-100 ${activeResetButton}`}
                onClick={onResetSelection}
            >
                {resetButtonLabel}
            </Button>}
            <ToggleGroup
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
