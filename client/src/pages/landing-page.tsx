import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import generatedImage from '@assets/generated_images/abstract_3d_cyber_finance_network.png';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Dabloan<span className="text-white">Verse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Governance</a>
            <a href="#" className="hover:text-primary transition-colors">Developers</a>
          </div>
          <div className="flex items-center gap-4">
            <AuthModal />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                V2 Protocol Live
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                Lend & Borrow <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary animate-gradient bg-300%">
                  Without Limits
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                The most advanced decentralized liquidity protocol. Earn interest on deposits and borrow assets instantly with full transparency.
              </p>
              <div className="flex flex-wrap gap-4">
                <AuthModal trigger={
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full neon-glow bg-primary text-primary-foreground hover:bg-primary/90">
                    Launch App <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Button>
                } />
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5">
                  Read Docs
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                <div>
                  <div className="text-3xl font-display font-bold text-white mb-1">$4.2B</div>
                  <div className="text-sm text-muted-foreground">Total Value Locked</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white mb-1">12+</div>
                  <div className="text-sm text-muted-foreground">Markets Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white mb-1">&lt;0.1%</div>
                  <div className="text-sm text-muted-foreground">Transaction Fees</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card/30 backdrop-blur-sm">
                <img 
                  src={generatedImage} 
                  alt="DeFi Network" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Cards Mockup */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 p-4 rounded-xl bg-card/80 backdrop-blur-xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-500 font-bold">USDC</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Supply APY</div>
                      <div className="text-lg font-bold text-primary">5.84%</div>
                    </div>
                  </div>
                </motion.div>

                 <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 right-10 p-4 rounded-xl bg-card/80 backdrop-blur-xl border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-500 font-bold">ETH</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Borrow APY</div>
                      <div className="text-lg font-bold text-white">3.2%</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why choose Dabloan?</h2>
            <p className="text-muted-foreground text-lg">Built for professionals, designed for everyone. Experience the future of finance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                desc: "Audited smart contracts and insurance fund protection for your peace of mind."
              },
              {
                icon: TrendingUp,
                title: "Best-in-Class Rates",
                desc: "Algorithmic interest rate model ensures optimal yields for suppliers and fair rates for borrowers."
              },
              {
                icon: Globe,
                title: "Cross-Chain Ready",
                desc: "Seamlessly move assets across multiple networks with our unified liquidity layer."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
