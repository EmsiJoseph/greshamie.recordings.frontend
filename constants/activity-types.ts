export const ActivityTypes = {
    STARTED: 'STARTED',
    PLAYED: 'PLAYED',
    ENDED: 'ENDED',
    EXPORTED: 'EXPORTED',
    DELETED: 'DELETED',
} as const;

export const ActivityTypesFilter = {
    SESSION: 'SESSION',
    RECORDING: 'RECORDING',
} as const;