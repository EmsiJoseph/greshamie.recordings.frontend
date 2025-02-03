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

export default function CallLogPage() {
  const { updateUrlParams, resetUrlParams } = useUpdateUrlParams()
  const getUrlParams = useGetUrlParams();

  // Get filter values from URL
  const search = getUrlParams("search") || "";
  // Ensure the value returned from getUrlParams is a valid key of CallTypes
  const callType = Object.keys(CallTypes).includes(getUrlParams("callType") as string)
    ? (getUrlParams("callType") as keyof typeof CallTypes)
    : undefined;  // fallback to undefined
  const minDuration = parseFloat(getUrlParams("minDuration") || "0");
  const maxDuration = parseFloat(getUrlParams("maxDuration") || "0");

  const filters = { search, callType, minDuration, maxDuration }

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['products',],
    queryFn: () => sampleFetchCalls(filters),
  });

  // Re-fetch data when URL params change
  useEffect(() => {
    refetch();
  }, [search, callType, minDuration, maxDuration, refetch]);


  // Function to handle updates from CallListFilters
  const handleFilterChange = (updatedFilters?: ICallFilters) => {
    updateUrlParams(updatedFilters);
  };

  return (
    <div>
      <CallListFilters onChange={handleFilterChange} />
      <CallList calls={data} />
    </div>
  )
}
