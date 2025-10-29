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
import { Button } from "@/components/ui/button";
import Loader from "@/components/Modules/Common/Loader";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { ChevronLeft, ChevronRight, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import type { ITransaction } from "@/types";
import { TransactionType } from "../userAndagent/user.constants";
import { format } from "date-fns";

const SystemTransactions = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTransactionType, setFilterTransactionType] = useState<
    string | undefined
  >("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const {
    data: transactionsData,
    isLoading,
    refetch,
  } = useGetAllTransactionsQuery({
    page: page.toString(),
    limit: "10",
    searchTerm: searchTerm || undefined,
    transactionType:
      filterTransactionType === "" ? undefined : filterTransactionType,
  });

  const handleSearch = () => {
    setPage(1);
    refetch();
  };

  const handleTransactionTypeFilterChange = (value: string) => {
    setFilterTransactionType(value);
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setFilterTransactionType("");
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  const transactions = transactionsData?.data?.data || [];
  const meta = transactionsData?.data?.meta;

  return (
    <Dialog>
      <div className="space-y-8">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              System Transactions
            </CardTitle>
            <CardDescription>Manage all system transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by transaction type, amount, status..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 pr-4 py-2 rounded-md w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Select
                onValueChange={handleTransactionTypeFilterChange}
                value={filterTransactionType}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TransactionType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch}>Search</Button>
              <Button variant="outline" onClick={handleResetFilter}>
                Reset
              </Button>
            </div>

            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No transactions found.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(
                    (transaction: ITransaction, index: number) => (
                      <TableRow
                        key={transaction._id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {transaction.transactionType.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell className="p-0">
                          <div className="flex items-center justify-start">
                            <Tk className="mr-1" /> {transaction.amount}
                          </div>
                        </TableCell>
                        <TableCell className="p-0">
                          <div className="flex items-center justify-start">
                            <Tk className="mr-1" /> {transaction.transactionFee}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-semibold",
                              transaction.status === "COMPLETED" &&
                                "bg-green-100 text-green-800",
                              transaction.status === "PENDING" &&
                                "bg-yellow-100 text-yellow-800",
                              transaction.status === "REVERSED" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(transaction.createdAt), "PPP p")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setSelectedTransaction(transaction)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    )
                  )}
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

        {selectedTransaction && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected transaction.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-semibold">{selectedTransaction._id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold">
                  {selectedTransaction.transactionType.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold flex items-center">
                  <Tk className="mr-1" /> {selectedTransaction.amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-semibold flex items-center">
                  <Tk className="mr-1" /> {selectedTransaction.transactionFee}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={cn(
                    "font-semibold",
                    selectedTransaction.status === "COMPLETED" &&
                      "text-green-500",
                    selectedTransaction.status === "PENDING" &&
                      "text-yellow-500",
                    selectedTransaction.status === "REVERSED" && "text-red-500"
                  )}
                >
                  {selectedTransaction.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">
                  {format(new Date(selectedTransaction.createdAt), "PPP p")}
                </span>
              </div>

              {selectedTransaction.senderWallet && (
                <>
                  <Separator />
                  <h3 className="text-lg font-semibold">Sender Information</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sender Name</span>
                    <span className="font-semibold">
                      {selectedTransaction.senderWallet.user?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sender Email</span>
                    <span className="font-semibold">
                      {selectedTransaction.senderWallet.user?.email || "N/A"}
                    </span>
                  </div>
                </>
              )}

              {selectedTransaction.receiverWallet && (
                <>
                  <Separator />
                  <h3 className="text-lg font-semibold">
                    Receiver Information
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Receiver Name</span>
                    <span className="font-semibold">
                      {selectedTransaction.receiverWallet.user?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Receiver Email
                    </span>
                    <span className="font-semibold">
                      {selectedTransaction.receiverWallet.user?.email || "N/A"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
};

export default SystemTransactions;
