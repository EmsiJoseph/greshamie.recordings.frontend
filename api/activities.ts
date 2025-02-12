import { GreshamAxiosConfig } from "@/lib/config/main-backend-axios-config";
import { activityEndpoint } from "./endpoints/activity-endpoints";
import { IActivityFilters } from "@/lib/interfaces/activity-interface";

export const fetchActivity = async (filters?: IActivityFilters) => {
    let finalEndpoint = activityEndpoint;
    if (filters) {
        const queryParams = Object.entries(filters)
            .filter(([key, value]) => value) // Only include entries where the value is truthy
            .map(([key, value]) => `${key}=${value}`)
            .join('&'); // Join the query parameters with '&'
 
        if (queryParams) {
            // If there are existing params in the endpoint, append with '&', else use '?'
            finalEndpoint = activityEndpoint.includes('?')
                ? `${activityEndpoint}&${queryParams}`
                : `${activityEndpoint}?${queryParams}`;
        }
    }
 
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

