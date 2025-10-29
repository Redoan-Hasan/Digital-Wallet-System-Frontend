/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/Modules/Common/Loader";
import {
  useGetAllPendingAgentsQuery,
  useGetAllApprovedAgentsQuery,
  useApproveAgentMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/user.api";
import {  type IUser } from "@/types/auth.type";
import { Check, X, Loader2 } from "lucide-react";
import { AgentStatus } from "./admin.constants";

const AgentManagement = () => {
  const { data: pendingAgentsData, isLoading: isLoadingPending } = useGetAllPendingAgentsQuery();
  const { data: approvedAgentsData, isLoading: isLoadingApproved } = useGetAllApprovedAgentsQuery();
  const [approveAgent] = useApproveAgentMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      await approveAgent(id).unwrap();
      toast.success("Agent approved successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve agent.");
    } finally {
      setApprovingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setRejectingId(id);
    try {
      await updateUserStatus({ id, data: { agentStatus: AgentStatus.REJECTED } }).unwrap();
      toast.success("Agent request rejected.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject agent request.");
    } finally {
      setRejectingId(null);
    }
  };

  if (isLoadingPending || isLoadingApproved) {
    return <Loader />;
  }

  const pendingAgents = pendingAgentsData?.data?.data || [];
  const approvedAgents = approvedAgentsData?.data?.data || [];

  return (
    <div className="space-y-8">
      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Pending Agent Requests</CardTitle>
          <CardDescription>Review and manage agent requests awaiting approval.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingAgents.length === 0 ? (
            <p className="text-muted-foreground text-center">No pending agent requests.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAgents.map((agent: IUser) => (
                  <TableRow key={agent._id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(agent._id!)}
                        disabled={approvingId === agent._id}
                      >
                        {approvingId === agent._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(agent._id!)}
                        disabled={rejectingId === agent._id}
                      >
                        {rejectingId === agent._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span className="sr-only">Reject</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Approved Agents</CardTitle>
          <CardDescription>List of all approved agents in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {approvedAgents.length === 0 ? (
            <p className="text-muted-foreground text-center">No approved agents.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedAgents.map((agent: IUser) => (
                  <TableRow key={agent._id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.agentStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentManagement;
