import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  Lock,
  MoveRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  const styles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left Column: Text Content */}
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                    Secure Transactions,
                  </span>
                  <br />
                  Seamless Operations.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  Welcome to VaultPay, your all-in-one digital wallet solution.
                  Manage your finances with cutting-edge security, effortless
                  transactions, and powerful features, all in one place.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/login">
                  <Button size="lg" className="group">
                    Get Started
                    <MoveRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button></Link>
              </div>
            </div>

            {/* Right Column: Visual Element */}
            <div className="flex items-center justify-center relative min-h-[300px] lg:min-h-[400px] scale-75 md:scale-90 lg:scale-100 transition-transform duration-300">
              {/* Central Floating Card */}
              <div
                className="relative w-72 h-44 rounded-2xl bg-background/50 backdrop-blur-lg shadow-2xl shadow-primary/10 border border-white/10 animate-float flex flex-col items-center justify-center p-6 text-center"
                style={{ animationDuration: "8s" }}
              >
                <Wallet className="w-12 h-12 text-primary mb-2" />
                <p className="font-semibold text-foreground">Digital Wallet</p>
                <p className="text-xs text-muted-foreground">
                  Your assets, secured.
                </p>
              </div>

              {/* Floating Icon 1: Security */}
              <div
                className="absolute -top-4 -left-4 lg:top-10 lg:left-10 w-16 h-16 rounded-full bg-background/50 backdrop-blur-lg shadow-xl shadow-primary/10 border border-white/10 flex items-center justify-center animate-float transition-all duration-300"
                style={{ animationDelay: "1s" }}
              >
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>

              {/* Floating Icon 2: Transactions */}
              <div
                className="absolute -bottom-8 -right-4 lg:bottom-16 lg:right-0 w-16 h-16 rounded-full bg-background/50 backdrop-blur-lg shadow-xl shadow-primary/10 border border-white/10 flex items-center justify-center animate-float transition-all duration-300"
                style={{ animationDelay: "2s", animationDuration: "7s" }}
              >
                <ArrowRightLeft className="w-8 h-8 text-blue-500" />
              </div>

              {/* Floating Icon 3: Growth (Repositioned) */}
              <div
                className="absolute -top-4 -right-4 lg:top-10 lg:right-10 w-14 h-14 rounded-full bg-background/50 backdrop-blur-lg shadow-xl shadow-primary/10 border border-white/10 flex items-center justify-center animate-float transition-all duration-300"
                style={{ animationDelay: "3s", animationDuration: "8s" }}
              >
                <TrendingUp className="w-7 h-7 text-emerald-500" />
              </div>

              {/* Floating Icon 4: Privacy */}
              <div
                className="absolute -bottom-8 -left-4 lg:bottom-8 lg:left-24 w-14 h-14 rounded-full bg-background/50 backdrop-blur-lg shadow-xl shadow-primary/10 border border-white/10 flex items-center justify-center animate-float transition-all duration-300"
                style={{ animationDelay: "0.5s", animationDuration: "7s" }}
              >
                <Lock className="w-7 h-7 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
