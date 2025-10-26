import AddMoney from "@/pages/agent/AddMoney";
import type { ISidebarItem } from "@/types";

export const AgentSidebarItems: ISidebarItem[] = [
  {
    title: " User Dashboard",
    items: [
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney
      },
    ],
  },
];