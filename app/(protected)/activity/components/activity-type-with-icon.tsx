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

return (
  <div className={`flex items-center ${eventDirectionIcons[eventName].colorClass}`}>
    {React.createElement(eventDirectionIcons[eventName].icon, { 
      className: "h-5 w-5" 
    })}
    <span className="ml-2 font-bold">{formatEventName(eventName) || "Unknown Event"}</span>
  </div>
  
);
};

export default EventTypeWithIcon;
