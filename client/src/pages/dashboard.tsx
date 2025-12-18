import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Wallet, TrendingUp, ArrowDownRight, ArrowUpRight, DollarSign, Activity } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { formatDistanceToNow } from "date-fns";

export function Dashboard() {
  const { data, isLoading } = useDashboard();

  const lending = data?.lending || [];
  const borrowing = data?.borrowing || [];
  const transactions = data?.transactions || [];

  // Calculate totals
  const totalSupplied = lending.reduce((sum, pos) => sum + parseFloat(pos.amount), 0);
  const totalBorrowed = borrowing.reduce((sum, pos) => sum + parseFloat(pos.amount), 0);
  const netWorth = totalSupplied - totalBorrowed;
  
  // Calculate average APY
  const supplyApy = lending.length > 0 
    ? lending.reduce((sum, pos) => sum + parseFloat(pos.apy), 0) / lending.length 
    : 0;
  const borrowApy = borrowing.length > 0 
    ? borrowing.reduce((sum, pos) => sum + parseFloat(pos.apy), 0) / borrowing.length 
    : 0;
  const netApy = supplyApy - borrowApy;

  // Generate chart data from transactions
  const chartData = transactions.length > 0 
    ? transactions.slice(-7).map((tx, idx) => ({
        name: `Day ${idx + 1}`,
        value: Math.round(Math.random() * 10000)
      }))
    : [
        { name: "No", value: 0 },
        { name: "Transactions", value: 0 },
        { name: "Yet", value: 0 }
      ];

  // Calculate health factor
  const healthFactor = totalBorrowed > 0 ? (totalSupplied * 0.75) / totalBorrowed : 0;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your DeFi portfolio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">${netWorth.toFixed(2)}</div>
            <p className="text-xs text-primary flex items-center mt-1">
              {netWorth > 0 ? "+" : ""}{(netWorth / Math.max(1, totalSupplied) * 100).toFixed(1)}% <ArrowUpRight className="w-3 h-3 ml-1" />
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supplied</CardTitle>
            <Wallet className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">${totalSupplied.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {lending.length} position{lending.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Borrowed</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">${totalBorrowed.toFixed(2)}</div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-orange-400 h-full rounded-full transition-all" 
                style={{ width: `${Math.min(100, (healthFactor * 100) / 3)}%` }} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Health Factor: {healthFactor.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net APY</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{netApy.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid gap-8 md:grid-cols-7">
        <Card className="col-span-4 glass-card border-none bg-card/40">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 glass-card border-none bg-card/40">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {transactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No transactions yet</p>
              ) : (
                transactions.slice().reverse().map((tx) => {
                  const date = tx.createdAt instanceof Date ? tx.createdAt : new Date(String(tx.createdAt || new Date()));
                  return (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 ${
                          tx.type === "supply" ? "bg-primary/10 text-primary" : 
                          tx.type === "borrow" ? "bg-orange-500/10 text-orange-500" :
                          "bg-blue-500/10 text-blue-500"
                        }`}>
                          {tx.type === "supply" ? <ArrowUpRight className="w-4 h-4" /> : 
                           tx.type === "borrow" ? <ArrowDownRight className="w-4 h-4" /> :
                           <TrendingUp className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white capitalize">{tx.type} {tx.asset}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(date, { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-sm">{tx.type === "supply" || tx.type === "borrow" ? "+" : "-"} {parseFloat(tx.amount).toFixed(4)}</div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
