import { IActivityFilters } from "@/lib/interfaces/activity-interface";
import { sampleActivities } from "./sample-data/activities";

export const sampleFetchActivities = async (options?: IActivityFilters) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredActivities = sampleActivities;

    if (options?.action && options.action.length > 0) {
        filteredActivities = filteredActivities.filter((activity) => options?.action?.includes(activity.action));

        console.log("FILTERED CALLS", filteredActivities)
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

    // Filter by start date
    if(options?.startDate) {
        const startDate = new Date(options.startDate);
        filteredActivities = filteredActivities.filter((activity) => new Date(activity.date) >= startDate);
    }

    // Filter by end date
    if(options?.endDate) {
        const endDate = new Date(options.endDate);
        filteredActivities = filteredActivities.filter((activity) => new Date(activity.date) <= endDate);
    }

    return filteredActivities;
};

