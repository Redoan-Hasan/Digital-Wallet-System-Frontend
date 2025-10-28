import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetMyInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { useMakeMeAgentMutation } from "@/redux/features/wallet/wallet.api";
import { toast } from "sonner";
import Loader from "@/components/Modules/Common/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const BecomeAgent = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const { data: userInfo, isLoading: isUserLoading } = useGetMyInfoQuery(
    undefined,
    {
      pollingInterval: 3000, 
    }
  );
  const [makeMeAgent, { isLoading }] = useMakeMeAgentMutation();

  const handleRequest = async () => {
    try {
      await makeMeAgent().unwrap();
      toast.success("Request sent successfully. Please wait for admin approval.");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Become agent failed:", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (userInfo?.data?.data?.agentStatus === "APPROVED") {
      toast.success(
        "Congratulations! You are now an agent. Please log in again."
      );
      const performLogout = async () => {
        await logout().unwrap();
        navigate("/login");
      };
      performLogout();
    }
  }, [userInfo, logout, navigate]);

  if (isUserLoading && !userInfo) {
    return <Loader />;
  }

  const agentStatus = userInfo?.data?.data?.agentStatus;

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Become an Agent</CardTitle>
          <CardDescription>
            Request to become an agent to get more features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {agentStatus === "NONE" && (
            <Button onClick={handleRequest} disabled={isLoading}>
              {isLoading ? "Sending Request..." : "Request to become an Agent"}
            </Button>
          )}
          {agentStatus === "PENDING" && (
            <p className="text-yellow-500">
              Your request is pending approval. We will notify you once it's reviewed.
            </p>
          )}
          {agentStatus === "APPROVED" && (
            <p className="text-green-500">
              Congratulations! You are now an agent. Redirecting you to login...
            </p>
          )}
          {agentStatus === "SUSPEND" && (
            <p className="text-red-500">
              Your agent request has been suspended.
            </p>
          )}
          {agentStatus === "REJECTED" && (
            <p className="text-red-500">
              Your agent request has been rejected.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeAgent;
