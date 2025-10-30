import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./tour.css";
import { useEffect, useContext, useRef } from "react";
import { SidebarContext } from "@/components/ui/sidebar";

export const Tour = () => {
  const sidebarContext = useContext(SidebarContext);
  const wasSidebarClosed = useRef(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (hasSeenTour || !sidebarContext) {
      return;
    }

    const { isMobile, openMobile, setOpenMobile } = sidebarContext;

    const driverObj = driver({
      popoverClass: "custom-driver-popover",
      onDestroyStarted: () => {
        localStorage.setItem("hasSeenTour", "true");

        if (wasSidebarClosed.current) {
          setOpenMobile(false);
        }

        driverObj.destroy();
      },
    });

    const tourSteps = [
      {
        element: "#tour-my-profile",
        popover: {
          title: "My Profile",
          description: "View and manage your profile information here.",
        },
        side: "right",
        align: "start",
      },
      {
        element: "#tour-my-wallet",
        popover: {
          title: "My Wallet",
          description: "Check your current balance and wallet details.",
        },
        side: "right",
        align: "start",
      },
      {
        element: "#tour-add-money",
        popover: {
          title: "Add Money",
          description: "Add funds to your wallet from your linked accounts.",
        },
        side: "right",
        align: "start",
      },
      {
        element: "#tour-send-money",
        popover: {
          title: "Send Money",
          description: "Instantly send money to any other user.",
        },
        side: "right",
        align: "start",
      },
      {
        element: "#tour-transaction-history",
        popover: {
          title: "Transaction History",
          description: "Review a complete list of all your past transactions.",
        },
        side: "right",
        align: "start",
      },
    ];

    driverObj.setSteps(tourSteps);

    const startTimer = setTimeout(() => {
      if (isMobile && !openMobile) {
        wasSidebarClosed.current = true;
        setOpenMobile(true);

        setTimeout(() => {
          driverObj.drive();
        }, 300);
      } else {
        driverObj.drive();
      }
    }, 1000);

    return () => {
      clearTimeout(startTimer);
      if (driverObj.isActive()) {
        driverObj.destroy();
      }
    };
  }, [sidebarContext]);

  return null;
};