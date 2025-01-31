import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { SIDEBAR_ITEMS } from "@/constants/sidebar-content"


interface SidebarItem {
    title: string
    url: string
    icon: React.FC
}

export function AppSidebar() {
    const items: SidebarItem[] = SIDEBAR_ITEMS.Admin
    return (
        <Sidebar className="w-64 fixed left-0 top-0 h-screen z-40 border-r">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
 