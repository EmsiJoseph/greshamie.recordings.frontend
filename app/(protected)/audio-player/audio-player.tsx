"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  Download,
  Pause,
  Play,
  RedoDot,
  UndoDot,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

interface AudioPlayerProps {
  url: string;
  playing: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  downloadUrl?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  playing,
  onPlayPause,
  onClose,
  downloadUrl,
}) => {
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [url]);

  const handleProgress = (state: { played: number }) => {
    if (!isDragging) {
      setPlayed(state.played);
    }
  };

  const handlePlayerError = (err: any) => {
    setError(
      "Error fetchhing audio file, please try again later or contact an Administrator."
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedOptions(false);
  };

  const getVolumeIcon = () => {
    if (muted || volume === 0) return <VolumeX />;
    if (volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };

  // DRAG-TO-SEEK HANDLERS
  const updateDragProgress = (clientX: number) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      let newProgress = (clientX - rect.left) / rect.width;
      newProgress = Math.max(0, Math.min(newProgress, 1));
      setDragProgress(newProgress);
    }
  };

  const handleStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updateDragProgress(clientX);
  };

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateDragProgress(clientX);
    },
    [isDragging]
  );

  const handleEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      const newTime = dragProgress * duration;
      if (playerRef.current) {
        playerRef.current.seekTo(newTime, "seconds");
      }
      setPlayed(dragProgress);
    }
  }, [isDragging, dragProgress, duration]);

  // Event listeners for Audio dragging.
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, dragProgress, duration, handleMove, handleEnd]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-2 md:p-4 shadow-lg flex flex-col z-50">
      {/* Progress Bar */}
      <div
        className="w-full bg-gray-200 h-2 rounded relative cursor-pointer"
        ref={progressBarRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded"
          style={{
            width: `${(isDragging ? dragProgress : played) * 100}%`,
          }}
        />
        {/* Draggable Handle */}
        <div
          className="absolute top-[-4px] bg-green-500 rounded-full cursor-pointer 
                     w-3 h-3 md:w-4 md:h-4"
          style={{
            left: `calc(${(isDragging ? dragProgress : played) * 100}% - 8px)`,
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 text-gray-700 w-full">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onPlayPause} className="text-base md:text-xl">
            {playing ? <Pause /> : <Play />}
          </button>
          <button
            onClick={() => {
              if (playerRef.current) {
                playerRef.current.seekTo(
                  playerRef.current.getCurrentTime() - 10
                );
              }
            }}
            className="text-base md:text-xl"
          >
            <UndoDot />
          </button>
          <button
            onClick={() => {
              if (playerRef.current) {
                playerRef.current.seekTo(
                  playerRef.current.getCurrentTime() + 10
                );
              }
            }}
            className="text-base md:text-xl"
          >
            <RedoDot />
          </button>
          {/* Volume Control */}
          <div className="relative flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="text-base md:text-xl"
            >
              {getVolumeIcon()}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-12 md:w-20 h-1 bg-gray-300 rounded appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Time Display */}
        <span className="text-xs md:text-sm flex-1 text-center">
          {formatTime((isDragging ? dragProgress : played) * duration)} /{" "}
          {formatTime(duration)}
        </span>

        {/* Playback Speed Control */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <button
              onClick={() => setShowSpeedOptions(!showSpeedOptions)}
              className="text-xs md:text-sm"
            >
              {playbackRate}x
            </button>
            {showSpeedOptions && (
              <div className="absolute bg-white shadow-md rounded-md p-2 bottom-full mb-1 left-0 flex flex-col gap-1">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`px-2 py-1 text-xs md:text-sm hover:bg-gray-200 ${
                      playbackRate === rate ? "font-bold" : ""
                    }`}
                    onClick={() => handlePlaybackRateChange(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Button */}
          <a
            href={downloadUrl || "#"}
            download={`call-recording-${new Date().toISOString()}.mp3`}
            className={`cursor-pointer ${
              downloadUrl ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <Download className="h-4 w-4 md:h-5 md:w-5 text-black-500" />
          </a>

          {/* Close Button */}
          <div
            className="flex items-center text-red-500 cursor-pointer gap-1"
            onClick={onClose}
          >
            <X className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
            <span className="text-xs md:text-sm">Close</span>
          </div>
        </div>
      </div>

      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={(d) => setDuration(d)}
        onError={handlePlayerError}
        width="100%"
        height="0px"
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      />
    </div>
  );
};

export default AudioPlayer;
