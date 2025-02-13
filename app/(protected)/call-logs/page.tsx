"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
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
import { fetchDownloadUrl } from "@/api/download";

type AudioData = {
  streamingUrl: string | null;
  downloadUrl: string | null;
};

export default function CallLogPage() {
  const { retrievedFilters, resetCallFilters } = useCallFilters();
  const { fetchCalls } = useFetchCalls();

  const [activeCallId, setActiveCallId] = useState<string | number | null>(null);
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Remove falsy values
  const filterValues = Object.values(retrievedFilters).filter(Boolean);

  // Fetch call data using React Query
  const { data, isFetching, isError } = useQuery<AxiosResponse<ICallLogs>>({
    queryKey: ["calls", ...filterValues],
    queryFn: () => fetchCalls({ ...retrievedFilters }),
  });

  // Unified mutation for fetching streaming and download URLs
  const fetchAudioData = useMutation({
    mutationKey: ["audioData"],
    mutationFn: async (call: ICall | null): Promise<AudioData | null> => {
      if (!call) return null;
      
      const [streamingResponse, downloadResponse] = await Promise.all([
        fetchStreamingUrl(call),
        fetchDownloadUrl(call),
      ]);
      
      return {
        streamingUrl: streamingResponse.data.streamingUrl ?? null,
        downloadUrl: downloadResponse.data.downloadUrl ?? null,
      };
    },
    onSuccess: (data, variables) => {
      console.log("Fetched audio data:", data);
      setAudioData(data);
      
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

  const toggleAudio = () => {
    setAudioPlaying((prev) => !prev);
  };

  const handleAudioClose = () => {
    setAudioData(null);
    setActiveCallId(null);
    setAudioPlaying(false);
  };

  return (
    <div>
      <CallListFilters
        retrievedFilters={retrievedFilters}
        resetCallFilters={resetCallFilters}
      />
      <CallList
        calls={data?.data?.items}
        isFetching={isFetching}
        onPlayAudio={(call) => {
          if (call && call.id !== activeCallId) {
            fetchAudioData.mutate(call);
          } else if (call && call.id === activeCallId) {
            toggleAudio();
          } else {
            setAudioPlaying(false);
            setActiveCallId(null);
          }
        }}
        activeCallId={activeCallId}
        audioPlaying={audioPlaying}
        onToggleAudio={toggleAudio}
      />
      {audioData?.streamingUrl && (
        <AudioPlayer
          url={audioData.streamingUrl}
          downloadUrl={audioData.downloadUrl ?? undefined}
          playing={audioPlaying}
          onPlayPause={toggleAudio}
          onClose={handleAudioClose}
        />
      )}
    </div>
  );
}
