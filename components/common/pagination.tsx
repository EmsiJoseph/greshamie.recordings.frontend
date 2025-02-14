import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseNumber } from "@/lib/utils/parse-values";

interface PaginationProps {
  hasNext?: boolean,
  hasPrevious?: boolean,
  pageSize?: number,
  currentPage?: number; // PageOffSet
  totalCount?: number;
  totalPages?: number;
  onPageChange: (
    nextOrPrevOrSet?: "next" | "prev" | "set",
    page?: string | number
  ) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  hasNext
}: PaginationProps) => {

  const handleInputPage = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextOrPrevOrSet?: "next" | "prev" | "set"
  ) => {
    // For manual input of page number
    if (e.target.value) {
      const page = parseNumber(e.target.value)
      if (page) {
        onPageChange(nextOrPrevOrSet, Math.abs(page))
        return
      }
    }

    if (nextOrPrevOrSet === "next") {
      onPageChange(nextOrPrevOrSet, 1)
    }
    onPageChange(nextOrPrevOrSet, e.target.value)
  }

  const isNextDisabled = !hasNext ? true : false
  const isPrevDisabled = currentPage === 1 || currentPage === 0

  return (
    <div className="flex items-center justify-between w-full mt-4">
      {/* Left Side: Page Input and Text */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Page</span>
        <div>{currentPage}</div>
        {/* <Input
          type="number"
          value={currentPage}
          onChange={handleInputPage}
          className="w-12 text-center"
          min={1}
          max={totalPages}
        /> */}
        <span className="text-sm">of {totalPages}</span>
      </div>

      {/* Right Side: Previous and Next Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("prev")}
          disabled={isPrevDisabled}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("next")}
          disabled={isNextDisabled}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;