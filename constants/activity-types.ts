import { EllipsisVertical, Trash2, Download, LogIn, Play, LogOut } from "lucide-react";

export const EventTypes = {
  SESSION: "SESSION",
  RECORDING: "RECORDING",
} as const;

// 🔹 Readable labels for event types
export const activityLabels: Record<string, string> = {
  USERLOGGEDIN: "User Logged In",
  USERLOGGEDOUT: "User Logged Out",
  RECORDINGPLAYED: "Recording Played",
  RECORDINGEXPORTED: "Recording Exported",
  RECORDINGDELETED: "Recording Deleted",
  MANUALSYNC: "Manual Sync",
  AUTOSYNC: "Auto Sync",
};

// 🔹 Icons mapped to event types
export const EventDirectionIcons: Record<string, { icon: React.ElementType; colorClass: string }> = {
  USERLOGGEDIN: { icon: LogIn, colorClass: "text-green-700" },
  USERLOGGEDOUT: { icon: LogOut, colorClass: "text-red-500" },
  RECORDINGPLAYED: { icon: Play, colorClass: "text-cyan-700" },
  RECORDINGEXPORTED: { icon: Download, colorClass: "text-yellow-600" },
  RECORDINGDELETED: { icon: Trash2, colorClass: "text-red-700" },
  MANUALSYNC: { icon: Download, colorClass: "text-blue-600" },
  AUTOSYNC: { icon: Download, colorClass: "text-purple-600" },
};
