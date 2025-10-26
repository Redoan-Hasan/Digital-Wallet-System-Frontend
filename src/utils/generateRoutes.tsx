import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarRoutes: ISidebarItem[] ) =>{
    return sidebarRoutes.flatMap((section) => 
        section.items.map((route)=> ({
            path: route.url, 
            Component:route.component
        }))
   );
}