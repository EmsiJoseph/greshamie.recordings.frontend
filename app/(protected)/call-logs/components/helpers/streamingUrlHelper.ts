// api/streaming.ts
import { ICall } from "@/lib/interfaces/call-interface";

export async function fetchStreamingUrl(call: ICall): Promise<string> {
  const params = new URLSearchParams();

  // Append all required parameters from the call record.
  params.append("id", String(call.id));
  params.append("caller", call.caller);
  params.append("receiver", call.receiver);
  // Ensure you send a proper string (e.g. ISO string) for dates
  params.append(
    "startDateTime",
    call.startDateTime instanceof Date
      ? call.startDateTime.toISOString()
      : call.startDateTime
  );
  params.append(
    "endDateTime",
    call.endDateTime instanceof Date
      ? call.endDateTime.toISOString()
      : call.endDateTime
  );
  params.append("callType", call.callType);
  params.append("isLive", String(call.isLive));
  params.append("durationSeconds", String(call.durationSeconds));
  params.append("recorder", call.recorder);

  const response = await fetch(`/api/v1.0/blobrecording/stream?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Error fetching streaming URL");
  }
  const data = await response.json();

  // Assume your API returns an object like { streamingUrl: "..." }
  return data.streamingUrl;
}
