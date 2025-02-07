import { ActivityTypes } from "@/constants/activity-types";
import { IActivity } from "@/lib/interfaces/activity-interface";

export const sampleActivities: IActivity[] = [
    {
        id: 1,
        date: new Date('2025-02-01T10:00:00'),
        user: "Alice",
        recordingItem: " ",
        action: ActivityTypes.STARTED,
    },
    {
        id: 2,
        date: new Date('2025-01-01T11:30:00'),
        user: "Charlie",
        recordingItem: "f5211b55e648 ",
        action: ActivityTypes.PLAYED,
    },
    {
        id: 3,
        date: new Date('2025-02-05T12:15:00'),
        user: "Eve",
        recordingItem: "f5831b55e626 ",
        action: ActivityTypes.EXPORTED,
    },
    {
        id: 4,
        date: new Date('2025-02-03T13:00:00'),
        user: "Grace",
        recordingItem: "f5211b55e648 ",
        action: ActivityTypes.EXPORTED,
    },
    {
        id: 5,
        date: new Date('2025-02-04T14:45:00'),
        user: "Ian",
        recordingItem: " ",
        action: ActivityTypes.ENDED,
    },
    {
        id: 6,
        date: new Date('2025-02-04T15:30:00'),
        user: "Kara",
        recordingItem: "f5211b55e648 ",
        action: ActivityTypes.DELETED,
    },
    {
        id: 7,
        date: new Date('2025-02-01T16:15:00'),
        user: "Liam",
        recordingItem: "f5831b55e626 ",
        action: ActivityTypes.DELETED,
    },
    {
        id: 8,
        date: new Date('2025-02-10T17:00:00'),
        user: "Mason",
        recordingItem: "f5211b55e648 ",
        action: ActivityTypes.PLAYED,
    },
    {
        id: 9,
        date: new Date('2025-02-10T17:45:00'),
        user: "Nora",
        recordingItem: " ",
        action: ActivityTypes.STARTED,
    },
    {
        id: 10,
        date: new Date('2025-02-10T18:30:00'),
        user: "Oliver",
        recordingItem: " ",
        action: ActivityTypes.ENDED,
    },
    
];