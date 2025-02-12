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
import { useQueryClient } from "@tanstack/react-query";
import { formatDurationToHours } from "@/lib/utils/format-duration";
import { CallTypeWithIcon } from "./call-type-with-icon";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface CallListProps {
  calls?: ICall[];
  isFetching?: boolean;
  onPlayAudio?: (url: string | null) => void;
}

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
              <TableRow key={call?.id}>
                <TableCell>{call?.caller}</TableCell>
                <TableCell>{call?.receiver}</TableCell>
                <TableCell>
                  {call?.startDateTime instanceof Date
                    ? call?.startDateTime.toLocaleString()
                    : call?.startDateTime}
                </TableCell>
                <TableCell>
                  {call?.endDateTime instanceof Date
                    ? call?.endDateTime.toLocaleString()
                    : call?.endDateTime}
                </TableCell>
                <TableCell><CallTypeWithIcon callType={call?.callType} /></TableCell>

                <TableCell>{call?.isLive ? "True" : "False"}</TableCell>
                <TableCell>{formatDurationToHours(call.durationSeconds)}</TableCell>
                <TableCell>{call.recorder}</TableCell>
                {/* <TableCell>
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

                    <span>{formatDuration(call.durationSeconds)}</span>
                  </div>
                </TableCell> */}
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
