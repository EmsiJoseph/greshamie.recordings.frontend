"use client"

import { useQuery } from '@tanstack/react-query';
import { sampleFetchActivities } from '@/api/activities';
import { ActivityListFilters } from './components/filters/activity-list-filters';
import { useRetrieveActivityFilters } from './lib/use-retrieve-activity-filters';
import { ActivityList } from '../activity/components/activity-list';

export default function ActivityPage() {
  const retrievedFilters = useRetrieveActivityFilters();
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
  const { search, action } = useRetrieveActivityFilters();

  return (
    <div>
      <ActivityListFilters retrievedFilters={retrievedFilters} />
      <ActivityList activities={data} isFetching={isFetching} />
    </div>
  )
}
