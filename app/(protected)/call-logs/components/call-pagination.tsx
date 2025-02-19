import Pagination from '@/components/common/pagination';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useCallFilters } from '../lib/use-call-filters';
import { ICallLogs } from '@/lib/interfaces/call-interface';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { parseNumber } from '@/lib/utils/parse-values';
import { useGetUrlParams } from '@/hooks/browser-url-params/use-get-url-params';

interface CallPaginationProps {
  callLogs?: ICallLogs
}

export const CallPagination = ({ callLogs }: CallPaginationProps) => {
  const { retrievedFilters } = useCallFilters()
  const getUrlParams = useGetUrlParams()
  const { updateUrlParams } = useUpdateUrlParams()
  const currPage = parseNumber(getUrlParams("pageOffSet"))
  const totalPages = parseNumber(getUrlParams("totalPages"))
  const hasNext = retrievedFilters?.hasNext
  const hasPrev = getUrlParams("hasPrevious")


  const handlePageChange = (
    nextOrPrevOrSet?: "next" | "prev" | "set",
    page?: string | number
  ) => {
    if (nextOrPrevOrSet === "set") {
      page = page ? page : 1; // if undefined, set to 1
      updateUrlParams({ "pageOffSet": page })
      return
    }

    // For previous and next
    if (!currPage) {
      // if undefined, just set the page to 1
      updateUrlParams({ "pageOffSet": 1 })
      return
    }

    if (nextOrPrevOrSet === "next") {
      updateUrlParams({ "pageOffSet": currPage + 1 })
      return
    }

    if (nextOrPrevOrSet === "prev") {
      if (currPage >= 2) {
        updateUrlParams({ "pageOffSet": currPage - 1 })
        return
      }
    }
  }

  return (
    <Pagination
      currentPage={currPage}
      totalPages={totalPages}
      hasNext={hasNext}
      onPageChange={handlePageChange}
    />
  );
};
