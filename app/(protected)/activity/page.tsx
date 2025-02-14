"use client"

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchActivity } from '@/api/activities';
import { ActivityListFilters } from './components/filters/activity-list-filters';
import { ActivityList } from '../activity/components/activity-list';
import { useActivityFilters } from './lib/use-activity-filters';
import { IActivity, IActivityResponse } from '@/lib/interfaces/activity-interface';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { handleApiClientSideError } from '@/lib/handlers/api-response-handlers/handle-use-client-response';

export default function ActivityPage() {
  const {retrievedFilters, resetActivityFilters} = useActivityFilters();
  const queryClient = useQueryClient();
  // 01 Prepare filters for query key
  let filters = { ...retrievedFilters } as Record<string, any>;
  Object.entries(retrievedFilters).forEach(([key, value]) => {
    if (value instanceof Date) {
      filters[key] = value.toISOString();
    }
  });

  // --> Convert filters to an array and clean falsy values
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  const { data, isFetching, isError } = useQuery({
    queryKey: ['activities', ...filterValues],
    queryFn: () =>fetchActivity({ ...retrievedFilters }),
  });

  useEffect(() => {
      if (isError) {
        handleApiClientSideError({
          error: "Something went wrong. Try again later.",
          isSuccessToast: false,
        });
      }
    }, [isError]);

  return (
    <div>
      <ActivityListFilters retrievedFilters={retrievedFilters} resetActivityFilters={resetActivityFilters} />
      <ActivityList activities={data?.data?.items} isFetching={isFetching} />
    </div>
  )
}
