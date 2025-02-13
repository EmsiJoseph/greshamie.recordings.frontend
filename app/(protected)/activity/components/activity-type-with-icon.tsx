import React from "react";
import { eventDirectionIcons } from "@/constants/activity-types";

interface ActivityIconProps {
  eventName: string;
}

const EventTypeWithIcon: React.FC<ActivityIconProps> = ({ eventName }) => {
  const activity = eventDirectionIcons[eventName];

  // Function to format camelCase or PascalCase event names into readable text
  const formatEventName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase());
  };

  return activity ? (
    <div className={`flex items-center ${activity.colorClass}`}>
      {React.createElement(activity.icon, { className: "h-5 w-5" })}
      <span className="ml-2 font-bold">{formatEventName(eventName)}</span>
    </div>
  ) : (
    <span className="text-gray-500">Unknown Event</span>
  );
};

export default EventTypeWithIcon;
