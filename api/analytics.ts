// /app/api/analytics.ts

import { IAnalyticsCategory, IAnalyticsFilters } from "@/lib/interfaces/analytic_interface";
import { sampleAnalyticsData } from "./sample-data/analytics";

export const sampleFetchAnalytics = async (options?: IAnalyticsFilters): Promise<IAnalyticsCategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

  let filteredAnalytics: IAnalyticsCategory[] = sampleAnalyticsData;

  if (options?.category) {
    filteredAnalytics = filteredAnalytics.filter((stat) =>
      stat.categoryName.toLowerCase().includes(options.category!.toLowerCase())
    );
  }


  return filteredAnalytics.length > 0 ? filteredAnalytics : sampleAnalyticsData;
};
