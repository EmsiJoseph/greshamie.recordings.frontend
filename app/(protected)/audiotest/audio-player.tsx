"use client";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaUndo,
  FaVolumeUp,
  FaVolumeMute,
  FaVolumeDown,
  FaDownload,
  FaStar,
  FaShare,
  FaTimes,
} from "react-icons/fa";

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  if (!isVisible) return null; // Hide player when closed

  const handlePlayPause = () => setPlaying(!playing);

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
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
    if (muted || volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg flex flex-col relative">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded relative">
        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded"
          style={{ width: `${played * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 text-gray-700 w-full">
        {/* Left Controls */}
        <div className="flex items-center gap-4">
          <button onClick={handlePlayPause} className="text-xl">
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => handleSeek(-10)}>
            <FaUndo />
          </button>
          <button onClick={() => handleSeek(10)}>
            <FaRedo />
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
          {formatTime(played * duration)} / {formatTime(duration)}
        </span>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Playback Speed Control */}
          <div className="relative">
            <button onClick={() => setShowSpeedOptions(!showSpeedOptions)}>
              {playbackRate}x
            </button>
            {showSpeedOptions && (
              <div className="absolute bg-white shadow-md rounded-md p-2 top-full mt-1 right-0">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`block px-3 py-1 w-full text-left text-sm hover:bg-gray-200 ${
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

          <FaShare className="cursor-pointer" />
          <FaDownload className="cursor-pointer" />
          <FaStar className="cursor-pointer" />
           {/* Close Button */}
           <div className="flex items-center text-red-500 cursor-pointer" onClick={() => setIsVisible(false)}>
            <FaTimes className="cursor-pointer text-red-500" />
            <span>Close</span>
          </div>
        </div>
      </div>

      {/* Hidden React Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={(d) => setDuration(d)}
        width="100%"
        height="0px"
      />
    </div>
  );
};

export default AudioPlayer;
