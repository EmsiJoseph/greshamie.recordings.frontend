import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    // handleReturnedServerError(e) {
    handleServerError(e) {
        return "Oh no, something went wrong!";
    },
});