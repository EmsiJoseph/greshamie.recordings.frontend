export const buildQueryParams = <T extends Record<string, any>>(filters?: T): string => {
    if (!filters) return "";

    const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value); // Ensure all values are strings
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    return queryParams ? `?${queryParams}` : "";
};
