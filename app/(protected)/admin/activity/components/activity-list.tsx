import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IActivity } from "@/lib/interfaces/activity-interface";

interface ActivityListProps {
  activities?: IActivity[]
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Recording Item</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activities && activities.length > 0 ? (
                      activities.map((activity) => (
                        <TableRow key={activity.id}>
                          {Object.keys(activity).map((key) => {
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
                        </TableRow>
                      ))
          
                    ) : (
                      <TableRow>
                        <TableCell
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
        </TableBody>
      </Table>
    </div>
  )
}
