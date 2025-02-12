"use client"

import { useQuery } from '@tanstack/react-query';
import { fetchActivity } from '@/api/activities';
import { ActivityListFilters } from './components/filters/activity-list-filters';
import { ActivityList } from '../activity/components/activity-list';
import { useActivityFilters } from './lib/use-activity-filters';
import { IActivityResponse } from '@/lib/interfaces/activity-interface';
import { AxiosResponse } from 'axios';

export default function ActivityPage() {
  const {retrievedFilters, resetActivityFilters} = useActivityFilters();
  // 01 Prepare filters for query key
  let filters = retrievedFilters as Record<string, any>;

  if (filters.eventType?.length) {
    filters.eventType = filters.eventType.join(',');
  }
  // --> Convert filters to an array and clean falsy values
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  // --> Pass the filters as part of the query key
  const { data, isFetching, isError } = useQuery<AxiosResponse<IActivityResponse>>({
    queryKey: ['activities', ...filterValues],
    queryFn: () => fetchActivity({ ...retrievedFilters }),
  });

  return (
    <div>
      <ActivityListFilters retrievedFilters={retrievedFilters} resetActivityFilters={resetActivityFilters} />
      <ActivityList activities={data?.data?.items} isFetching={isFetching} />
    </div>
  )
}
