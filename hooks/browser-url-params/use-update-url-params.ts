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
        // Get the current value of the parameter in the URL
        const currentValue = params.get(key);

        // Only update or append the parameter if the value is different from the current value
        if (currentValue !== value) {
          params.set(key, value); // Update or append the parameter
        }
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
