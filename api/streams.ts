// streams.ts
import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { AxiosResponse } from "axios";
import { streamRecordingEndpoint } from "./endpoints/call-logs-endpoints";


export const fetchStreamingUrl = async (
  call: ICall
): Promise<AxiosResponse<ICallLogs>> => {
  const params = new URLSearchParams();
  params.append("id", String(call.id));
  params.append("caller", call.caller);
  params.append("receiver", call.receiver);
  params.append(
    "startDateTime",
    call.startDateTime instanceof Date ? call.startDateTime.toISOString() : call.startDateTime
  );
  params.append(
    "endDateTime",
    call.endDateTime instanceof Date ? call.endDateTime.toISOString() : call.endDateTime
  );
  params.append("callType", call.callType);
  params.append("durationSeconds", String(call.durationSeconds));
  params.append("recorder", call.recorder);

  const finalEndpoint = `${streamRecordingEndpoint}?${params.toString()}`;
  console.log("Final streaming URL endpoint:", finalEndpoint);

  return await GreshamAxiosConfig.get(finalEndpoint);
};
