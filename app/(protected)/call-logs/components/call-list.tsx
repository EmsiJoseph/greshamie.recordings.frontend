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
import React from "react";
import { formatDurationToHours } from "@/lib/utils/format-duration";
import { CallTypeWithIcon } from "./call-type-with-icon";
import { formatDate } from "@/lib/utils/format-date";
import {
  ArrowRightLeft,
  CirclePlay,
  MoveDownLeft,
  MoveUpRight,
  Pause,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { capitalizeFirstLetter } from "@/lib/utils/format-text";

interface CallListProps {
  calls?: ICall[];
  isFetching?: boolean;
  onPlayAudio?: (call: ICall | null) => void;
  // activeCallId tells which call is currently playing
  activeCallId?: string | number | null;
}

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

export const CallList = ({
  calls,
  isFetching,
  onPlayAudio,
  activeCallId,
}: CallListProps) => {
  if (isFetching) {
    return <CallListSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Caller</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Call Direction</TableHead>
            <TableHead>Is Live</TableHead>
            <TableHead>Duration (s)</TableHead>
            <TableHead>Recorder</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{call.caller}</TableCell>
                <TableCell>{call.receiver}</TableCell>
                <TableCell>{formatDate(call.startDateTime)}</TableCell>
                <TableCell>{formatDate(call.endDateTime)}</TableCell>
                <TableCell>
                  <CallTypeWithIcon callType={call.callType} />
                </TableCell>
                <TableCell>{call.isLive ? "True" : "False"}</TableCell>
                <TableCell>{formatDurationToHours(call.durationSeconds)}</TableCell>
                <TableCell>{call.recorder}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        console.log("Play button clicked for call:", call.id);
                        // Toggle play/pause:
                        // If this call is already active (its streaming URL is current),
                        // then pass null to pause the audio.
                        // Otherwise, pass the call so the parent fetches its streaming URL.
                        if (activeCallId === call.id) {
                          onPlayAudio && onPlayAudio(null);
                        } else {
                          onPlayAudio && onPlayAudio(call);
                        }
                      }}
                      className="text-gray-700 cursor-pointer"
                    >
                      {activeCallId === call.id ? (
                        <Pause className="h-5 w-5 text-blue-500" />
                      ) : (
                        <CirclePlay className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                    <span>{formatDuration(call.durationSeconds)}</span>
                  </div>
                </TableCell>
                <TableCell>{call.recorder}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
