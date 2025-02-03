import { ModeToggle } from "@/components/common/mode-toggle";
import { UserNav } from "@/components/panel/user-nav";
import { Input } from "../ui/input";
import Logo from "@/public/logo.png";
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
          
          {/* Logo */}
          <Image src={Logo} alt="Wizard Logo"/>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          {/* Search Icon (Visible on screens smaller than 'md') */}
          <button
            onClick={toggleSearch}
            className="lg:hidden p-2 rounded-md"
          >
            <Search className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Expanded Search Bar (Visible on 'md' and above) */}
          <div className="relative flex justify-center transition-all duration-300">
            <div className="hidden lg:flex">
              <Input
                placeholder="Search (Ctrl + E)"
                className="rounded-full pl-4 pr-10 w-64" // Controls width expansion on larger screens
              />
            </div>

            {/* Conditional expanded search for smaller screens */}
            {isSearchOpen && (
              <Input
                placeholder="Search (Ctrl + E)"
                className="rounded-full pl-4 pr-10 w-48 sm:w-64" // Expands width on small screens
              />
            )}
          </div>
        </div>

        {/* Right side - Move Company Name Inside UserNav */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {/* Gresham House Recording inside UserNav section */}
          <span className="font-medium whitespace-nowrap hidden sm:block">
            Gresham House Recording
          </span>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
