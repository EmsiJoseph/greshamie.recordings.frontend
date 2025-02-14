export const parseBoolean = (value: string | null): boolean | undefined => {
    if (!value) return undefined; // Handles null, empty strings, and undefined
    const lowerValue = value.toLowerCase(); // Normalize case sensitivity
    if (lowerValue === "true") return true;
    if (lowerValue === "false") return false;
    return undefined; // Handle invalid values
};

export const parseNumber = (value: string | null): number | undefined => {
    if (!value) return undefined; // Handle null, empty string, or undefined

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined; // Ensure it's a valid number
};