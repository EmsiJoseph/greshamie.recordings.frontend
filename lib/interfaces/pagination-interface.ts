export interface IPagination {
    // API Params
    pageSize?: number
    pageOffSet?: number

    hasNext?: boolean,
    hasPrevious?: boolean,
    totalCount?: number,
    totalPages?: number
}