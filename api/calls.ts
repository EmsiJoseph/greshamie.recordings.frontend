import { ICallFilters } from "@/lib/interfaces/call-interface";
import { sampleCalls } from "./sample-data/calls";

export const sampleFetchCalls = async (options?: ICallFilters) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredCalls = sampleCalls;

    if (options?.callType) {
        filteredCalls = filteredCalls.filter((call) => {
            return call.callType === options.callType;
        });
    }

    if (options?.minDuration) {
        filteredCalls = filteredCalls.filter((call) => {
            return call.duration >= (options.minDuration as number);
        });
    }

    if (options?.maxDuration) {
        filteredCalls = filteredCalls.filter((call) => {
            return call.duration <= (options.maxDuration as number);
        });
    }

    if (options?.search) {
        filteredCalls = filteredCalls.filter((call) => {
            const searchTerm = options.search!.toLowerCase();
            return (
                call.caller.toLowerCase().includes(searchTerm) ||
                call.receiver.toLowerCase().includes(searchTerm) ||
                call.recorder.toLowerCase().includes(searchTerm)
            );
        });
    }

    return filteredCalls;
};

