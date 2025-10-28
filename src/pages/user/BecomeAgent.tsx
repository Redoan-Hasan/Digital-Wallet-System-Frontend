import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyInfoQuery } from "@/redux/features/auth/auth.api";
import { useMakeMeAgentMutation } from "@/redux/features/wallet/wallet.api";
import { toast } from "sonner";
import Loader from "@/components/Modules/Common/Loader";

const BecomeAgent = () => {
  const { data: userInfo, isLoading: isUserLoading } = useGetMyInfoQuery(undefined);
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

  if (isUserLoading) {
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
              Your request is pending approval.
            </p>
          )}
          {agentStatus === "APPROVED" && (
            <p className="text-green-500">
              Congratulations! You are now an agent.
            </p>
          )}
            {agentStatus === "SUSPEND" && (
            <p className="text-red-500">
                Your agent request has been suspended.
            </p>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeAgent;
