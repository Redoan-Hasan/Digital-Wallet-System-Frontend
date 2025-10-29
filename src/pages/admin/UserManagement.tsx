/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Role } from "@/constants/role";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/Modules/Common/Loader";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/user.api";
import { type IUser } from "@/types/auth.type";
import { useGetSingleWalletQuery } from "@/redux/features/wallet/wallet.api";
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Eye,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "./admin.constants";
import type { TStatus } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Tk from "@/assets/Tk";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>("");
  const [filterRole, setFilterRole] = useState<string | undefined>("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { data: singleWalletData, isLoading: isWalletLoading } = useGetSingleWalletQuery(
    selectedUser?.wallet as string,
    {
      skip: !selectedUser?.wallet,
    }
  );

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    page: page.toString(),
    limit: "10",
    searchTerm: searchTerm || undefined,
    status: filterStatus === "" ? undefined : filterStatus,
    role: filterRole === "" ? undefined : filterRole,
  });
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [blockingId, setBlockingId] = useState<string | null>(null);
  const [unblockingId, setUnblockingId] = useState<string | null>(null);

  const handleBlockUnblock = async (id: string, currentStatus: TStatus) => {
    const newStatus = currentStatus === Status.ACTIVE ? Status.BLOCKED : Status.ACTIVE;
    if (newStatus === Status.BLOCKED) {
      setBlockingId(id);
    } else {
      setUnblockingId(id);
    }
    try {
      await updateUserStatus({ id, data: { status: newStatus } }).unwrap();
      toast.success(`User ${newStatus === Status.BLOCKED ? "blocked" : "unblocked"} successfully!`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${newStatus === Status.BLOCKED ? "block" : "unblock"} user.`);
    } finally {
      setBlockingId(null);
      setUnblockingId(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const users = usersData?.data?.data || [];
  const meta = usersData?.data?.meta;

  const handleSearch = () => {
    setPage(1);
    refetch();
  };

  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
    setPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setFilterRole(value);
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilterRole("");
    setPage(1);
    refetch();
  };

  return (
    <Dialog>
      <div className="space-y-8">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">All Users</CardTitle>
            <CardDescription>Manage all user accounts in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 pr-4 py-2 rounded-md w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Select onValueChange={handleStatusFilterChange} value={filterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Status).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleRoleFilterChange} value={filterRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Role).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch}>Search</Button>
              <Button variant="outline" onClick={handleResetFilter}>Reset</Button>
            </div>

            {users.length === 0 ? (
              <p className="text-muted-foreground text-center">No users found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: IUser) => (
                    <TableRow key={user._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === Status.ACTIVE ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {user.status === Status.ACTIVE ? (
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleBlockUnblock(user._id!, user.status)}
                            disabled={blockingId === user._id || user.role === Role.ADMIN}
                          >
                            {blockingId === user._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Ban className="h-4 w-4" />
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="icon"
                            onClick={() => handleBlockUnblock(user._id!, user.status)}
                            disabled={unblockingId === user._id}
                          >
                            {unblockingId === user._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-end items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Page {meta?.page} of {meta?.totalPage}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, meta?.totalPage || 1))
                }
                disabled={page === meta?.totalPage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {selectedUser && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected user.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Name</span>
                <span className="font-semibold flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" /> {selectedUser.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {selectedUser.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-semibold flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> {selectedUser.phone}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Role</span>
                <span className="font-semibold">{selectedUser.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={cn(
                    "font-semibold",
                    selectedUser.status === Status.ACTIVE
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {selectedUser.status}
                </span>
              </div>
              {selectedUser.agentStatus && selectedUser.role === Role.AGENT && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Agent Status</span>
                  <span className="font-semibold flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1" /> {selectedUser.agentStatus}
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

export default UserManagement;