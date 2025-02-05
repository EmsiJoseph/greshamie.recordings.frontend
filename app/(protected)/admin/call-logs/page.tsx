"use client"

import { CallList } from './components/call-list'
import { useQuery } from '@tanstack/react-query';
import { sampleFetchCalls } from '@/api/calls';
import { CallListFilters } from './components/filters/call-list-filters';
import { useRetrieveCallFilters } from './lib/useRetrieveCallFilters';

export default function CallLogPage() {
  const retrievedFilters = useRetrieveCallFilters();
  // 01 Prepare filters for query key
  let filters = retrievedFilters as Record<string, any>;

  // --> If callTypes exists within retrievedCallFilters, convert it to a string
  if (filters.callTypes && Array.isArray(filters.callTypes)) {
    filters = {
      ...filters,
      callTypes: filters.callTypes.join(','),
    };
  }

  // --> Convert filters to an array and clean falsy values
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  // --> Pass the filters as part of the query key
  const { data, isFetching } = useQuery({
    queryKey: ['calls', ...filterValues],
    queryFn: () => sampleFetchCalls({ ...retrievedFilters }),
  });

  return (
    <div>
      <CallListFilters retrievedFilters={retrievedFilters} />
      <CallList calls={data} isFetching={isFetching} />
    </div>
  )
}
