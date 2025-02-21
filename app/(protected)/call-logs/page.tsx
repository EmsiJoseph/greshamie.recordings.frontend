"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useFetchCalls } from "@/api/calls";
import {
  ICall,
  ICallFilters,
  ICallLogs,
} from "@/lib/interfaces/call-interface";
import { CallList } from "./components/call-list";
import { CallListFilters } from "./components/filters/call-list-filters";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import AudioPlayer from "../audio-player/audio-player";
import { fetchStreamingUrl } from "@/api/streams";
import { fetchDownloadUrl } from "@/api/download";
import { useCallFilters } from "./lib/use-call-filters";
import { useUpdateUrlParams } from "@/hooks/use-url-params";
import { getDateString, operateOnDays } from "@/lib/utils/date-utils";

type AudioData = {
  streamingUrl: string | null;
  downloadUrl: string | null;
};

export default function CallLogPage() {
  const { updateUrlParams } = useUpdateUrlParams();
  const {
    retrievedFilters,
    queryKey,
    hasInvalidFilter,
    shouldAppendDefaultParams,
    isAutoFetchEnabled,
  } = useCallFilters();
  const { fetchCalls } = useFetchCalls();

  // 01 Fetching Call logs and filtering
  const qKeyStr = JSON.stringify(queryKey);
  const { data, isFetching, isError } = useQuery<AxiosResponse<ICallLogs>>({
    queryKey: ["calls", qKeyStr],
    queryFn: () => fetchCalls({ ...queryKey }),
    enabled: isAutoFetchEnabled,
  });

  useEffect(() => {
    // Append start and end dates onto the URL
    if (shouldAppendDefaultParams) {
      // Convert ISO to Locale
      const startDate = getDateString(operateOnDays(undefined, -7), "ISO"); // 7 days ago
      const endDate = getDateString(operateOnDays(), "ISO"); // now
      const pageOffSet = 1;
      const pageSize = 10;

      let defaultParams: ICallFilters = {};
      defaultParams["startDate"] = retrievedFilters.startDate
        ? retrievedFilters.startDate
        : startDate;
      defaultParams["endDate"] = retrievedFilters.endDate
        ? retrievedFilters.endDate
        : endDate;
      defaultParams["pageOffSet"] = retrievedFilters.pageOffSet
        ? retrievedFilters.pageOffSet
        : pageOffSet;
      defaultParams["pageSize"] = retrievedFilters.pageSize
        ? retrievedFilters.pageSize
        : pageSize;

      updateUrlParams(defaultParams);
    }

    // Redirect to /400
    if (hasInvalidFilter) {
      window.location.href = "/400";
      return;
    }
  }, [
    shouldAppendDefaultParams,
    hasInvalidFilter,
    operateOnDays,
    updateUrlParams,
    getDateString,
  ]);

  // Append the pagination data after a fetch
  useEffect(() => {
    if (data?.data) {
      const pagination = { ...data?.data };
      delete pagination.items;

      const pageOffSet = pagination?.pageOffSet
        ? pagination?.pageOffSet + 1
        : 1;
      pagination.pageOffSet = pageOffSet;

      updateUrlParams(pagination);
    }
  }, [data?.data]);

  // 02 Audio Player
  const [activeCallId, setActiveCallId] = useState<string | number | null>(
    null
  );
  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [, setAudioFetching] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [fetchingCallId, setFetchingCallId] = useState<string | number | null>(
    null
  );

  // Unified mutation for fetching streaming and download URLs
  const fetchAudioData = useMutation({
    mutationKey: ["audioData"],
    mutationFn: async (call: ICall | null): Promise<AudioData | null> => {
      if (!call) return null;
      setAudioFetching(true);
      setFetchingCallId(call.id);
  
      const MAX_RETRIES = 3;
      let attempt = 0;
  
      while (attempt < MAX_RETRIES) {
        try {
          const [streamingResponse, downloadResponse] = await Promise.all([
            fetchStreamingUrl(call),
            fetchDownloadUrl(call),
          ]);
  
          return {
            streamingUrl: streamingResponse.data.streamingUrl ?? null,
            downloadUrl: downloadResponse.data.downloadUrl ?? null,
          };
        } catch (error) {
          attempt++;
  
          if (attempt >= MAX_RETRIES) {
            handleApiClientSideError({
              error: "Failed to fetch audio after multiple attempts. Please try again later.",
              isSuccessToast: false,
            });
            return null;
          }
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 500));
        }
      }
  
      return null;
    },
    onSuccess: (data, variables) => {
      setAudioData(null);
      setAudioPlaying(false);
      setAudioReady(false);
  
      setTimeout(() => {
        setAudioData(data);
        setAudioReady(true);
        setAudioPlaying(true);
  
        if (variables) {
          setActiveCallId(variables.id);
        } else {
          setActiveCallId(null);
        }
      });
    },
    onError: () => {
      setAudioFetching(false);
      setFetchingCallId(null);
    },
    onSettled: () => {
      setAudioFetching(false);
      setFetchingCallId(null);
    },
  });
  

  useEffect(() => {
    if (audioData?.streamingUrl && audioReady) {
      setAudioPlaying(true);
    }

    if (isError) {
      handleApiClientSideError({
        error: "Something went wrong. Try again later.",
        isSuccessToast: false,
      });
    }
  }, [audioData?.streamingUrl, audioReady, isError]);

  const toggleAudio = () => {
    setAudioPlaying((prev) => !prev);
  };

  const handleAudioClose = () => {
    setAudioData(null);
    setActiveCallId(null);
    setAudioPlaying(false);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-5">
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
        fetchingCallId={fetchingCallId}
        onToggleAudio={toggleAudio}
      />

      {audioReady && audioData?.streamingUrl && (
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
