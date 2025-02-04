"use client"

import { CallList } from './components/call-list'
import { useQuery } from '@tanstack/react-query';
import { sampleFetchCalls } from '@/api/calls';
import { CallListFilters } from './components/call-list-filters';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { ICallFilters } from '@/lib/interfaces/call-interface';
import { useRetrieveCallFilters } from './lib/useRetrieveCallFilters';

export default function CallLogPage() {
  const { updateUrlParams } = useUpdateUrlParams()
  const { search, callType, minDuration, maxDuration } = useRetrieveCallFilters();
  const filters = [search, callType, minDuration, maxDuration].filter(Boolean); // Remove falsy values


  const { data, isFetching } = useQuery({
    queryKey: ['calls', ...filters],
    queryFn: () => sampleFetchCalls({ search, callType, minDuration, maxDuration }),
  });

  // Function to handle updates from CallListFilters
  const handleFilterChange = (updatedFilters?: ICallFilters) => {
    updateUrlParams(updatedFilters);
  };

  return (
    <div>
      <CallListFilters onChange={handleFilterChange} />
      <CallList calls={data} isFetching={isFetching} />
    </div>
  )
}
