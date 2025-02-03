import { ModeToggle } from "@/components/common/mode-toggle";
import { UserNav } from "@/components/panel/user-nav";
import { Input } from "../ui/input";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-between">
        {/* Left side - Logo and Searchbar */}
        <div className="flex items-center gap-4 flex-1">
            <Image src={Logo} alt="Wizard Logo"/>
            <div className="relative w-full max-w-xl">
                <Input
                placeholder="Search (Ctrl + E)"
                className="w-full rounded-full pl-4 pr-10"  // Added right padding for icon
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
            </div>
        </div>

        {/* Right side - Company Name and User Navigation */}
        <div className="flex items-center gap-4 ml-4">
          <span className="font-medium whitespace-nowrap">
            Gresham House Recording
          </span>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}