"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useFetchCalls } from "@/api/calls";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import AudioPlayer from "../audio-player/audio-player";
import { fetchStreamingUrl } from "@/api/streams";
import { fetchDownloadUrl } from "@/api/download";
import { useCallFilters } from "./lib/use-call-filters";
import { useUpdateUrlParams } from "@/hooks/browser-url-params/use-update-url-params";
import { getDateString, operateOnDays } from "@/lib/utils/date-utils";

type AudioData = {
  streamingUrl: string | null;
  downloadUrl: string | null;
};

export default function CallLogPage() {
  const { updateUrlParams } = useUpdateUrlParams()
  const {
    retrievedFilters,
    hasInvalidFilter,
    shouldAppendDates,
    isAutoFetchEnabled
  } = useCallFilters()
  const { fetchCalls } = useFetchCalls();

  // 01 Fetching Call logs and filtering
  const queryKey = JSON.stringify(retrievedFilters)
  const { data, isFetching, isError } = useQuery<
    AxiosResponse<ICallLogs>
  >({
    queryKey: ["calls", queryKey],
    queryFn: () => fetchCalls({ ...retrievedFilters }),
    enabled: isAutoFetchEnabled
  });

  useEffect(() => {
    // Append start and end dates onto the URL
    if (shouldAppendDates) {
      // Convert ISO to Locale
      const startDate = getDateString(operateOnDays(undefined, -7), "ISO") // 7 days ago
      const endDate = getDateString(operateOnDays(), "ISO") // now
      updateUrlParams({ startDate, endDate })
    }

    // Redirect to /400
    if (hasInvalidFilter) {
      window.location.href = "/400";
      return;
    }
  }, [retrievedFilters, operateOnDays, updateUrlParams, getDateString])


  // 02 Audio Player
  const [activeCallId, setActiveCallId] = useState<string | number | null>(
    null
  );
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

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
    <div className="flex flex-col gap-6 sm:gap-12">
      <CallListFilters retrievedFilters={retrievedFilters} />
      <CallList
        calls={data?.data}
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
