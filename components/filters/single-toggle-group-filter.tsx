import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { ReactNode, useState, useEffect } from "react";

interface SingleToggleGroupFilterProps<T extends string> {
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void; // Callback receives an array of T
    options: Record<T, string | { label: ReactNode, value: string }>;
    ariaLabelPrefix?: string;
    props?: React.HTMLAttributes<HTMLDivElement>;
    toggleItemClass?: string
}

export const SingleToggleGroupFilter = <T extends string>({
    value,
    defaultValue = "All" as T,
    onValueChange,
    options,
    ariaLabelPrefix = "Toggle filter ",
    props,
    toggleItemClass
}: SingleToggleGroupFilterProps<T>) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth < 640) {
            setIsDropdown(true);
        } else {
            setIsDropdown(false);
        }
    }, [windowWidth]);

    const extendedOptions = { All: "All", ...options };

    return (
        <div>
            {isDropdown ? (
                <select
                    value={value}
                    onChange={(e) => onValueChange?.(e.target.value as T)}
                    aria-label={`${ariaLabelPrefix} dropdown`}
                    className="form-select p-2 border rounded-md"
                >
                    {Object.keys(extendedOptions).map((key: string) => {
                        const option = extendedOptions[key as T];
                        return (
                            <option value={key} key={key}>
                                {typeof option === "string"
                                    ? capitalizeFirstLetter(option)
                                    : option.label}
                            </option>
                        );
                    })}
                </select>
            ) : (
                <ToggleGroup
                    defaultValue={defaultValue}
                    type="single"
                    onValueChange={onValueChange}
                    value={value}
                    {...props}
                    className="gap-2 sm:gap-4 flex-col sm:flex-row"
                >
                    {Object.keys(extendedOptions).map((key: string) => {
                        const option = extendedOptions[key as T];
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
            )}
        </div>
    );
};