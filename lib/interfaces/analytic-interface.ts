// /app/api/interfaces/analytics.interface.ts

// Represents a single statistic (e.g., "In Progress", "Max Duration")
export interface IStatItem {
  label: string; // The label for the stat, such as "In Progress" or "Max Duration"
  value: string | number; // The value of the stat, can be a string or a number (e.g., "00:34:18" or 10)
}

// Represents a category of analytics data
export interface IAnalyticsCategory {
  categoryName: string; // The category name (e.g., "Live Stats", "Today's Stats")
  data: IStatItem[]; // An array of IStatItem representing the stats in this category
}

// Represents the filters for querying analytics data
export interface IAnalyticsFilters {
  category: string; // Optional category filter
}

