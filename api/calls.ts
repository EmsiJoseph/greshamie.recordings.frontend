import { ICallFilters } from "@/lib/interfaces/call-interface";
import { sampleCalls } from "./sample-data/calls";

export const sampleFetchCalls = async (options?: ICallFilters) => {
    // Simulate a delay (e.g., network latency)
    await new Promise((resolve) => setTimeout(resolve, 1000));


    let filteredCalls = sampleCalls;

    console.log("FILTERED CALLS", options)
    // Filter by callTypes (OR filtering: a call is kept if its type matches any selected type)
    if (options?.callTypes && options.callTypes.length > 0) {
        filteredCalls = filteredCalls.filter((call) => options?.callTypes?.includes(call.callType));

        console.log("FILTERED CALLS", filteredCalls)
    }

    // Filter by minimum duration
    if (options?.minDuration) {
        filteredCalls = filteredCalls.filter((call) => call.duration >= (options.minDuration as number));
    }

    // Filter by maximum duration
    if (options?.maxDuration) {
        filteredCalls = filteredCalls.filter((call) => call.duration <= (options.maxDuration as number));
    }

    // Filter by search term (checking multiple fields)
    if (options?.search) {
        const searchTerm = options.search.toLowerCase();
        filteredCalls = filteredCalls.filter((call) => {
            return (
                call.caller.toLowerCase().includes(searchTerm) ||
                call.receiver.toLowerCase().includes(searchTerm) ||
                call.recorder.toLowerCase().includes(searchTerm)
            );
        });
    }

    // Filter by startDate and endDate
    if (options?.startDate || options?.endDate) {
        filteredCalls = filteredCalls.filter((call) => {
            const callDate = new Date(call.date);
            const startDate = options.startDate ? new Date(options.startDate) : null;
            const endDate = options.endDate ? new Date(options.endDate) : null;

            return (
                (!startDate || callDate >= startDate) &&
                (!endDate || callDate <= endDate)
            );
        });
    }

    return filteredCalls;
};


