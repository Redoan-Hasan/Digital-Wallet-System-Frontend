import CommonLayout from "@/components/Modules/Layout/CommonLayout";
import DashboardLayout from "@/components/Modules/Layout/DashboardLayout";

import { Role } from "@/constants/role";
import AboutUs from "@/pages/common/AboutUs";
import ContactUs from "@/pages/common/ContactUs";
import Faq from "@/pages/common/Faq";
import Features from "@/pages/common/Features";
import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Register from "@/pages/common/Register";
import Unauthorized from "@/pages/common/Unauthorized";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import { AgentSidebarItems } from "./AgentSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "contact",
        Component: ContactUs,
      },
      {
        path: "faq",
        Component: Faq,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, Role.ADMIN as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      ...generateRoutes(AdminSidebarItems),
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, Role.AGENT as TRole),
    children: [
      { index: true, element: <Navigate to="/agent/my-profile" replace /> },
      ...generateRoutes(AgentSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, Role.USER as TRole),
    children: [
      { index: true, element: <Navigate to="/user/my-profile" replace /> },
      ...generateRoutes(UserSidebarItems),
    ],
  },
]);
