import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";
import { EllipsisVertical, MousePointerClick, Plus, Trash2, Download } from "lucide-react";
import React from "react";
import ActivityListSkeleton from "@/components/presentational/activity-list-skeleton";

interface ActivityListProps {
  activities?: IActivity[];
  isFetching: boolean;
}

const activityIcons: Record<string, { icon: any, colorClass: string }> = {
  EXPORTED: { icon: Download, colorClass: "text-blue-700" },
  CREATED: { icon: Plus, colorClass: "text-green-700" },
  DELETED: { icon: Trash2, colorClass: "text-orange-700" },
  ACCESSED: { icon: MousePointerClick, colorClass: "text-slate-700" },
};

const capitalizeFirstLetter = (text: string) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ActivityList = ({ activities, isFetching }: ActivityListProps) => {
  if (isFetching) {
    return <ActivityListSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
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
              <TableRow key={activity.date.toString()}> {/* Use a different key since id is removed */}
                <TableCell>{activity.date instanceof Date ? activity.date.toLocaleString() : activity.date}</TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>{activity.recordingItem}</TableCell>

                {/* Action column with icon */}
                <TableCell>
                  {activity.action && activityIcons[activity.action] ? (
                    <div className={`flex items-center ${activityIcons[activity.action].colorClass}`}>
                      {React.createElement(activityIcons[activity.action].icon, {
                        className: "h-5 w-5",
                      })}
                      <span className="ml-2 font-bold">{capitalizeFirstLetter(activity.action)}</span>
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
    </div>
  );
};
