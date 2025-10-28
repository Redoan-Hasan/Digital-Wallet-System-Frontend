import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Modules/Common/Loader";
import { Mail, ShieldCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Tk from "@/assets/Tk";

const MyWallet = () => {
  const { data, isLoading, isError, refetch } = useGetMyWalletQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Failed to load wallet data.</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const wallet = data.data[0];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        My Wallet
      </h1>
      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg overflow-hidden w-full">
        <CardHeader className="p-4 sm:p-6 bg-primary/10  flex flex-col items-center">
          <CardDescription className="text-muted-foreground text-base sm:text-lg">Current Balance</CardDescription>
          <CardTitle className="text-3xl sm:text-5xl font-bold text-primary tracking-tight flex items-center">
            <Tk width={36} height={36} /> {wallet.balance.toFixed(2)}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              Account Holder
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-muted-foreground" />
                <div className="text-foreground text-lg">
                  {wallet.user.name}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-muted-foreground" />
                <div className="text-foreground text-lg">
                  {wallet.user.email}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {" "}
            {/* Added more vertical spacing */}
            <h3 className="text-xl font-semibold text-foreground">
              Wallet Status
            </h3>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-muted-foreground" />
              <span
                className={cn(
                  "px-4 py-2 text-base font-semibold rounded-full", // Increased padding and text size
                  wallet.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                {wallet.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyWallet;
