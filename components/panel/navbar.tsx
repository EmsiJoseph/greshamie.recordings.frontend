import { ModeToggle } from "@/components/common/mode-toggle";
import { UserNav } from "@/components/panel/user-nav";
import { Input } from "../ui/input";
import Logo from "@/public/logo.png";
import DarkLogo from "@/public/darklogo.png";
import SmallLogo from "@/public/small-logo.png";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useState } from "react";

export function Navbar() {
  const { isOpen, setIsOpen } = useSidebarToggle();
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-between">
        
        {/* Left side - Sidebar Toggle (Only for Mobile) and Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle Button */}
          <button 
            className="lg:hidden p-2 rounded-md"
            onClick={setIsOpen}
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          
            {/* Logo - Only show when search is not open */}
            {!isSearchOpen && (
            <Image src={Logo} alt="Wizard Logo" className="dark:hidden" />
            )}
            {!isSearchOpen && (
            <Image src={DarkLogo} alt="Wizard Logo" className="hidden dark:block" />
            )}

            {/* Small Logo - Show when search is open */}
            {isSearchOpen && (
            <Image src={SmallLogo} alt="Wizard Logo" className="h-8 w-8" />
            )}
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          {/* Search Icon (Visible on screens smaller than 'md') */}
            {!isSearchOpen && (
            <button
              onClick={toggleSearch}
              className="lg:hidden p-2 rounded-md"
            >
              <Search className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            )}

          {/* Expanded Search Bar (Visible on 'md' and above) */}
          <div className="relative flex justify-center transition-all duration-300">
            <div className="hidden lg:flex items-center relative">
              <Input
              placeholder="Search (Ctrl + E)"
              className="rounded-full pl-4 pr-10 w-64" // Controls width expansion on larger screens
              />
              <button className="absolute right-2 p-1">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Conditional expanded search for smaller screens */}
            {isSearchOpen && (
              <div className="relative flex items-center">
              <Input
                placeholder="Search (Ctrl + E)"
                className="rounded-full pl-4 pr-10 w-48 sm:w-64" // Expands width on small screens
              />
              <button 
                className="absolute right-2 p-1"
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Move Company Name Inside UserNav */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {/* Gresham House Recording inside UserNav section */}
            <span className="font-medium font-bold whitespace-nowrap hidden sm:block">
            GRESHAM HOUSE RECORDINGS
            </span>
          <UserNav />
        </div>
      </div>

      <div className="border-t border-white dark:border-white" />
    </header>
  );
}
