import CommonLayout from "@/components/Modules/Layout/CommonLayout";
import DashboardLayout from "@/components/Modules/Layout/DashboardLayout"

import { Role } from "@/constants/role";
import AllUsers from "@/pages/admin/AllUsers";
import AboutUs from "@/pages/common/AboutUs";
import ContactUs from "@/pages/common/ContactUs";
import Faq from "@/pages/common/Faq";
import Features from "@/pages/common/Features";
import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Register from "@/pages/common/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import MyProfile from "@/pages/user/MyProfile";
import AddMoney from "@/pages/user/AddMoney";
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
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout,Role.ADMIN as TRole),
    children: [
      { index: true, Component: AllUsers },
      ...generateRoutes(AdminSidebarItems),
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout,Role.AGENT as TRole),
    children: [
      { index: true, Component: AddMoney },
      ...generateRoutes(AgentSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout,Role.USER as TRole),
    children: [
      { index: true, Component: MyProfile },
      ...generateRoutes(UserSidebarItems),
    ],
  },
]);
