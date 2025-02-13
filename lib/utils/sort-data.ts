import { ICall } from "../interfaces/call-interface";

export interface SortConfig{
    key: keyof ICall;
    direction: "ascending" | "descending";
}

export const sortCalls = (calls: ICall[], sortConfig: SortConfig | null) => {
    if (!calls || !sortConfig) return calls;

    return [...calls].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "startDateTime" || sortConfig.key === "endDateTime") {
            aValue = typeof aValue === "boolean" ? 0 : new Date(aValue).getTime();
            bValue = typeof bValue === "boolean" ? 0 : new Date(bValue).getTime();
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