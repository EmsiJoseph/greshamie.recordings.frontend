"use client"

import { useQuery } from '@tanstack/react-query';
import { sampleFetchActivities } from '@/api/activities';
import { ActivityListFilters } from './components/filters/activity-list-filters';
import { ActivityList } from '../activity/components/activity-list';
import { useActivityFilters } from './lib/use-activity-filters';

export default function ActivityPage() {
  const {retrievedFilters, resetActivityFilters} = useActivityFilters();
  // 01 Prepare filters for query key
  let filters = retrievedFilters as Record<string, any>;

  // --> If action exists within retrievedActivityFilters, convert it to a string
  if (filters.action && Array.isArray(filters.action)) {
    filters = {
      ...filters,
      action: filters.action.join(','),
    };
  }

  // --> Convert filters to an array and clean falsy values
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  // --> Pass the filters as part of the query key
  const { data, isFetching } = useQuery({
    queryKey: ['activities', ...filterValues],
    queryFn: () => sampleFetchActivities({ ...retrievedFilters }),
  });

  return (
    <div>
      <ActivityListFilters retrievedFilters={retrievedFilters} resetActivityFilters={resetActivityFilters} />
      <ActivityList activities={data} isFetching={isFetching} />
    </div>
  )
}
