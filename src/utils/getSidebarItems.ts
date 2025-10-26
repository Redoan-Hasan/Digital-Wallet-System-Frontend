import { Role } from "@/constants/role";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
// import { UserSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.ADMIN:
      return AdminSidebarItems;
    // case Role.AGENT:
    //   return AdminSidebarItems;
    // case Role.USER:
    //   return UserSidebarItems;
    default:
      break;
  }
};
