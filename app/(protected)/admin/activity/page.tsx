"use client"

import { useQuery } from '@tanstack/react-query';
import { sampleFetchActivities } from '@/api/activities';
import { ActivityListFilters } from '../activity/components/activity-list-filters';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { IActivityFilters } from '@/lib/interfaces/activity-interface';
import { useRetrieveActivityFilters } from '../activity/lib/useRetrieveActivityFilters';
import { ActivityList } from '../activity/components/activity-list';

export default function ActivityPage() {
  const { search, action } = useRetrieveActivityFilters();

  // Fetch activities with the filters
  const stringActivityType = action?.join(',');
  const filters = [search, stringActivityType].filter(Boolean); // Remove falsy values
  const { data, isFetching } = useQuery({
    queryKey: ['activities', ...filters],
    queryFn: () => sampleFetchActivities({ search, action }),
  });
  

  return (
    <div>
      <ActivityListFilters />
      <ActivityList activities={data} isFetching={isFetching} />
    </div>
  )
}
