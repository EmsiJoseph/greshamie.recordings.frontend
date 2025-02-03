"use client"

import React from 'react'
import { CallList } from './components/call-list'
import { useQuery } from '@tanstack/react-query';
import { sampleFetchCalls } from '@/api/calls';

export default function CallLogPage() {
  const { data, isFetching } = useQuery({
    queryKey: ['products',],
    queryFn: () => sampleFetchCalls(),
  });
  return (
    <div>
      <CallList calls={data}/>
    </div>
  )
}
