/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import Loader from "@/components/Modules/Common/Loader";
import {
  useGetAllPendingAgentsQuery,
  useGetAllApprovedAgentsQuery,
  useUpdateUserStatusMutation,
  useApproveAgentMutation,
} from "@/redux/features/user/user.api";
import { type IUser } from "@/types/auth.type";
import { useGetSingleWalletQuery } from "@/redux/features/wallet/wallet.api";
import {
  Ban,
  CheckCircle2,
  Loader2,
  Eye,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  XCircle, // For Reject
} from "lucide-react";
import { AgentStatus, Status } from "./admin.constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tk from "@/assets/Tk";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const AgentManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<IUser | null>(null);

  const { data: singleWalletData, isLoading: isWalletLoading } = useGetSingleWalletQuery(
    selectedAgent?.wallet as string,
    {
      skip: !selectedAgent?.wallet,
    }
  );

  const {
    data: pendingAgentsData,
    isLoading: isPendingAgentsLoading,
    refetch: refetchPendingAgents,
  } = useGetAllPendingAgentsQuery();

  const {
    data: approvedAgentsData,
    isLoading: isApprovedAgentsLoading,
    refetch: refetchApprovedAgents,
  } = useGetAllApprovedAgentsQuery();

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [approveAgent] = useApproveAgentMutation();

  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [suspendingId, setSuspendingId] = useState<string | null>(null);

  const handleApproveAgent = async (id: string) => {
    setApprovingId(id);
    try {
      await approveAgent(id).unwrap();
      toast.success("Agent approved successfully!");
      refetchPendingAgents();
      refetchApprovedAgents();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve agent.");
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectAgent = async (id: string) => {
    setRejectingId(id);
    try {
      await updateUserStatus({ id, data: { agentStatus: AgentStatus.REJECTED } }).unwrap();
      toast.success("Agent rejected successfully!");
      refetchPendingAgents();
      refetchApprovedAgents();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject agent.");
    } finally {
      setRejectingId(null);
    }
  };

  const handleSuspendAgent = async (id: string) => {
    setSuspendingId(id);
    try {
      await updateUserStatus({ id, data: { agentStatus: AgentStatus.SUSPEND } }).unwrap();
      toast.success("Agent suspended successfully!");
      refetchApprovedAgents();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to suspend agent.");
    } finally {
      setSuspendingId(null);
    }
  };

  if (isPendingAgentsLoading || isApprovedAgentsLoading) {
    return <Loader />;
  }

  const pendingAgents = pendingAgentsData?.data?.data || [];
  const approvedAgents = approvedAgentsData?.data?.data || [];

  return (
    <Dialog>
      <div className="space-y-8">
        {/* Pending Agents Table */}
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Pending Agents</CardTitle>
            <CardDescription>Manage agent requests awaiting approval.</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingAgents.length === 0 ? (
              <p className="text-muted-foreground text-center">No pending agent requests found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAgents.map((agent: IUser) => (
                    <TableRow key={agent._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${agent.agentStatus === AgentStatus.PENDING ? "bg-yellow-100 text-yellow-800" : ""}`}
                        >
                          {agent.agentStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedAgent(agent)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <Button
                          variant="default"
                          size="icon"
                          onClick={() => handleApproveAgent(agent._id!)}
                          disabled={approvingId === agent._id}
                        >
                          {approvingId === agent._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRejectAgent(agent._id!)}
                          disabled={rejectingId === agent._id}
                        >
                          {rejectingId === agent._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-end items-center gap-4">
          </CardFooter>
        </Card>

        {/* Approved Agents Table */}
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Approved Agents</CardTitle>
            <CardDescription>Manage currently approved agents.</CardDescription>
          </CardHeader>
          <CardContent>
            {approvedAgents.length === 0 ? (
              <p className="text-muted-foreground text-center">No approved agents found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Agent Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedAgents.map((agent: IUser) => (
                    <TableRow key={agent._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${agent.status === Status.ACTIVE ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {agent.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${agent.agentStatus === AgentStatus.APPROVED ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {agent.agentStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedAgent(agent)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleSuspendAgent(agent._id!)}
                          disabled={suspendingId === agent._id}
                        >
                          {suspendingId === agent._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-end items-center gap-4">
          </CardFooter>
        </Card>

        {selectedAgent && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agent Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected agent.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Name</span>
                <span className="font-semibold flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" /> {selectedAgent.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {selectedAgent.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-semibold flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> {selectedAgent.phone}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Role</span>
                <span className="font-semibold">{selectedAgent.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={cn(
                    "font-semibold",
                    selectedAgent.status === Status.ACTIVE
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {selectedAgent.status}
                </span>
              </div>
              {selectedAgent.agentStatus && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Agent Status</span>
                  <span className="font-semibold flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1" /> {selectedAgent.agentStatus}
                  </span>
                </div>
              )}

              {isWalletLoading ? (
                <p className="text-muted-foreground">Loading wallet balance...</p>
              ) : singleWalletData?.data ? (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wallet Balance</span>
                  <span className="font-semibold flex items-center">
                    <Tk className="mr-1" />
                    {singleWalletData.data[0].balance}
                  </span>
                </div>
              ) : (
                <p className="text-muted-foreground">Wallet information not available.</p>
              )}
            </div>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
};

export default AgentManagement;