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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useGetMyInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Link, NavLink } from "react-router";

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userData} = useGetMyInfoQuery();
  const sidebarItems = getSidebarItems(userData?.data?.data?.role as TRole)
  return (
    <Sidebar {...props} className="bg-linear-to-b! from-primary/10 to-transparent backdrop-blur-sm border-0!">
      <SidebarHeader>
        <div className="shrink-0 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-auto"
                src="/digital-wallet-system-logo-removebg-preview.png"
                alt="VaultPay"
              />
              <span className="text-2xl font-bold text-primary">VaultPay</span>
            </Link>
            <div className="md:hidden">
              <SidebarTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </SidebarTrigger>
            </div>
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
                    <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        {item.title}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
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
