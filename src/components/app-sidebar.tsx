import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useGetMyInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Link } from "react-router";

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userData} = useGetMyInfoQuery();
  const sidebarItems = getSidebarItems(userData?.data?.data?.role as TRole)
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-auto"
                src="/digital-wallet-system-logo-removebg-preview.png"
                alt="VaultPay"
              />
              <span className="text-2xl font-bold text-primary">VaultPay</span>
            </Link>
          </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sidebarItems && sidebarItems.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
