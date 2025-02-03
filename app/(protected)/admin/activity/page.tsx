"use client"

import NavFilter from "@/components/nav-filter";
import { ActivityList } from "./components/activity-list";
import { useQuery } from "@tanstack/react-query";
import { sampleFetchActivities } from "@/api/activities";
import { ActivityListFilters } from "./components/activity-list-filters";
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { useGetUrlParams } from '@/hooks/browser-url-params/use-get-url-params';

export default function ActivityPage() {

    const { data, isFetching } = useQuery({
        queryKey: ['products',],
        queryFn: () => sampleFetchActivities(),
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
        <ActivityListFilters onChange={() => { }} />
        <ActivityList activities={data} />
        </div>
    );
}


