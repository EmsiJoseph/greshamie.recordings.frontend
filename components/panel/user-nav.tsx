"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logoutUserAction } from "@/lib/services/server-actions/authentication";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useAction } from "next-safe-action/hooks";
import { getUserFromAuthCookie } from "@/lib/services/server-actions/cookie";

export function UserNav() {
    const { executeAsync, isExecuting } = useAction(logoutUserAction);
    const router = useRouter();
    const [userName, setUserName] = useState<string>("Guest"); 

    const goToLogoutPage = async () => {
        const result = await executeAsync(); // Capture the result
        console.log(result)
        router.replace("/login");

        if (!result?.data) {
            handleApiClientSideError({
                error: "Failed to logout. Try again later.",
                isSuccessToast: false,
            });
        }
    };

    const getUserInfo = async () => {
        const user = await getUserFromAuthCookie();
        if (user) {
            setUserName(user.user?.userName || "Guest"); // Set the state with user name
        } else {
            setUserName("Guest"); // Default to "Guest" if no user
        }
    };
    
    useEffect(() => {
        getUserInfo();
    }, []);
    
    // const getUserNameFromCookies = () => {

    //     const authCookie =
    //     // Get the "auth" cookie
    //     const cookies = document.cookie
    //         .split("; ")
    //         .find(row => row.startsWith("auth"));
        
    //     console.log("agaga", cookies)
    
    //     if (!cookies) return "Guest"; // If cookie doesn't exist
    
    //     try {
    //         // Extract and decode the cookie value
    //         const authValue = decodeURIComponent(cookies.split("=")[1] || "");
    
    //         if (!authValue) return "Guest"; // Ensure we have a value
    
    //         // Parse the JSON
    //         const authData = JSON.parse(authValue);
    
    //         // Return the username or a default fallback
    //         return authData?.user?.userName || "Guest";
    //     } catch (error) {
    //         console.error("Error parsing auth cookie:", error);
    //         return "Guest";
    //     }
    // };
    
    // const userName = getUserNameFromCookies();
    // console.log("User Name:", userName);

    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="#" alt="Avatar" />
                                    <AvatarFallback className="bg-transparent">
                                        JB
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">
                            {userName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Current User
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground" />
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={goToLogoutPage}
                >
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
