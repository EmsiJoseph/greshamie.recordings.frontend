import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICall } from "@/lib/interfaces/call-interface"

interface CallListProps {
  calls?: ICall[]
  isFetching?: boolean
}

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
