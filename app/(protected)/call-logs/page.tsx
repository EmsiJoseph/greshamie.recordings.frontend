"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sampleFetchCalls } from "@/api/calls";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import AudioPlayer from "../audiotest/audio-player";

export default function CallLogPage() {
  const { retrievedFilters, resetCallFilters } = useCallFilters();
  const queryClient = useQueryClient();

  // Prepare filters for query key
  let filters = retrievedFilters as Record<string, any>;
  if (filters.callTypes && Array.isArray(filters.callTypes)) {
    filters = { ...filters, callTypes: filters.callTypes.join(",") };
  }
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  // Fetch call data using React Query
  const { data, isFetching } = useQuery({
    queryKey: ["calls", ...filterValues],
    queryFn: () => sampleFetchCalls({ ...retrievedFilters }),
  });

  // Mutation to control audio state
  const audioMutation = useMutation({
    mutationKey: ["currentAudio"],
    mutationFn: async (url: string | null) => url,
    onSuccess: (url) => {
      queryClient.setQueryData(["currentAudio"], url);
    },
  });

  return (
    <>
      <div>
        <CallListFilters
          retrievedFilters={retrievedFilters}
          resetCallFilters={resetCallFilters}
        />
        <CallList
          calls={data}
          isFetching={isFetching}
          onPlayAudio={audioMutation.mutate} 
        />
        <AudioPlayer url={audioMutation.data || null} />
      </div>
    </>
  );
}
