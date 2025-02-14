export interface ISortConfig<T> {
    key: keyof T;
    direction: "ascending" | "descending";
}

export const sortData = <T>(data: T[], sortConfig: ISortConfig<T> | null): T[] => {
    if (!data || !sortConfig) return data;

    return [...data].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "startDateTime" || sortConfig.key === "endDateTime") {
            aValue = typeof aValue === "boolean" ? 0 : new Date(aValue as unknown as string).getTime();
            bValue = typeof bValue === "boolean" ? 0 : new Date(bValue as unknown as string).getTime();
        }

        if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });
}