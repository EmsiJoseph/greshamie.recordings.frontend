"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCalls } from "@/api/calls";

import { ICall } from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import AudioPlayer from "../audio-player/audio-player";
import { fetchStreamingUrl } from "./components/helpers/streamingUrlHelper";

// Define the CurrentAudio interface inline
interface CurrentAudio {
  callId: string | number;
  streamingUrl: string;
}

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
    queryFn: () => fetchCalls({ ...retrievedFilters }),
  });

  // Mutation to control audio state:
  // Accepts an ICall (to play) or null (to pause)
  const audioMutation = useMutation({
    mutationKey: ["currentAudio"],
    mutationFn: async (call: ICall | null): Promise<CurrentAudio | null> => {
      // If no call is provided, return null (i.e. pause audio)
      if (!call) return null;
      const streamingUrl = await fetchStreamingUrl(call);
      return { callId: call.id, streamingUrl };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CurrentAudio | null>(["currentAudio"], data);
    },
  });

  // Retrieve the current audio state
  const currentAudio =
    queryClient.getQueryData<CurrentAudio>(["currentAudio"]) || null;

  return (
    <div>
      <CallListFilters
        retrievedFilters={retrievedFilters}
        resetCallFilters={resetCallFilters}
      />
      {/* Pass the mutation’s mutate function and currentAudio to CallList */}
      <CallList
        calls={data?.data}
        isFetching={isFetching}
        onPlayAudio={audioMutation.mutate}
        currentAudio={currentAudio}
      />
      {/* Only show the audio player if there is an active URL */}
      {currentAudio && <AudioPlayer url={currentAudio.streamingUrl} />}
    </div>
  );
}
