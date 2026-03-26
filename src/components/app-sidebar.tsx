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
  useSidebar,
} from "@/components/ui/sidebar"
import LOGO from "./logo/logo"
import { NavProjects } from "./navprojects"
import { BookOpen } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

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
    // {
    //   title: "Messages",
    //   url: "/messages",
    //   icon: IconMessage,
    // },
    
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
      title: "Invoice",
      url: "/invoice",
      icon: IconDatabase, 
    },
    // {
    //   title: "Financials",
    //   url: "/financials",          
    //   icon: IconDatabase,
    //   items: [
    //     {
    //       title: "Invoice",
    //       url: "/financials/invoice",
    //     },
    //     {
    //       title: "Expense",
    //       url: "/financials/expense",
    //     },
    //   ],
    // },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  

  React.useEffect(() => {

    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <LOGO />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}