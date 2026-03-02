"use client"

import * as React from "react"
import {
  IconBox,
  IconCalendar,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconMessage,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import LOGO from "./logo/logo"
import { NavProjects } from "./navprojects"
import { BookOpen } from "lucide-react"

export const data = {
  user: {
    name: "Joylan dorwart",
    email: "admin@gmail.com",
    avatar: "/girl.png",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Reservation",
      url: "/reservation",
      icon: IconListDetails,
    },
    {
      title: "Rooms",
      url: "/rooms",
      icon: IconHome,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: IconMessage,
    },
    
    {
      title: "Calendar",
      url: "/calendar",
      icon: IconCalendar,
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: IconMessage, 
    },
    {
      title: "Financials",
      url: "/financials",          
      icon: IconDatabase,
      items: [
        {
          title: "Invoice",
          url: "/financials/invoice",
        },
        {
          title: "Expense",
          url: "/financials/expense",
        },
      ],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}  >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <LOGO />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent >
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
