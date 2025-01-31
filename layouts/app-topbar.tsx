"use client"

import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import React, { Children } from 'react'

export const AppTopbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <DarkModeToggle />
     {/* Topbar children content */}
     <div className="flex-1 flex items-center justify-between">
        {children}
      </div>
    </header>
  )
}
