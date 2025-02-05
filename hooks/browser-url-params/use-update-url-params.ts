import { useSearchParams, useRouter } from 'next/navigation';

export const useUpdateUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // This function appends, updates, or deletes filters without replacing everything.
  const updateUrlParams = <T extends Record<string, any>>(newFilters?: T) => {
    if (!newFilters) return;
  
    const params = new URLSearchParams(searchParams);
  
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          if (value.includes('ALL') || value.length === 0) {
            console.log("Is array and includes all or blank", value);

            params.delete(key);
            return; // Skip further processing for this key
          }
          // Only join if the value is actually different than current
          value = value.filter((v) => v.trim() !== '').join(',');

          console.log("Is array", value);
        }
  
        const currentValue = params.get(key);
        if (currentValue !== value) {
          params.set(key, value);
        }
      } else {
        params.delete(key);
      }
    });
  
    // Only update the URL if something has changed
    const newUrl = `?${params.toString()}`;
    if (newUrl !== `?${searchParams.toString()}`) {
      router.replace(newUrl);
    }
  };  

  // Function to reset all filters (clear query params)
  const resetUrlParams = () => {
    router.replace('?'); // Clear all query parameters
  };

  return { updateUrlParams, resetUrlParams };
};
