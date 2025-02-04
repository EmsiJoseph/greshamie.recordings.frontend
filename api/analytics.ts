// /app/api/analytics.ts

import { IAnalyticsCategory, IAnalyticsFilters } from "@/lib/interfaces/analytic_interface";
import { sampleAnalyticsData } from "./sample-data/analytics";



export const sampleFetchAnalytics = async (options?: IAnalyticsFilters): Promise<IAnalyticsCategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

  let filteredAnalytics: IAnalyticsCategory[] = sampleAnalyticsData;

  if (options?.category) {
    filteredAnalytics = filteredAnalytics.filter((stat) =>
      stat.category.toLowerCase().includes(options.category!.toLowerCase())
    );
  }

  if (options?.search) {
    const searchTerm = options.search.toLowerCase();
    filteredAnalytics = filteredAnalytics.map((stat) => ({
      ...stat,
      data: stat.data.filter((item) =>
        item.label.toLowerCase().includes(searchTerm)
      ),
    })).filter((stat) => stat.data.length > 0); // Remove categories with no matching stats

  }

  return filteredAnalytics;
};
