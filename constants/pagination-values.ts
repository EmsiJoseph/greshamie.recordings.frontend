import { IPagination } from "@/lib/interfaces/pagination-interface";

export const defaultPaginationValues: IPagination = {
    hasNext: undefined,
    hasPrevious: undefined,
    pageSize: undefined,
    pageOffSet: undefined,
    totalCount: undefined,
    totalPages: undefined,
}