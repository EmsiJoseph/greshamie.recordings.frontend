import { IActivityFilters } from "@/lib/interfaces/activity-interface";
import { sampleActivities } from "./sample-data/activity";

export const sampleFetchActivities = async (options?: IActivityFilters) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredActivities = sampleActivities;

    console.log("FILTERED ACTIVITIES", options);
    // Filter by action
    if(options?.action && options.action.length > 0) {
        filteredActivities = filteredActivities.filter((activity) => options?.action?.includes(activity.action));

        console.log("FILTERED ACTIVITIES", filteredActivities);
    }

    // Filter by search term (checking multiple fields)
    if (options?.search) {
        const searchTerm = options.search.toLowerCase();
        filteredActivities = filteredActivities.filter((activity) => {
            return (
                activity.user.toLowerCase().includes(searchTerm) ||
                activity.recordingItem.toLowerCase().includes(searchTerm)
            );
        });
    }

    return filteredActivities;
};

