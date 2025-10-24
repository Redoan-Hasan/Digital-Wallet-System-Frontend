import CommonLayout from "@/components/Modules/Layout/CommonLayout";
import AboutUs from "@/pages/common/AboutUs";
import ContactUs from "@/pages/common/ContactUs";
import Faq from "@/pages/common/Faq";
import Features from "@/pages/common/Features";
import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import { createBrowserRouter } from "react-router";

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
    ],
  },
]);
