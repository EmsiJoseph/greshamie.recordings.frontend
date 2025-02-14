import { LogIn, LogOut, Play, Download, Trash2, RefreshCw } from "lucide-react";

export const EventTypes = {
  SESSION: "SESSION",
  RECORDING: "RECORDING",
} as const;

// 🔹 Icons mapped to event types
export const eventDirectionIcons: Record<string, any> = {
  USERLOGGEDIN: { icon: LogIn, colorClass: "text-green-600 font-bold", value: "User Logged In" },
  USERLOGGEDOUT: { icon: LogOut, colorClass: "text-red-500 font-bold", value: "User Logged Out" },
  RECORDPLAYED: { icon: Play, colorClass: "text-cyan-700 font-bold", value: "Recording Played" },
  RECORDEXPORTED: { icon: Download, colorClass: "text-yellow-600 font-bold", value: "Recording Exported" },
  RECORDDELETED: { icon: Trash2, colorClass: "text-red-700 font-bold", value: "Recording Deleted" },
  MANUALSYNC: { icon: Download, colorClass: "text-blue-600 font-bold", value: "Manual Sync" },
  AUTOSYNC: { icon: Download, colorClass: "text-purple-600 font-bold", value: "Auto Sync" },
  TOKENREFRESHED: { icon: RefreshCw, colorClass: "text-green-800 font-bold", value: "Token Refreshed" },
};

