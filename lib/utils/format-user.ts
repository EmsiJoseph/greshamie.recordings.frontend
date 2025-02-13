import { getUserFromAuthCookie } from "../services/server-actions/cookie";

export const getUserInfo = async (): Promise<string> => {
    const user = await getUserFromAuthCookie();
    return user?.user?.userName || "Guest"; // Return username or "Guest"
};

export const getInitials = (name: string): string => {
    const words = name.split(" ");
    const firstName = words[0] || "";
    const lastName = words[1] || "";
    
    return (firstName[0] || '') + (lastName[0] || '');
};