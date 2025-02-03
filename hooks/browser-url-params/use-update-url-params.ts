import { useSearchParams, useRouter } from 'next/navigation';

export const useUpdateUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // This function appends, updates, or deletes filters without replacing everything.
  const updateUrlParams = <T extends Record<string, any>>(newFilters?: T) => {
    if (!newFilters) {
      return
    }
    const params = new URLSearchParams(searchParams);

    // Loop through the new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        // Update or append the parameter
        params.set(key, value); // This updates the value if the key exists or appends it if it doesn't exist.
      } else {
        // If value is falsy (e.g., null or undefined), delete the parameter
        params.delete(key);
      }
    });

    // Update the URL with the modified parameters
    router.replace(`?${params.toString()}`);
  };

  // Function to reset all filters (clear query params)
  const resetUrlParams = () => {
    router.replace('?'); // Clear all query parameters
  };

  return { updateUrlParams, resetUrlParams };
};
