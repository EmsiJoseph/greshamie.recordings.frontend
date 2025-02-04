"use client"

import React, { useEffect } from 'react'
import { CallList } from './components/call-list'
import { useQuery } from '@tanstack/react-query';
import { sampleFetchCalls } from '@/api/calls';
import { CallListFilters } from './components/call-list-filters';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { useGetUrlParams } from '@/hooks/browser-url-params/use-get-url-params';
import { CallTypes } from '@/constants/call-types';
import { ICallFilters } from '@/lib/interfaces/call-interface';
import { useRetrieveCallFilters } from './lib/useRetrieveCallFilters';

export default function CallLogPage() {
  const { updateUrlParams, resetUrlParams } = useUpdateUrlParams()
  const filters = useRetrieveCallFilters();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['calls',],
    queryFn: () => sampleFetchCalls(filters),
  });

  // Function to handle updates from CallListFilters
  const handleFilterChange = (updatedFilters?: ICallFilters) => {
    updateUrlParams(updatedFilters);
  };

  // Re-fetch data when URL params change
  useEffect(() => {
    refetch();
  }, [filters, refetch]);


  return (
    <div>
      <CallListFilters onChange={handleFilterChange} />
      <CallList calls={data} />
    </div>
  )
}
