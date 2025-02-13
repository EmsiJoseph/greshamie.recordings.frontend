import { ArrowRightLeft, MoveDownLeft, MoveUpRight } from "lucide-react";

export const CallDirections: Record<string, string> = {
    INCOMING: 'INCOMING',
    OUTGOING: 'OUTGOING',
    INTERNAL: 'INTERNAL',
} as const;


export const CallDirectionIcons: Record<string, any> = {
    INCOMING: { icon: MoveDownLeft, colorClass: "text-green-700" },
    OUTGOING: { icon: MoveUpRight, colorClass: "text-orange-700" },
    INTERNAL: { icon: ArrowRightLeft, colorClass: "text-blue-700" },
}
