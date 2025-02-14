import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ActivityListPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page?: number) => void;
}

export const Pagination: React.FC<ActivityListPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!totalPages || !currentPage) return;
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  const nextPage = currentPage ? currentPage + 1 : 1;
  const prevPage = currentPage ? currentPage - 1 : 1;

  return (
    <div className="flex items-center justify-between w-full mt-4">
      {/* Left Side: Page Input and Text */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Page</span>
        <Input
          type="number"
          value={currentPage}
          onChange={handlePageChange}
          className="w-12 text-center"
          min={1}
          max={totalPages}
        />
        <span className="text-sm">of {totalPages}</span>
      </div>

      {/* Right Side: Previous and Next Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(prevPage)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(nextPage)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;