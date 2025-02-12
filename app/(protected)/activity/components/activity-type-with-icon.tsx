import { EventDirectionIcons, activityLabels } from "@/constants/activity-types";
import { TEventType } from "@/lib/interfaces/activity-interface";
import React from "react";

interface EventTypeWithIconProps {
  eventType?: TEventType;
}

export const EventTypeWithIcon = ({ eventType }: EventTypeWithIconProps) => {
  if (!eventType) return <span>No Action</span>;

  const upperEventType = eventType.toUpperCase();
  const eventIcon = EventDirectionIcons[upperEventType];
  const eventLabel = activityLabels[upperEventType] || eventType;

  return (
    <div className="flex items-center space-x-2">
      {eventIcon ? (
        <>
          {React.createElement(eventIcon.icon, { className: `h-5 w-5 ${eventIcon.colorClass}` })}
          <span>{eventLabel}</span>
        </>
      ) : (
        <span>{eventLabel}</span>
      )}
    </div>
  );
};
