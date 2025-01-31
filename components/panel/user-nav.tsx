"use client";

import Link from "next/link";
import {LogOut, Settings, User} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
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
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

export function UserNav() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Store the current path whenever it changes
        sessionStorage.setItem('lastPath', pathname);
    }, [pathname]);

    const goToLogoutPage = () => {
        router.replace("/logout");
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
                                    <AvatarImage src="#" alt="Avatar"/>
                                    <AvatarFallback className="bg-transparent">
                                        Berbon 
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
                           Berbon 
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            berbon@.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/settings" className="flex items-center">
                            <Settings className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => {
                        goToLogoutPage();
                    }}
                >
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground"/>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
