import MyProfile from "@/pages/user/MyProfile";
import type { ISidebarItem } from "@/types";

export const UserSidebarItems: ISidebarItem[] = [
  {
    title: " User Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/user/me",
        component: MyProfile
      },
    ],
  },
];