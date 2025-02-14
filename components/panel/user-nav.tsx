"use client";

import React, {useEffect, useState} from "react";
import { LogOut } from "lucide-react";
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
import { getInitials, getUserInfo } from "@/lib/utils/format-user";

export function UserNav() {
    const { executeAsync } = useAction(logoutUserAction);
    const router = useRouter();
    const [userName, setUserName] = useState<string>("Guest"); 

    const goToLogoutPage = async () => {
        const result = await executeAsync(); // Capture the result
        router.replace("/login");

        if (!result?.data) {
            handleApiClientSideError({
                error: "Failed to logout. Try again later.",
                isSuccessToast: false,
            });
        }
    };

    useEffect(() => {
        (async () => {
            const name = await getUserInfo();
            setUserName(name);
        })();
    }, []);

    const initials = getInitials(userName);

    
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
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">User</TooltipContent>
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
                    <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={goToLogoutPage}
                    >
                        <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
