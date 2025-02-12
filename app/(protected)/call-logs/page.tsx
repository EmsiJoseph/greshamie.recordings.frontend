"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCalls } from "@/api/calls";

import { ICall } from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect } from "react";
import { ICallLogs } from "@/lib/interfaces/call-interface";
import { AxiosResponse } from "axios";
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

  let filters = retrievedFilters as Record<string, any>;
  // Prepare filters for query key
  Object.entries(retrievedFilters).map(([key, value]) => {
    if (value && value instanceof Date) {
      // If the value is a Date, convert it to ISO string
      filters[key] = value.toISOString();
    }
  });

  // let filters = retrievedFilters as Record<string, any>;
  // if (filters.callDirection && Array.isArray(filters.callDirection)) {
  //   filters = { ...filters, callDirection: filters.callDirection.join(",") };
  // }
  const filterValues = Object.values(filters).filter(Boolean) as string[];

  console.log("filter VALUES", filterValues)

  // Fetch call data using React Query
  const { data, isFetching, isError } = useQuery<AxiosResponse<ICallLogs>>({
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

  useEffect(() => {
    if (isError) {
      handleApiClientSideError({
        error: "Something went wrong. Try again later.",
        isSuccessToast: false
      })
    }
  }, [isError])

  // Retrieve the current audio state
  const currentAudio =
    queryClient.getQueryData<CurrentAudio>(["currentAudio"]) || null;

  return (
    <>
      <div>
        <CallListFilters
          retrievedFilters={retrievedFilters}
          resetCallFilters={resetCallFilters}
        />
        <CallList
          calls={data?.data}
          isFetching={isFetching}
          onPlayAudio={audioMutation.mutate}
        />
        {/* Only show the audio player if there is an active URL */}
        {currentAudio && <AudioPlayer url={currentAudio} />}
      </div>
    </>
  );
}
