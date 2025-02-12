import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";
import { EllipsisVertical, Trash2, Download, LogIn, Play, LogOut } from "lucide-react";
import React from "react";
import ActivityListSkeleton from "@/components/presentational/activity-list-skeleton";
import ActivityListPagination from "@/components/presentational/activity-list-pagination";

interface ActivityListProps {
  activities?: IActivity[];
  isFetching: boolean;
}


// Map raw eventName types to display-friendly labels
const activityLabels: Record<string, string> = {
  STARTED: "Session Started",
  PLAYED: "Recording Played",
  ENDED: "Session Ended",
  EXPORTED: "Recording Exported",
  DELETED: "Recording Deleted",
};

const activityIcons: Record<string, { icon: React.ElementType; colorClass: string }> = {
  STARTED: { icon: LogIn, colorClass: "text-green-700" },
  PLAYED: { icon: Play, colorClass: "text-cyan-700" },
  ENDED: { icon: LogOut, colorClass: "text-red-500" },
  EXPORTED: { icon: Download, colorClass: "text-yellow-600" },
  DELETED: { icon: Trash2, colorClass: "text-red-700" },
};

export const ActivityList = ({ activities, isFetching }: ActivityListProps) => {

  const [page, setPage] = React.useState(1); // Should be in getUrlParams

  const totalPages = 5; // Temporary total pages

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }
  
  if (isFetching) {
    return <ActivityListSkeleton />;
  }

  console.log("ACTIVITIES", activities);

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Recording Item</TableHead>
            <TableHead>Action</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.timestamp instanceof Date ? activity.timestamp.toLocaleString() : activity.timestamp}</TableCell>
                <TableCell>{activity.userName}</TableCell>
                <TableCell>{activity.recordingItem}</TableCell>

                {/* Action column with icon and readable label */}
                <TableCell>
                  {activity.eventName && activityIcons[activity.eventName] ? (
                    <div className={`flex items-center ${activityIcons[activity.eventName].colorClass}`}>
                      {React.createElement(activityIcons[activity.eventName].icon, {
                        className: "h-5 w-5",
                      })}
                      <span className="ml-2 font-bold">{activityLabels[activity.eventName] || "Unknown Action"}</span>
                    </div>
                  ) : (
                    <span>No Action</span> 
                  )}
                </TableCell>

                {/* Ellipsis (Actions column) */}
                <TableCell>
                  <EllipsisVertical className="h-4" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <ActivityListPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};
