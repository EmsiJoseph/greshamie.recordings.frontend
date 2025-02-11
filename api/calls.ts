import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { ICall, ICallFilters } from "@/lib/interfaces/call-interface";
import { callsEndpoint } from "./endpoints/call-logs-endpoints";
export const fetchCalls = async (filters?: ICallFilters) => {
    let finalEndpoint = callsEndpoint;

    if (filters) {
        const queryParams = Object.entries(filters)
            .filter(([key, value]) => {
                // Check if the value is a non-empty array, or if it's a non-falsy string or number
                return value && (Array.isArray(value) ? value.length > 0 : true);
            })
            .map(([key, value]) => `${key}=${value}`)
            .join('&'); // Join the query parameters with '&'

        if (queryParams) {
            // If there are existing params in the endpoint, append with '&', else use '?'
            finalEndpoint = callsEndpoint.includes('?')
                ? `${callsEndpoint}&${queryParams}`
                : `${callsEndpoint}?${queryParams}`;
        }
    }

    console.log
    return await GreshamAxiosConfig.get(finalEndpoint);
};






// import { sampleCalls } from "./sample-data/calls";

// export const sampleFetchCalls = async (options?: ICallFilters) => {
//     // Simulate a delay (e.g., network latency)
//     await new Promise((resolve) => setTimeout(resolve, 1000));


//     let filteredCalls = sampleCalls;

//     console.log("FILTERED CALLS", options)
//     // Filter by callTypes (OR filtering: a call is kept if its type matches any selected type)
//     if (options?.callTypes && options.callTypes.length > 0) {
//         filteredCalls = filteredCalls.filter((call) => options?.callTypes?.includes(call.callType));

//         console.log("FILTERED CALLS", filteredCalls)
//     }

//     // Filter by minimum duration
//     if (options?.minDuration) {
//         filteredCalls = filteredCalls.filter((call) => call.durationSeconds >= (options.minDuration as number));
//     }

//     // Filter by maximum duration
//     if (options?.maxDuration) {
//         filteredCalls = filteredCalls.filter((call) => call.durationSeconds <= (options.maxDuration as number));
//     }

//     // Filter by search term (checking multiple fields)
//     if (options?.search) {
//         const searchTerm = options.search.toLowerCase();
//         filteredCalls = filteredCalls.filter((call) => {
//             return (
//                 call.caller.toLowerCase().includes(searchTerm) ||
//                 call.receiver.toLowerCase().includes(searchTerm) ||
//                 call.recorder.toLowerCase().includes(searchTerm)
//             );
//         });
//     }

//     // Filter by startDate
//     if (options?.startDate) {
//         const startDate = new Date(options.startDate);
//         filteredCalls = filteredCalls.filter((call) => new Date(call.startDateTime) >= startDate);
//     }

//     // Filter by endDate
//     if (options?.endDate) {
//         const endDate = new Date(options.endDate);
//         filteredCalls = filteredCalls.filter((call) => new Date(call.endDateTime) <= endDate);
//     }

//     return filteredCalls;
// };





