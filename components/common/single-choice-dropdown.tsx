import { capitalizeFirstLetter } from "@/lib/utils/format-text";
import { ReactNode } from "react";

interface SingleChoiceDropdown<T extends string> {
  value?: T;
  defaultValue?: number | string | string[] | undefined;
  onValueChange?: (value: T) => void; // Callback receives an array of T
  options: Record<T, string | { label: ReactNode; value: string }>;
  ariaLabelPrefix?: string;
  className?: string;
  toggleItemClass?: string;
}

export const SingleChoiceDropdown = <T extends string>({
  value,
  onValueChange,
  options,
  ariaLabelPrefix = "Toggle filter ",
  className,
}: SingleChoiceDropdown<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value as T)}
      aria-label={`${ariaLabelPrefix} dropdown`}
      className={`${className} flex form-select p-2 border rounded-md`}
    >
      {Object.keys(options).map((key: string) => {
        const option = options[key as T];
        return (
          <option value={key} key={key}>
            {typeof option === "string"
              ? capitalizeFirstLetter(option)
              : option.label}
          </option>
        );
      })}
    </select>
  );
};
