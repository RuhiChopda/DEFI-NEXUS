import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Wallet, TrendingUp, ArrowDownRight, ArrowUpRight, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

export function Dashboard() {
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
            <div className="text-2xl font-bold font-display">$45,231.89</div>
            <p className="text-xs text-primary flex items-center mt-1">
              +20.1% <ArrowUpRight className="w-3 h-3 ml-1" /> <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supplied</CardTitle>
            <Wallet className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">$32,450.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              Generating $12.45/day
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Borrowed</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">$12,781.89</div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full" style={{ width: "45%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Health Factor: 1.85</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net APY</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">4.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. across all positions
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
                <AreaChart data={data}>
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
              {[
                { type: "Supply", asset: "USDC", amount: "+ 500.00", time: "2 mins ago" },
                { type: "Borrow", asset: "ETH", amount: "+ 1.20", time: "4 hours ago" },
                { type: "Repay", asset: "DAI", amount: "- 200.00", time: "1 day ago" },
                { type: "Supply", asset: "WBTC", amount: "+ 0.05", time: "2 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/5 ${
                      item.type === "Supply" ? "bg-primary/10 text-primary" : 
                      item.type === "Borrow" ? "bg-orange-500/10 text-orange-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {item.type === "Supply" ? <ArrowUpRight className="w-4 h-4" /> : 
                       item.type === "Borrow" ? <ArrowDownRight className="w-4 h-4" /> :
                       <TrendingUp className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{item.type} {item.asset}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}