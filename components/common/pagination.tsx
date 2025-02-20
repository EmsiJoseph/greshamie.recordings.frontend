import React, { useEffect, useState } from 'react';
import { Pagination as ShadCnPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import useDeviceSize from '@/hooks/use-device-size';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  pageSize?: number;
  currentPage?: number; // PageOffset
  totalCount?: number;
  totalPages?: number;
  onPageChange: (
    nextOrPrevOrSet?: 'next' | 'prev' | 'set',
    page?: string | number
  ) => void;
}

const Pagination = ({
  hasNext,
  hasPrev,
  pageSize,
  currentPage,
  totalCount,
  totalPages,
  onPageChange
}: PaginationProps) => {
  // const [viewportWidth] = useDeviceSize()

  // Directly use viewportWidth in your rendering logic to calculate maxPagesToShow
  const maxPagesToShow = 4;
  console.log("max pages to show", maxPagesToShow)

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;


  // Calculate the start and end page numbers
  const startPage = currentPage ? Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1) : undefined;
  const endPage = startPage && totalPages ? Math.min(startPage + maxPagesToShow - 1, totalPages) : undefined;

  // Handle the page click
  const handlePageClick = (page: number) => {
    onPageChange('set', page);
  };

  return (
    <ShadCnPagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange("prev")}
            disabled={isPrevDisabled}
            className='outline-none border-none'
          >
            <ChevronLeft className="w-4 h-4" />
            <p className='sm:block hidden'>Previous</p>
          </Button>

        </PaginationItem>
        {/* Loop over and render the pages in the calculated range */}
        {endPage && startPage && Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
          const page = startPage + idx;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => handlePageClick(page)}
                className={currentPage === page ? 'bg-gray-100 dark:bg-gray-500' : ''}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Show ellipsis if needed (after the last page in the current range) */}
        {currentPage && totalPages && currentPage < totalPages - maxPagesToShow && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange("next")}
            disabled={isNextDisabled}
            className='outline-none border-none'
          >
            <p className='sm:block hidden'>Next</p>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadCnPagination>
  );
};

export default Pagination;
