import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICall } from "@/lib/interfaces/call-interface";
import CallListSkeleton from "@/components/presentational/call-list-skeleton";
import {
  MoveDownLeft,
  MoveUpRight,
  ArrowRightLeft,
  Pause,
  CirclePlay,
} from "lucide-react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

interface CallListProps {
  calls?: ICall[];
  isFetching?: boolean;
  onPlayAudio?: (url: string | null) => void;
}

const callLabels: Record<string, string> = {
  INCOMING: "Incoming",
  OUTGOING: "Outgoing",
  INTERNAL: "Internal",
};

const callIcons: Record<string, { icon: any; colorClass: string }> = {
  INCOMING: { icon: MoveDownLeft, colorClass: "text-green-700" },
  OUTGOING: { icon: MoveUpRight, colorClass: "text-orange-700" },
  INTERNAL: { icon: ArrowRightLeft, colorClass: "text-blue-700" },
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const CallList = ({ calls, isFetching, onPlayAudio }: CallListProps) => {
  const queryClient = useQueryClient();
  const currentAudioUrl = queryClient.getQueryData<string | null>([
    "currentAudio",
  ]);

  if (isFetching) {
    return <CallListSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Caller</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Call Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Recorder</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  {call.date instanceof Date
                    ? call.date.toLocaleString()
                    : call.date}
                </TableCell>
                <TableCell>{call.caller}</TableCell>
                <TableCell>{call.receiver}</TableCell>
                <TableCell>
                  {call.callType && callIcons[call.callType] ? (
                    <div
                      className={`flex items-center ${
                        callIcons[call.callType].colorClass
                      }`}
                    >
                      {React.createElement(callIcons[call.callType].icon, {
                        className: "h-5 w-5",
                      })}
                      <span className="ml-2 font-bold">
                        {callLabels[call.callType] || "Unknown Action"}
                      </span>
                    </div>
                  ) : (
                    <span>No Action</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (call.streamingUrl) {
                          onPlayAudio &&
                            onPlayAudio(
                              currentAudioUrl === call.streamingUrl
                                ? null
                                : call.streamingUrl
                            );
                        }
                      }}
                      className="text-gray-700 cursor-pointer"
                    >
                      {currentAudioUrl === call.streamingUrl ? (
                        <Pause className="h-5 w-5 text-blue-500" />
                      ) : (
                        <CirclePlay className="h-5 w-5 text-green-500" />
                      )}
                    </button>

                    <span>{formatDuration(call.duration)}</span>
                  </div>
                </TableCell>
                <TableCell>{call.recorder}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
