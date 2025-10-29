/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useGetUserStatsQuery,
  useGetTransactionStatsQuery,
} from "@/redux/features/stats/stats.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, TrendingUp, DollarSign, Repeat } from "lucide-react";
import Tk from "@/assets/Tk";

const AxisStyle = { stroke: "var(--muted-foreground)", fontSize: 12 };
const TooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};
const TooltipValueStyle = { color: "var(--primary)" };

function formatNumber(n: number | undefined | null) {
  if (n == null || Number.isNaN(Number(n))) return "-";
  const num = Number(n);
  if (Math.abs(num) >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1) + "B";
  if (Math.abs(num) >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (Math.abs(num) >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return String(num);
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF66C4",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={TooltipStyle}>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={TooltipValueStyle}>
            {`${entry.name}: ${formatNumber(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const {
    data: userStatsResponse,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUserStatsQuery();
  const {
    data: transactionStatsResponse,
    isLoading: transactionLoading,
    isError: transactionError,
  } = useGetTransactionStatsQuery();

  const userStats = userStatsResponse?.data;
  const transactionStats = transactionStatsResponse?.data;

  // Prepare data for charts
  const userRoleData =
    userStats?.userByRole?.map((item: any) => ({
      name: item._id,
      value: item.count,
    })) || [];

  const transactionsByTypeData =
    transactionStats?.transactionsByType?.map((item: any) => ({
      name: item._id,
      value: item.count,
    })) || [];

  const totalTransactionAmountByTypeData =
    transactionStats?.totalTransationAmountByType?.map((item: any) => ({
      name: item._id,
      value: item.totalAmount,
    })) || [];

  const userTrendData = [
    { name: "Last 30 Days", value: userStats?.newUsersInLast30Days || 0 },
    { name: "Last 7 Days", value: userStats?.newUsersInLast7Days || 0 },
  ];

  const transactionTrendData = [
    {
      name: "Last 30 Days",
      value: transactionStats?.transactionsInLast30Days || 0,
    },
    {
      name: "Last 7 Days",
      value: transactionStats?.transactionsInLast7Days || 0,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                formatNumber(userStats?.totalUsers)
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {usersLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                `+${userStats?.newUsersInLast7Days || 0} in last 7 days`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactionLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                formatNumber(transactionStats?.totalTransaction)
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {transactionLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                `+${
                  transactionStats?.transactionsInLast7Days || 0
                } in last 7 days`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                formatNumber(userStats?.totalActiveUsers)
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {usersLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                `${(
                  ((userStats?.totalActiveUsers || 0) /
                    (userStats?.totalUsers || 1)) *
                  100
                ).toFixed(1)}% of total`
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {transactionLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <>
                  <Tk width={20} height={20} className="mr-1" />
                  {formatNumber(
                    totalTransactionAmountByTypeData.reduce(
                      (sum: number, item: any) => sum + item.value,
                      0
                    )
                  )}
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {transactionLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                `Across ${
                  transactionStats?.transactionsByType?.length || 0
                } types`
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User and Transaction Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>User Distribution by Role</CardTitle>
            <CardDescription>
              Breakdown of users across different roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            {usersLoading ? (
              <Skeleton className="h-full w-full" />
            ) : usersError ? (
              <div className="text-sm text-destructive">
                Failed to load user role stats.
              </div>
            ) : userRoleData.length === 0 ? (
              <p className="text-muted-foreground">
                No user role data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userRoleData.map((_entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>Transactions by Type (Count)</CardTitle>
            <CardDescription>
              Number of transactions for each type.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {transactionLoading ? (
              <Skeleton className="h-full w-full" />
            ) : transactionError ? (
              <div className="text-sm text-destructive">
                Failed to load transaction type stats.
              </div>
            ) : transactionsByTypeData.length === 0 ? (
              <p className="text-muted-foreground">
                No transaction type data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionsByTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" style={AxisStyle} />
                  <YAxis style={AxisStyle} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Amount by Type Chart */}
      <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Transaction Amount by Type</CardTitle>
          <CardDescription>
            Total monetary volume for each transaction type.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {transactionLoading ? (
            <Skeleton className="h-full w-full" />
          ) : transactionError ? (
            <div className="text-sm text-destructive">
              Failed to load transaction amount stats.
            </div>
          ) : totalTransactionAmountByTypeData.length === 0 ? (
            <p className="text-muted-foreground">
              No transaction amount data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalTransactionAmountByTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" style={AxisStyle} />
                <YAxis style={AxisStyle} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* User and Transaction Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>New User Trend</CardTitle>
            <CardDescription>
              New users in the last 7 and 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            {usersLoading ? (
              <Skeleton className="h-full w-full" />
            ) : usersError ? (
              <div className="text-sm text-destructive">
                Failed to load user trend data.
              </div>
            ) : userTrendData.length === 0 ? (
              <p className="text-muted-foreground">
                No user trend data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" style={AxisStyle} />
                  <YAxis style={AxisStyle} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#FFBB28" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>Transaction Trend</CardTitle>
            <CardDescription>
              Transactions in the last 7 and 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            {transactionLoading ? (
              <Skeleton className="h-full w-full" />
            ) : transactionError ? (
              <div className="text-sm text-destructive">
                Failed to load transaction trend data.
              </div>
            ) : transactionTrendData.length === 0 ? (
              <p className="text-muted-foreground">
                No transaction trend data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" style={AxisStyle} />
                  <YAxis style={AxisStyle} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#FF8042" name="Transactions" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
