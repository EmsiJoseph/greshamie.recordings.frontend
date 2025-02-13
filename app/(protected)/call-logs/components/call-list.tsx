import React, { useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import { formatDurationToHours } from "@/lib/utils/format-duration";
import { CallTypeWithIcon } from "./call-type-with-icon";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils/format-date";
import { CirclePlay, Pause } from "lucide-react";

interface CallListProps {
  calls?: ICall[];
  isFetching?: boolean;
  onPlayAudio?: (call: ICall | null) => void;
  activeCallId?: string | number | null;
  audioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const CallList = ({
  calls,
  isFetching,
  onPlayAudio,
  activeCallId,
  audioPlaying,
  onToggleAudio,
}: CallListProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ICall;
    direction: string;
  } | null>(null);

  const sortedCalls = React.useMemo(() => {
    if (!calls) return [];
    if (!sortConfig) return calls;

    const sorted = [...calls].sort((a, b) => {
      let aValue = a[sortConfig.key as keyof ICall];
      let bValue = b[sortConfig.key as keyof ICall];

      if (
        sortConfig.key === "startDateTime" ||
        sortConfig.key === "endDateTime"
      ) {
        aValue = typeof aValue === "boolean" ? 0 : new Date(aValue).getTime();
        bValue = typeof bValue === "boolean" ? 0 : new Date(bValue).getTime();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [calls, sortConfig]);

  const requestSort = (key: keyof ICall) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  if (isFetching) {
    return <CallListSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort("caller")}>
              Caller {getSortIcon("caller")}
            </TableHead>
            <TableHead onClick={() => requestSort("receiver")}>
              Receiver {getSortIcon("receiver")}
            </TableHead>
            <TableHead onClick={() => requestSort("startDateTime")}>
              Start Date {getSortIcon("startDateTime")}
            </TableHead>
            <TableHead onClick={() => requestSort("endDateTime")}>
              End Date {getSortIcon("endDateTime")}
            </TableHead>
            <TableHead onClick={() => requestSort("callType")}>
              Call Direction {getSortIcon("callType")}
            </TableHead>
            <TableHead onClick={() => requestSort("isLive")}>
              Is Live {getSortIcon("isLive")}
            </TableHead>
            <TableHead onClick={() => requestSort("durationSeconds")}>
              Duration (s) {getSortIcon("durationSeconds")}
            </TableHead>
            <TableHead onClick={() => requestSort("recorder")}>
              Recorder {getSortIcon("recorder")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedCalls && sortedCalls.length > 0 ? (
            sortedCalls.map((call) => (
              <TableRow key={call?.id}>
                <TableCell>{call?.caller}</TableCell>
                <TableCell>{call?.receiver}</TableCell>
                <TableCell>{formatDate(call?.startDateTime)}</TableCell>
                <TableCell>{formatDate(call?.endDateTime)}</TableCell>
                <TableCell>
                  <CallTypeWithIcon callType={call?.callType} />
                </TableCell>
                <TableCell>{call?.isLive ? "True" : "False"}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        console.log("Play button clicked for call:", call.id);
                        if (activeCallId === call.id) {
                          onToggleAudio && onToggleAudio();
                        } else {
                          onPlayAudio && onPlayAudio(call);
                        }
                      }}
                      className="text-gray-700 cursor-pointer"
                    >
                      {activeCallId === call.id && audioPlaying ? (
                        <Pause className="h-5 w-5 text-blue-500" />
                      ) : (
                        <CirclePlay className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                    <span>{formatDurationToHours(call.durationSeconds)}</span>
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
