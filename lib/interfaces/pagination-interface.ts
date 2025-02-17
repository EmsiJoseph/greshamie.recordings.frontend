export interface IPagination {
    hasNext?: boolean,
    hasPrevious?: boolean,
    pageSize?: number
    pageOffSet?: number
    totalCount?: number,
    totalPages?: number
}