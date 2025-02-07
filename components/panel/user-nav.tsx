"use client";

import Link from "next/link";
import {LogOut, User} from "lucide-react";
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

// import {useUser} from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { handleApiClientSideError } from "@/lib/handlers/api-response-handlers/handle-use-client-response";
import { useAction } from "next-safe-action/hooks";

export function UserNav() {
    const { executeAsync, isExecuting } = useAction(logoutUserAction);
    const router = useRouter();

    const goToLogoutPage = async () => {
        try {
            const result = await executeAsync(); // Capture the result
            console.log("Logout result:", result); // Debug log
            router.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
            handleApiClientSideError({
                error: "Failed to logout. Try again later.",
                isSuccessToast: false,
            });
        }
    };

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
                        <p className="text-sm font-medium leading-none">
                            GHIE-API
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Berbon@.com
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
