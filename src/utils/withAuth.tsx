import { useGetMyInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Loader } from "lucide-react";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMyInfoQuery();

    if (isLoading) {
      return <Loader />;
    }

    if (!data?.data?.data?.email) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && data?.data?.data?.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};