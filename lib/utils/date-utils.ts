import { DATE_FORMAT } from '@/constants/date-formats';
import { format, parse } from 'date-fns';

const isoFormat = DATE_FORMAT.ISO
const enGbFormat = DATE_FORMAT['en-gb']

export const formatDate = (dateInput: string | Date): string => {
  // Convert string to Date object if necessary
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
};

export const isValidDate = (dateString: string | undefined, type: 'ISO' | 'locale' = 'ISO') => {
  if (!dateString) {
    return false;
  }

  let parsedDate;

  if (type === 'ISO') {
    // For ISO format with time: 'yyyy-MM-dd' or 'yyyy-MM-ddTHH:mm:ss'
    parsedDate = new Date(dateString);  // This will be valid if the string is in ISO format (with or without time)
    return !isNaN(parsedDate.getTime()); // Returns true if valid, false if invalid
  }

  if (type === 'locale') {
    // For Local (en-GB) format with time: 'dd/MM/yyyy HH:mm:ss'
    parsedDate = parse(dateString, enGbFormat, new Date());
    return !isNaN(parsedDate.getTime()); // Returns true if valid, false if invalid
  }

  return false;
};

// Converts between ISO and en-GB
export const getDateString = (dateString: string | undefined, type: 'ISO' | 'locale'): string => {
  if (!dateString) {
    return ""
  }

  let parsedDate;

  if (type === 'ISO') {
    // If the type is 'ISO', we assume the dateString is in ISO format
    parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid ISO date string');
    }
  }

  if (type === 'locale') {
    // If the type is 'locale', we parse it assuming it's in en-GB format
    parsedDate = parse(dateString, enGbFormat, new Date());
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid local date string');
    }
  }

  if (parsedDate) {
    // Convert to the other format based on the type
    if (type === 'ISO') {
      // Convert to en-GB format
      return format(parsedDate, enGbFormat);  // Return in en-GB format
    }

    if (type === 'locale') {
      // Convert to ISO format
      return parsedDate.toISOString();  // Return in ISO format
    }
  }

  throw new Error('Invalid type');
};

// Accepts ISO String, returns ISO String
export const operateOnDays = (dateString?: string, daysOffset = 0) => {
  const date = dateString ? new Date(dateString) : new Date(); // Use provided date or current date
  if (isNaN(date.getTime())) throw new Error("Invalid date string"); // Handle invalid dates

  date.setUTCDate(date.getUTCDate() + daysOffset); // Adjust days
  return date.toISOString(); // Returns the date in ISO format after applying the offset
};