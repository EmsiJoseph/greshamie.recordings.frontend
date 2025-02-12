"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCalls } from "@/api/calls";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import AudioPlayer from "../audio-player/audio-player";
import { fetchStreamingUrl } from "@/api/streams";

// Here, currentAudio is just the streaming URL string (or null)
type CurrentAudio = string | null;

export default function CallLogPage() {
  const { retrievedFilters, resetCallFilters } = useCallFilters();
  const queryClient = useQueryClient();
  // activeCallId tracks which call is currently playing
  const [activeCallId, setActiveCallId] = useState<string | number | null>(null);

  // Convert any Date filters to ISO strings.
  let filters = { ...retrievedFilters } as Record<string, any>;
  Object.entries(retrievedFilters).forEach(([key, value]) => {
    if (value instanceof Date) {
      filters[key] = value.toISOString();
    }
  });

  const filterValues = Object.values(filters).filter(Boolean) as string[];
  console.log("filter VALUES", filterValues);

  // Fetch call data using React Query.
  const { data, isFetching, isError } = useQuery<AxiosResponse<ICallLogs>>({
    queryKey: ["calls", ...filterValues],
    queryFn: () => fetchCalls({ ...retrievedFilters }),
  });

  // Mutation to fetch the streaming URL from the API.
  const audioMutation = useMutation({
    mutationKey: ["currentAudio"],
    mutationFn: async (call: ICall | null): Promise<CurrentAudio> => {
      if (!call) {
        console.log("Pausing audio.");
        return null;
      }
      console.log("Fetching streaming URL for call:", call);
      const response: AxiosResponse<ICallLogs> = await fetchStreamingUrl(call);
      console.log("Received streaming URL response:", response.data);
      return response.data.StreamingUrl;
    },
    onSuccess: (data, variables) => {
      console.log("Setting current audio:", data);
      queryClient.setQueryData<CurrentAudio>(["currentAudio"], data);
      // Set activeCallId based on the call passed in, or clear it when pausing.
      if (variables) {
        setActiveCallId(variables.id);
      } else {
        setActiveCallId(null);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      handleApiClientSideError({
        error: "Something went wrong. Try again later.",
        isSuccessToast: false,
      });
    }
  }, [isError]);

  // Retrieve the current streaming URL from the query cache.
  const currentAudio: CurrentAudio =
    queryClient.getQueryData<CurrentAudio>(["currentAudio"]) || null;

  return (
    <div>
      <CallListFilters
        retrievedFilters={retrievedFilters}
        resetCallFilters={resetCallFilters}
      />
      <CallList
        calls={data?.data?.items}
        isFetching={isFetching}
        onPlayAudio={audioMutation.mutate}
        activeCallId={activeCallId}
      />
      {/* Render the AudioPlayer only if a streaming URL exists */}
      {currentAudio && <AudioPlayer url={currentAudio} />}
    </div>
  );
}
