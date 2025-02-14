// streams.ts
import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { AxiosResponse } from "axios";
import { streamRecordingEndpoint } from "./endpoints/call-logs-endpoints";

export const fetchStreamingUrl = async (
  call: ICall
): Promise<AxiosResponse<ICallLogs>> => {
  // let parsedCall: ICall = {} as ICall;
//   let hasNoValue = false;
//   Object.entries(call).some(([key, value]) => {
//     if (["isLive", "downloadUrl", "streamingUrl"].includes(key)) return false; // Skip these keys
  
//     if (!value) {
//       hasNoValue = true; // Found a falsy value
//       return true; 
//     }
//     parsedCall = { ...parsedCall, [key]: value };
//     return false; 
//   });

//   if (hasNoValue) {
//     return {
//       data: {} as ICallLogs, // Empty response body
//       status: 400, // No Content
//       statusText: "Bad Request",
//       headers: { "Content-Type": "application/json" }, // Custom headers
//       config: {}, // Required for AxiosResponse structure
//     } as AxiosResponse<ICallLogs>;
//   }


  const params = new URLSearchParams();
  params.append("id", String(call.id));
  params.append("caller", call.caller);
  params.append("receiver", call.receiver);
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
  params.append("durationSeconds", String(call.durationSeconds));
  params.append("recorder", call.recorder);

  const finalEndpoint = `${streamRecordingEndpoint}?${params.toString()}`;

  return await GreshamAxiosConfig.get(finalEndpoint);
};
