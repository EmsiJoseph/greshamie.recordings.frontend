import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IActivity, IActivityResponse } from "@/lib/interfaces/activity-interface";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import ActivityListSkeleton from "@/components/presentational/activity-list-skeleton";
import ActivityListPagination, { Pagination } from "@/components/common/pagination";
import ActivityIcon from "./activity-type-with-icon";
import { formatDate } from "@/lib/utils/format-date";
import { eventDirectionIcons } from "@/constants/activity-types";
interface ActivityListProps {
  activities?: IActivity[];
  isFetching: boolean;
}

export const ActivityList = ({ activities, isFetching }: ActivityListProps) => {
  // const [page, setPage] = React.useState(activities?.pageOffset);
  // const [totalPages, setTotalPages] = React.useState(activities?.totalPages);
  // const [hasPrevious, setHasPrevious] = React.useState(activities?.hasPrevious);
  // const [hasNext, setHasNext] = React.useState(activities?.hasNext);

  // const handlePageChange = (newPage?: number) => {
  //   if (!newPage) return;
  //   setPage(newPage);
  // };


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

                <TableCell className="flex items-center gap-2">
                  { 
                    <>
                      {React.createElement(
                        eventDirectionIcons[activity.eventName.toUpperCase()]
                          .icon,
                        {
                          className:
                            eventDirectionIcons[
                              activity.eventName.toUpperCase()
                            ].colorClass,
                          size: 20,
                        }
                      )}
                      <span
                        className={
                          eventDirectionIcons[activity.eventName.toUpperCase()]
                            .colorClass
                        }
                      >
                        {
                          eventDirectionIcons[activity.eventName.toUpperCase()]
                            .value
                        }
                      </span>
                    </>
                  }
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
{/* 
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};
