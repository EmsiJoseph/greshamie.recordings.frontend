export const formatDurationToHours = (seconds?: number) => {
    if (!seconds) {
        return null
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};