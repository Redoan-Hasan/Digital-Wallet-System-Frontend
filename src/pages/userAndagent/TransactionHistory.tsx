import { useState } from "react";
import { useGetMyInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Modules/Common/Loader";
import { type ITransaction } from "@/types";
import { TransactionType } from "./user.constants";
import {
  ArrowLeftRight,
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Landmark,
  LogOut,
  Wallet,
} from "lucide-react";
import Tk from "@/assets/Tk";

const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | undefined>();
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null);

  const { data: userInfo } = useGetMyInfoQuery(undefined);

  const { data, isLoading, isError, refetch } = useGetMyTransactionsQuery({
    page: page.toString(),

    limit: "10",

    transactionType: filter ? filter : undefined,
  });

    const handleFilterChange = (value: string) => {

      setFilter(value);

      setPage(1);

    };

  

    const handleResetFilter = () => {

      setFilter(undefined);

      setPage(1);

    };

  const filteredTransactionTypes = Object.values(TransactionType).filter(
    (type) => {
      const role = userInfo?.data?.data?.role;

      if (role === "USER") {
        return (
          type !== TransactionType.ADD_MONEY_BY_AGENT &&
          type !== TransactionType.WITHDRAW_MONEY_BY_AGENT
        );
      }

      if (role === "AGENT") {
        return (
          type !== TransactionType.ADD && type !== TransactionType.WITHDRAW
        );
      }

      return true;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Failed to load transaction data.</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const transactions = data?.data?.data;
  console.log(transactions);
  const meta = data?.data?.meta;
  console.log(meta);

  const renderTxIcon = (type: string) => {
    switch (type) {
      case TransactionType.ADD:
        return <Wallet className="w-4 h-4 mr-2 text-green-500" />;
      case TransactionType.WITHDRAW:
        return <Landmark className="w-4 h-4 mr-2 text-red-500" />;
      case TransactionType.SEND_MONEY:
        return <ArrowRightLeft className="w-4 h-4 mr-2 text-blue-500" />;
      case TransactionType.CASH_IN:
        return <ArrowLeftRight className="w-4 h-4 mr-2 text-purple-500" />;
      case TransactionType.CASH_OUT:
        return <LogOut className="w-4 h-4 mr-2 text-orange-500" />;
      case TransactionType.ADD_MONEY_BY_AGENT:
        return <ArrowLeftRight className="w-4 h-4 mr-2 text-green-500" />;
      case TransactionType.WITHDRAW_MONEY_BY_AGENT:
        return <ArrowRightLeft className="w-4 h-4 mr-2 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Failed":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <Dialog>
      <Card className=" bg-transparent border-primary">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View your recent transactions and their statuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center gap-2">
              <Select onValueChange={handleFilterChange} value={filter || ""}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTransactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleResetFilter} variant="outline">
                Reset
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.map((tx: ITransaction) => (
                  <TableRow key={tx._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {renderTxIcon(tx.transactionType)}
                        {tx.transactionType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start">
                        <Tk width={18} height={18} /> {tx.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start">
                        <Tk width={18} height={18} />{" "}
                        {tx.transactionFee.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className={getStatusClass(tx.status)}>
                      {tx.status}
                    </TableCell>
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedTx(tx)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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

      {selectedTx && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span
                className={`font-semibold ${getStatusClass(selectedTx.status)}`}
              >
                {selectedTx.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span className="font-semibold">
                {new Date(selectedTx.createdAt).toLocaleString()}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold flex items-center">
                <Tk className="h-4 w-4 mr-1" /> {selectedTx.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-semibold flex items-center">
                <Tk className="h-4 w-4 mr-1" />{" "}
                {selectedTx.transactionFee.toFixed(2)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Type</span>
              <span className="font-semibold">{selectedTx.transactionType}</span>
            </div>

            {selectedTx.transactionType === TransactionType.ADD &&
              selectedTx.addMoneySource && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-semibold">
                    {selectedTx.addMoneySource}
                  </span>
                </div>
              )}

            {selectedTx.transactionType === TransactionType.WITHDRAW &&
              selectedTx.withdrawMoneySource && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-semibold">
                    {selectedTx.withdrawMoneySource}
                  </span>
                </div>
              )}

            {(selectedTx.transactionType === TransactionType.SEND_MONEY ||
              selectedTx.transactionType === TransactionType.CASH_OUT ||
              selectedTx.transactionType ===
                TransactionType.ADD_MONEY_BY_AGENT) &&
              selectedTx.receiverWallet?.user && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-semibold">
                      {userInfo?.data?.data?.name} (You)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-semibold">
                      {selectedTx.receiverWallet.user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Receiver Phone
                    </span>
                    <span className="font-semibold">
                      {selectedTx.receiverWallet.user.phone}
                    </span>
                  </div>
                </>
              )}

            {(selectedTx.transactionType === TransactionType.CASH_IN ||
              selectedTx.transactionType ===
                TransactionType.WITHDRAW_MONEY_BY_AGENT) &&
              selectedTx.senderWallet?.user && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-semibold">
                      {selectedTx.senderWallet.user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sender Phone</span>
                    <span className="font-semibold">
                      {selectedTx.senderWallet.user.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-semibold">
                      {userInfo?.data?.data?.name} (You)
                    </span>
                  </div>
                </>
              )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TransactionHistory;
