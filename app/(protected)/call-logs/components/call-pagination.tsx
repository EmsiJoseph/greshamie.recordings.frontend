import { useUpdateUrlParams } from '@/hooks/use-url-params';
import { parseBoolean, parseNumber } from '@/lib/utils/parse-values';
import DynamicPagination from '@/components/common/pagination';

export const CallPagination = () => {
  const { updateUrlParams, getUrlParams } = useUpdateUrlParams()
  const currPage = parseNumber(getUrlParams("pageOffSet"))
  const totalPages = parseNumber(getUrlParams("totalPages"))
  const hasNext = parseBoolean(getUrlParams("hasNext"))
  const hasPrev = parseBoolean(getUrlParams("hasPrevious"))

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
    <DynamicPagination
      currentPage={currPage}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrev={hasPrev}
      onPageChange={handlePageChange}
    />
  );
};