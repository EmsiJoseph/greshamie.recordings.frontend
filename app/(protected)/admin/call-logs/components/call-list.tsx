import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICall } from "@/lib/interfaces/call-interface"
import { MoveDownLeft, MoveUpRight, ArrowRightLeft } from "lucide-react";
import React from "react";

interface CallListProps {
  calls?: ICall[]
  isFetching?: boolean
}

const callIcons: Record<string, { icon: any, colorClass: string }> = {
  INCOMING: { icon: MoveDownLeft, colorClass: "text-green-700" },
  OUTGOING: { icon: MoveUpRight, colorClass: "text-orange-700" },
  INTERNAL: { icon: ArrowRightLeft, colorClass: "text-blue-700" },
};

const capitalizeFirstLetter = (text: string) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const CallList = ({ calls, isFetching }: CallListProps) => {
  if (isFetching) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Caller</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Call Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Recorder</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {calls && calls.length > 0 ? (
            calls.map((call) => (
              <TableRow key={call.id}>
                {Object.keys(call).map((key) => {
                  const value = call[key as keyof ICall];

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

                {/* Call Type column with icon and color */}
                <TableCell>
                  {call.callType && callIcons[call.callType] ? (
                    <div className={`flex items-center ${callIcons[call.callType].colorClass}`}>
                      {React.createElement(callIcons[call.callType].icon, {
                        className: "h-5 w-5",
                      })}
                      <span className="ml-2 font-bold">{capitalizeFirstLetter(call.callType)}</span>
                    </div>
                  ) : (
                    <span>No Action</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
