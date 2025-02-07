// /app/api/analytics.ts

import { IAnalyticsCategory, IAnalyticsFilters } from "@/lib/interfaces/analytic-interface";
import { sampleAnalyticsData } from "./sample-data/analytics";

export const sampleFetchAnalytics = async (options?: IAnalyticsFilters): Promise<IAnalyticsCategory[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

  let filteredAnalytics: IAnalyticsCategory[] = sampleAnalyticsData;

  if (options?.category) {
    filteredAnalytics = filteredAnalytics.filter((stat) =>
      stat.categoryName.toLowerCase().includes(options.category!.toLowerCase())
    );
  }

<<<<<<< HEAD
=======

>>>>>>> d529f52dc5abb71f7b67351f1252cbfe96c958f1
  return filteredAnalytics.length > 0 ? filteredAnalytics : sampleAnalyticsData;
};
