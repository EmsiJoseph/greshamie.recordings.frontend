import { CallTypes } from "@/constants/call-types";
import { ICall } from "@/lib/interfaces/call-interface";

export const sampleCalls: ICall[] = [
    {
        id: 1,
        date: new Date('2025-02-01T10:00:00'),
        caller: "Alice",
        receiver: "Bob",
        callType: CallTypes.INCOMING,
        duration: 5,
        recorder: "System1",
        size: 500
    },
    {
        id: 2,
        date: new Date('2025-02-01T11:30:00'),
        caller: "Charlie",
        receiver: "Dana",
        callType: CallTypes.OUTGOING,
        duration: 65.05,
        recorder: "System2",
        size: 300
    },
    {
        id: 3,
        date: new Date('2025-02-01T12:15:00'),
        caller: "Eve",
        receiver: "Frank",
        callType: CallTypes.INCOMING,
        duration: 20,
        recorder: "System3",
        size: 800
    },
    {
        id: 4,
        date: new Date('2025-02-01T13:00:00'),
        caller: "Grace",
        receiver: "Hannah",
        callType: CallTypes.INTERNAL,
        duration: 20.05,
        recorder: "System1",
        size: 200
    },
    {
        id: 5,
        date: new Date('2025-02-01T14:45:00'),
        caller: "Ian",
        receiver: "Jack",
        callType: CallTypes.OUTGOING,
        duration: 3,
        recorder: "System2",
        size: 400
    },
    {
        id: 6,
        date: new Date('2025-02-01T15:30:00'),
        caller: "Kara",
        receiver: "Liam",
        callType: CallTypes.INCOMING,
        duration: 2,
        recorder: "System3",
        size: 150
    },
    {
        id: 7,
        date: new Date('2025-02-01T16:00:00'),
        caller: "Mona",
        receiver: "Nina",
        callType: CallTypes.INTERNAL,
        duration: 49.1,
        recorder: "System1",
        size: 220
    },
    {
        id: 8,
        date: new Date('2025-02-01T17:15:00'),
        caller: "Oscar",
        receiver: "Paul",
        callType: CallTypes.OUTGOING,
        duration: 45.9,
        recorder: "System2",
        size: 600
    },
    {
        id: 9,
        date: new Date('2025-02-01T18:00:00'),
        caller: "Quincy",
        receiver: "Rachel",
        callType: CallTypes.INCOMING,
        duration: 90,
        recorder: "System3",
        size: 300
    },
    {
        id: 10,
        date: new Date('2025-02-01T19:30:00'),
        caller: "Steve",
        receiver: "Tina",
        callType: CallTypes.INTERNAL,
        duration: 120,
        recorder: "System1",
        size: 450
    }
];