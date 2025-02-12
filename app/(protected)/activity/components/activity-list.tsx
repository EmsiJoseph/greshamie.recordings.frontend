import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";
import React from "react";
import ActivityListSkeleton from "@/components/presentational/activity-list-skeleton";
import { formatDate } from "@/lib/utils/format-date";
import { EventTypeWithIcon } from "./activity-type-with-icon";
import { EllipsisVertical } from "lucide-react";

interface ActivityListProps {
  activities?: IActivity[];
  isFetching: boolean;
}

export const ActivityList = ({ activities, isFetching }: ActivityListProps) => {
  if (isFetching) {
    return <ActivityListSkeleton />;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{formatDate(activity.timestamp)}</TableCell>
                <TableCell>{activity.userName}</TableCell>

                {/* Use EventTypeWithIcon component */}
                <TableCell>
                  <EventTypeWithIcon eventType={activity.eventName} />
                </TableCell>

                <TableCell>
                  <EllipsisVertical className="h-4" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
