"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  Download,
  Pause,
  Play,
  Redo,
  Undo,
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
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  playing,
  onPlayPause,
  onClose,
}) => {
  const [played, setPlayed] = useState(0);
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
      if (newProgress < 0) newProgress = 0;
      if (newProgress > 1) newProgress = 1;
      setDragProgress(newProgress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateDragProgress(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateDragProgress(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      const newTime = (isDragging ? dragProgress : played) * duration;
      if (playerRef.current) {
        playerRef.current.seekTo(newTime, "seconds");
      }
      setPlayed(dragProgress);
    }
  };

  // Event listeners for Audio dragging.
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragProgress, duration]);

  return (
    // <div className="w-full bg-white p-4 rounded-lg shadow-lg flex flex-col relative mt-10">
    <div className="fixed bottom-0 left-0  right-0 bg-white p-4 shadow-lg flex flex-col z-50">
      {/* {error && (
        <div className="flex justify-center text-red-500 text-center mt-2">
          {error}
        </div>
      )} */}
      {/* Progress Bar */}
      <div
        className="w-full bg-gray-200 h-2 rounded relative cursor-pointer"
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded"
          style={{
            width: `${(isDragging ? dragProgress : played) * 100}%`,
          }}
        />
        {/* Draggable Handle */}
        <div
          className="absolute top-[-4px] w-4 h-4 bg-green-500 rounded-full cursor-pointer"
          style={{
            left: `calc(${(isDragging ? dragProgress : played) * 100}% - 8px)`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 text-gray-700 w-full">
        <div className="flex items-center gap-4">
          <button onClick={onPlayPause} className="text-xl">
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
          >
            <Undo />
          </button>
          <button
            onClick={() => {
              if (playerRef.current) {
                playerRef.current.seekTo(
                  playerRef.current.getCurrentTime() + 10
                );
              }
            }}
          >
            <Redo />
          </button>
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button onClick={() => setMuted(!muted)}>{getVolumeIcon()}</button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-32 h-1 bg-gray-300 rounded appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Time Display */}
        <span className="text-sm flex-1 text-center">
          {formatTime((isDragging ? dragProgress : played) * duration)} /{" "}
          {formatTime(duration)}
        </span>

        {/* Playback Speed Control */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setShowSpeedOptions(!showSpeedOptions)}>
              {playbackRate}x
            </button>
            {showSpeedOptions && (
              <div className="absolute bg-white shadow-md rounded-md p-2 bottom-full mb-1 left-0 flex flex-col gap-1">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`px-3 py-1 text-sm hover:bg-gray-200 ${
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
          <a href={url} download className="cursor-pointer">
            <Download className="h-5 w-5 text-blue-500" />
          </a>

          {/* Close Button */}
          <div
            className="flex items-center text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <X className="cursor-pointer text-red-500" />
            <span>Close</span>
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
