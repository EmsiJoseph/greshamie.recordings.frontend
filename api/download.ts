// streams.ts
import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICall, ICallLogs } from "@/lib/interfaces/call-interface";
import { AxiosResponse } from "axios";
import { downloadRecordingEndpoint } from "./endpoints/call-logs-endpoints";

export const fetchDownloadUrl = async (
  call: ICall
): Promise<AxiosResponse<ICallLogs>> => {
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

  const finalEndpoint = `${downloadRecordingEndpoint}?${params.toString()}`;

  return await GreshamAxiosConfig.get(finalEndpoint);
};
