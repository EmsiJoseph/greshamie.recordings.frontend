import { CallDirectionIcons } from "@/constants/call-types"
import { TCallDirections } from "@/lib/interfaces/call-interface"
import { capitalizeFirstLetter } from "@/lib/utils/format-text"
import React from "react";

interface CallTypeWithIconProps {
  callType?: TCallDirections
}


const callIcons = CallDirectionIcons;
export const CallTypeWithIcon = ({
  callType
}: CallTypeWithIconProps) => {

  return (
    <div>
      {
        callType && callIcons[callType.toUpperCase()] ? (
          <div
            className={`flex items-center ${callIcons[callType].colorClass
              }`}
          >
            {React.createElement(callIcons[callType].icon, {
              className: "h-5 w-5",
            })}
            <span className="ml-2">
              {capitalizeFirstLetter(callType) || ""}
            </span>
          </div>
        ) : (
          <span>No Direction</span>
        )
      }
    </div>

  )
}
