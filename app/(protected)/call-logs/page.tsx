"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCalls } from "@/api/calls";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect } from "react";
import { ICallLogs } from "@/lib/interfaces/call-interface";
import { AxiosResponse } from "axios";
import AudioPlayer from "../audio-player/audio-player";

export default function CallLogPage() {
  const { retrievedFilters, resetCallFilters } = useCallFilters();

  console.log(retrievedFilters)

  const queryClient = useQueryClient();

  let filters = retrievedFilters as Record<string, any>;
  // Prepare filters for query key
  Object.entries(retrievedFilters).map(([key, value]) => {
    if (value && value instanceof Date) {
      // If the value is a Date, convert it to ISO string
      filters[key] = value.toISOString();
    }
  });

  const filterValues = Object.values(filters).filter(Boolean) as string[];

  console.log("filter VALUES", filterValues)

  // Fetch call data using React Query
  const { data, isFetching, isError } = useQuery<AxiosResponse<ICallLogs>>({
    queryKey: ["calls", ...filterValues],
    queryFn: () => fetchCalls({ ...retrievedFilters }),
  });

  // Mutation to control audio state
  const audioMutation = useMutation({
    mutationKey: ["currentAudio"],
    mutationFn: async (url: string | null) => url,
    onSuccess: (url) => {
      queryClient.setQueryData(["currentAudio"], url);
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

  const currentAudio =
    queryClient.getQueryData<string | null>(["currentAudio"]) || null;

  return (
    <>
      <div>
        <CallListFilters
          retrievedFilters={retrievedFilters}
          resetCallFilters={resetCallFilters}
        />
        <CallList
          calls={data?.data?.items}
          isFetching={isFetching}
          onPlayAudio={audioMutation.mutate}
        />
        {/* Only show the audio player if there is an active URL */}
        {currentAudio && <AudioPlayer url={currentAudio} />}
      </div>
    </>
  );
}
