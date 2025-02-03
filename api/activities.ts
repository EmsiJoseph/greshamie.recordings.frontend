import { IActivityFilters } from "@/lib/interfaces/activity-interface";
import { sampleActivities } from "./sample-data/activity";

export const sampleFetchActivities = async (options?: IActivityFilters) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredActivities = sampleActivities;

    if (options?.action) {
        filteredActivities = filteredActivities.filter((activity) => {
            return activity.action === options.action;
        });
    }

    if (options?.user) {
        filteredActivities = filteredActivities.filter((activity) => {
            return activity.user === options.user
        });
    }

    if (options?.recordingItem) {
        filteredActivities = filteredActivities.filter((activity) => {
            return activity.recordingItem === options.recordingItem
        });
    }

    if (options?.search) {
        filteredActivities = filteredActivities.filter((activity) => {
            const searchTerm = options.search!.toLowerCase();
            return (
                activity.user.toLowerCase().includes(searchTerm) ||
                activity.recordingItem.toLowerCase().includes(searchTerm)
            );
        });
    }

    return filteredActivities;
};

