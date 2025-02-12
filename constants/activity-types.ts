import { LogIn, LogOut, Play, Download, Trash2 } from "lucide-react";

export const EventTypes = {
  SESSION: "SESSION",
  RECORDING: "RECORDING",
} as const;

// 🔹 Interface for Activity Icons
export interface ActivityIconProps {
  icon: React.ElementType;
  colorClass: string;
}

// 🔹 Icons mapped to event types
export const eventDirectionIcons: Record<string, ActivityIconProps> = {
  UserLoggedIn: { icon: LogIn, colorClass: "text-green-500" },
  UserLoggedOut: { icon: LogOut, colorClass: "text-red-500" },
  SessionStarted: { icon: LogIn, colorClass: "text-green-700" },
  RecordingPlayed: { icon: Play, colorClass: "text-cyan-700" },
  SessionEnded: { icon: LogOut, colorClass: "text-red-500" },
  RecordingExported: { icon: Download, colorClass: "text-yellow-600" },
  RecordingDeleted: { icon: Trash2, colorClass: "text-red-700" },
  ManualSync: { icon: Download, colorClass: "text-blue-600" },
  AutoSync: { icon: Download, colorClass: "text-purple-600" },
};
