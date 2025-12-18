import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const assets = [
  { symbol: "ETH", name: "Ethereum", supplyApy: "3.2%", borrowApy: "4.5%", liquidity: "$420M", price: "$2,450.00" },
  { symbol: "USDC", name: "USD Coin", supplyApy: "5.8%", borrowApy: "7.1%", liquidity: "$850M", price: "$1.00" },
  { symbol: "WBTC", name: "Wrapped BTC", supplyApy: "1.5%", borrowApy: "2.8%", liquidity: "$310M", price: "$42,100.00" },
  { symbol: "DAI", name: "Dai Stablecoin", supplyApy: "5.5%", borrowApy: "6.9%", liquidity: "$120M", price: "$1.00" },
  { symbol: "AAVE", name: "Aave", supplyApy: "4.2%", borrowApy: "5.5%", liquidity: "$80M", price: "$95.40" },
];

function ActionModal({ asset, type }: { asset: typeof assets[0], type: "Supply" | "Borrow" }) {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Transaction Submitted",
      description: `Successfully ${type.toLowerCase()}ed ${amount} ${asset.symbol}`,
    });
    setAmount("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={type === "Supply" ? "default" : "secondary"} 
          size="sm"
          className={type === "Supply" ? "bg-primary/20 text-primary hover:bg-primary/30 hover:text-white" : ""}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{type} {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Amount</span>
            <span>Balance: 0.00 {asset.symbol}</span>
          </div>
          <div className="relative">
            <Input 
              type="number" 
              placeholder="0.00" 
              className="pr-16 text-lg bg-black/20 border-white/10 h-14"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              {asset.symbol}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-lg">
            <div className="text-muted-foreground">APY</div>
            <div className="text-right font-mono text-primary">{type === "Supply" ? asset.supplyApy : asset.borrowApy}</div>
            <div className="text-muted-foreground">Health Factor</div>
            <div className="text-right font-mono text-green-500">1.05</div>
          </div>
          <Button className="w-full neon-glow font-bold text-lg h-12" onClick={handleAction}>
            Confirm {type}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Markets() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Markets</h2>
        <p className="text-muted-foreground">Available assets for lending and borrowing</p>
      </div>

      <div className="rounded-xl border border-white/5 bg-card/40 backdrop-blur-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Asset</TableHead>
              <TableHead className="text-right text-muted-foreground">Price</TableHead>
              <TableHead className="text-right text-muted-foreground">Total Supply</TableHead>
              <TableHead className="text-right text-muted-foreground">Supply APY</TableHead>
              <TableHead className="text-right text-muted-foreground">Borrow APY</TableHead>
              <TableHead className="text-center text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.symbol} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{asset.price}</TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">{asset.liquidity}</TableCell>
                <TableCell className="text-right font-mono text-primary font-bold">{asset.supplyApy}</TableCell>
                <TableCell className="text-right font-mono text-orange-400">{asset.borrowApy}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <ActionModal asset={asset} type="Supply" />
                    <ActionModal asset={asset} type="Borrow" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}