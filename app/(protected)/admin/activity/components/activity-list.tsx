import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";
import { EllipsisVertical, MousePointerClick, Plus, Trash2, Download } from "lucide-react";
import React from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
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
                {/* Checkbox column */}
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>

                {/* Other columns */}
                {Object.keys(activity).map((key) => {
                  if (key === "action") return null; // Skip the action column
                  
                  const value = activity[key as keyof IActivity];

                  // Handle Date type (convert to string)
                  if (value instanceof Date) {
                    return (
                      <TableCell key={key}>
                        {value.toLocaleString()}
                      </TableCell>
                    );
                  }

                  // For other types (string, number), simply render them
                  return (
                    <TableCell key={key}>
                      {key === "duration" ? `${value} minutes` : value}
                    </TableCell>
                  );
                })}

                {/* Action column with color and icon */}
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
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
