import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import ActivityListSkeleton from "@/components/presentational/activity-list-skeleton";
import ActivityListPagination from "@/components/presentational/activity-list-pagination";
import ActivityIcon from "./activity-type-with-icon";
import { formatDate } from "@/lib/utils/format-date";

interface ActivityListProps {
  activities?: IActivity[];
  isFetching: boolean;
}

export const ActivityList = ({ activities, isFetching }: ActivityListProps) => {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
                <TableCell>
                  {formatDate(activity.timestamp)}
                </TableCell>
                <TableCell>{activity.userName}</TableCell>

                {/* Render the ActivityIcon component */}
                <TableCell>
                  <ActivityIcon eventName={activity.eventName} />
                </TableCell>

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

      <ActivityListPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
