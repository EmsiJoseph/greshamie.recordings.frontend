import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { activityEndpoint } from "./endpoints/activity-endpoints";
import { IActivityFilters, IActivityResponse } from "@/lib/interfaces/activity-interface";
import { AxiosResponse } from "axios";

 export const fetchActivity = async (filters?: IActivityFilters): Promise<AxiosResponse<IActivityResponse>> => {
      let finalEndpoint = activityEndpoint;
    
        if (filters) {
            const queryParams = Object.entries(filters)
                .filter(([key, value]) => {
                    // Check if the value is a non-empty array, or if it's a non-falsy string or number
                    return value && (Array.isArray(value) ? value.length > 0 : true);
                })
                .map(([key, value]) => {
                    // If the value is a Date, convert it to an ISO string
                    if (value instanceof Date) {
                        value = value.toISOString();
                    }
                    return `${key}=${value}`;
                })
                .join('&'); // Join the query parameters with '&'
    
            if (queryParams) {
                // If there are existing params in the endpoint, append with '&', else use '?'
                finalEndpoint = activityEndpoint.includes('?')
                    ? `${activityEndpoint}&${queryParams}`
                    : `${activityEndpoint}?${queryParams}`;
            }
        }
    
        console.log(finalEndpoint); // Log the final endpoint with query params
        return await GreshamAxiosConfig.get(finalEndpoint);
}


// import { IActivityFilters } from "@/lib/interfaces/activity-interface";
// import { sampleActivities } from "./sample-data/activities";

// export const sampleFetchActivities = async (options?: IActivityFilters) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     let filteredActivities = sampleActivities;

//     if (options?.eventName && options.eventName.length > 0) {
//         filteredActivities = filteredActivities.filter((activity) => options?.eventName?.includes(activity.eventName));

//         console.log("FILTERED CALLS", filteredActivities)
//     }



//     // Filter by search term (checking multiple fields)
//     if (options?.search) {
//         const searchTerm = options.search.toLowerCase();
//         filteredActivities = filteredActivities.filter((activity) => {
//             return (
//                 activity.userName.toLowerCase().includes(searchTerm) ||
//                 activity.recordingItem.toLowerCase().includes(searchTerm)
//             );
//         });
//     }

//     // Filter by start timestamp
//     if(options?.startDate) {
//         const startDate = new Date(options.startDate);
//         filteredActivities = filteredActivities.filter((activity) => new Date(activity.timestamp) >= startDate);
//     }

//     // Filter by end timestamp
//     if(options?.endDate) {
//         const endDate = new Date(options.endDate);
//         filteredActivities = filteredActivities.filter((activity) => new Date(activity.timestamp) <= endDate);
//     }

//     return filteredActivities;
// };

