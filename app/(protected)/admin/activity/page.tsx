"use client"

import NavFilter from "@/components/nav-filter";
import { ActivityList } from "./components/activity-list";
import { useQuery } from "@tanstack/react-query";
import { sampleFetchActivities } from "@/api/activities";
import { ActivityListFilters } from "./components/activity-list-filters";
import { useUpdateUrlParams } from '@/hooks/browser-url-params/use-update-url-params';
import { useGetUrlParams } from '@/hooks/browser-url-params/use-get-url-params';
import { ActivityTypes } from '@/constants/activity-types';
import { IActivityFilters } from "@/lib/interfaces/activity-interface";
import { useEffect } from "react";

export default function ActivityPage() {

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['products',],
        queryFn: () => sampleFetchActivities(),
      });

        const { updateUrlParams, resetUrlParams } = useUpdateUrlParams()
        const getUrlParams = useGetUrlParams();
      
        // Get filter values from URL
        const search = getUrlParams("search") || "";
        const activityType = Object.keys(ActivityTypes).includes(getUrlParams("activityType") as string)
            ? (getUrlParams("activityType") as keyof typeof ActivityTypes)
            : undefined;  // fallback to undefined

        // Re-fetch data when URL params change
        useEffect(() => {
            refetch();
        }, [search, activityType, refetch]);
    return (
        <div>  
            <ActivityListFilters onChange={() => { }} />
            <ActivityList activities={data} />
        </div>
    );
}


