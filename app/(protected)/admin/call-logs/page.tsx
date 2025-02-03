"use client"

import React from 'react'
import { CallList } from './components/call-list'
import { useQuery } from '@tanstack/react-query';
import { sampleFetchCalls } from '@/api/calls';
import { CallListFilters } from './components/call-list-filters';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { useGetUrlParams } from '@/hooks/browser-url-params/use-get-url-params';

export default function CallLogPage() {
  const { data, isFetching } = useQuery({
    queryKey: ['products',],
    queryFn: () => sampleFetchCalls(),
  });

  const { updateUrlParams, resetUrlParams } = useUpdateUrlParams()
  const getUrlParams = useGetUrlParams();


  // Get filter values from URL
  const search = getUrlParams("search") || "";
  const category = getUrlParams("call-type") || "all";
  const minDuration = getUrlParams("min-duration") || "0";
  const maxDuration = getUrlParams("max-duration") || "0";

  return (
    <div>
      <CallListFilters onChange={() => { }} />
      <CallList calls={data} />
    </div>
  )
}
