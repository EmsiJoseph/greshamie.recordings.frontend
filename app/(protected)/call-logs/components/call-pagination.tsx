import Pagination from '@/components/common/pagination';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useCallFilters } from '../lib/use-call-filters';
import { ICallLogs } from '@/lib/interfaces/call-interface';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';

interface CallPaginationProps {
  callLogs?: ICallLogs
}

export const CallPagination = ({ callLogs }: CallPaginationProps) => {
  const { retrievedFilters } = useCallFilters();
  const { updateUrlParams } = useUpdateUrlParams()
  const currPage = retrievedFilters?.pageOffset ? retrievedFilters?.pageOffset + 1 : 1
  const totalPages = retrievedFilters?.totalPages

  const handlePageChange = (page?: string | number) => {
    if (!page) return
    updateUrlParams({ "pageOffset": page })
  }
  return (
    <Pagination currentPage={currPage} totalPages={totalPages} onPageChange={handlePageChange} />
  );
};
