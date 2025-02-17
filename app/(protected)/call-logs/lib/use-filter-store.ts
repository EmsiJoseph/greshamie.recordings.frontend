import { create } from "zustand";
import { ICallFilters } from "@/lib/interfaces/call-interface";
import { defaultCallFilterValues } from "./default-filter-values";

interface IFilterStore extends ICallFilters {
    filters: ICallFilters,
    resetFilters: () => void;
    setFilters: (filters: Partial<ICallFilters>) => void;
}

const useFilterStore = create<IFilterStore>((set) => ({
    filters: { ...defaultCallFilterValues },

    // ✅ Function to update filters
    setFilters: (filters) => set((state) => ({ ...state, ...filters })),

    // ✅ Reset to initial state
    resetFilters: () =>
        set(() => (defaultCallFilterValues)),
}));

export default useFilterStore;
