import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { useState } from "react";

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
    const [selected, setSelected] = useState<T | undefined>(defaultValue);

    const handleChange = (value: T) => {
        setSelected(value);
        onValueChange(value);
    };

    return (
        <ToggleGroup
            type="single"
            value={selected}
            onValueChange={handleChange}
            className="flex gap-2"
        >
            {Object.keys(options).map((key) => {
                const isActive = selected === key;

                return (
                    <ToggleGroupItem
                        value={key}
                        aria-label={`${ariaLabelPrefix} ${key}`}
                        key={key}
                        className={`
                            px-4 py-2 rounded-md transition-all flex
                            ${isActive ? "bg-slate-100 border-none rounded-full font-bold" : " hover:bg-gray-100"}
                        `}
                    >
                        {capitalizeFirstLetter(options[key as T])}
                    </ToggleGroupItem>
                );
            })}
        </ToggleGroup>
    );
};
