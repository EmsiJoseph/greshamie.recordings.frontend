"use client"

import { useQuery } from '@tanstack/react-query';
import { sampleFetchActivities } from '@/api/activities';
import { ActivityListFilters } from '../activity/components/activity-list-filters';
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { IActivityFilters } from '@/lib/interfaces/activity-interface';
import { useRetrieveActivityFilters } from '../activity/lib/useRetrieveActivityFilters';
import { ActivityList } from '../activity/components/activity-list';

export default function ActivityPage() {
  const { updateUrlParams } = useUpdateUrlParams()
    const { search, action } = useRetrieveActivityFilters();
    const filters = [search, action].filter(Boolean); // Remove falsy values


  const { data, isFetching } = useQuery({
    queryKey: ['activities', ...filters],
    queryFn: () => sampleFetchActivities({ search, action }),
  });

  // Function to handle updates from CallListFilters
  const handleFilterChange = (updatedFilters?: IActivityFilters) => {
    updateUrlParams(updatedFilters);
  };

  return (
    <div>
      <ActivityListFilters onChange={handleFilterChange} />
      <ActivityList activities={data} isFetching={isFetching} />
    </div>
  )
}
