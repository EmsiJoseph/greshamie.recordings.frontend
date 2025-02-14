"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchCalls } from "@/api/calls";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { useCallFilters } from "./lib/use-call-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import AudioPlayer from "../audio-player/audio-player";
import { fetchStreamingUrl } from "@/api/streams";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";

type CurrentAudio = string | null;

export default function CallLogPage() {
  const { updateUrlParams } = useUpdateUrlParams()
  const { retrievedFilters, resetCallFilters } = useCallFilters();
  const { fetchCalls } = useFetchCalls()

  // State to keep track of the active call ID.
  const [activeCallId, setActiveCallId] = useState<string | number | null>(
    null
  );
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Remove Falsy values
  const filterValues = Object.values(retrievedFilters).filter(Boolean);
  // Fetch call data using React Query
  const { data, isFetching, isError, isSuccess } = useQuery<AxiosResponse<ICallLogs>>({
    queryKey: ["calls", ...filterValues],
    queryFn: () => fetchCalls({ ...retrievedFilters }),
  });

  useEffect(() => {

    console.log("PAGEE OFFSEEETTT", data)
    if (isSuccess) {
      const paginationData = {
        hasNext: data.data.hasNext,
        hasPrevious: data.data.hasPrevious,
        pageSize: data.data.pageSize,
        pageOffset: data.data.pageOffset,
        totalCount: data.data.totalCount,
        totalPages: data.data.totalPages,
      }
      updateUrlParams(paginationData)
    }
  }, [isSuccess, updateUrlParams])


  // Mutation to fetch the streaming URL.
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
      // Use the property name matching your API response (lowercase 'streamingUrl')
      return response.data.streamingUrl;
    },
    onSuccess: (data, variables) => {
      console.log("Setting current audio:", data);
      setCurrentAudio(data);
      if (variables) {
        setActiveCallId(variables.id);
        setAudioPlaying(true);
      } else {
        setActiveCallId(null);
        setAudioPlaying(false);
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
  const toggleAudio = () => {
    setAudioPlaying((prev) => !prev);
  };

  // Reset audio state when AudioPlayer is closed.
  const handleAudioClose = () => {
    setCurrentAudio(null);
    setActiveCallId(null);
    setAudioPlaying(false);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <CallListFilters
        retrievedFilters={retrievedFilters}
        resetCallFilters={resetCallFilters}
      />
      <CallList
        calls={data?.data}
        isFetching={isFetching}
        onPlayAudio={(call) => {
          // If a new call is selected, fetch its streaming URL.
          if (call && call.id !== activeCallId) {
            audioMutation.mutate(call);
          } else if (call && call.id === activeCallId) {
            // If the same call is clicked, toggle play/pause.
            toggleAudio();
          } else {
            // If null is passed, pause audio.
            setAudioPlaying(false);
            setActiveCallId(null);
          }
        }}
        activeCallId={activeCallId}
        audioPlaying={audioPlaying}
        onToggleAudio={toggleAudio}
      />
      {/* Render AudioPlayer only if a streaming URL exists */}
      {currentAudio && (
        <AudioPlayer
          url={currentAudio}
          playing={audioPlaying}
          onPlayPause={toggleAudio}
          onClose={handleAudioClose}
        />
      )}
    </div>
  );
}
