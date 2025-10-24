import { User, Briefcase, Shield, Lock, Scaling, Users, Cpu } from "lucide-react";

const Features = () => {
  const userFeatures = [
    "Become an Agent: Request to upgrade your account to an AGENT account.",
    "Send Money: Instantly send money to any other registered user.",
    "Add & Withdraw Money: Add money to or withdraw money from your own wallet.",
    "View Wallet & History: Check current wallet balance and view all past transactions.",
  ];

  const agentFeatures = [
    "Cash-In & Cash-Out: Add money to a user's wallet or facilitate cash withdrawals.",
    "Wallet & History: View your own wallet balance and transaction history.",
    "Transaction Management: View and manage all cash-in and cash-out requests.",
    "Add & Withdraw Money: Add money to or withdraw money from your own wallet.",
  ];

  const adminFeatures = [
    "Agent Management: Approve pending agent requests and view all approved agents.",
    "Complete Oversight: A dashboard-ready API to view system-wide statistics.",
    "User & Wallet Management: View all users, and wallets, and block/unblock any user's wallet.",
    "View All Transactions: Access a complete, auditable log of all system transactions.",
  ];

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Unified Background Blobs*/}
      <div className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10 pt-15 md:pt-15">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Features
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              VaultPay offers a comprehensive suite of features designed for
              Users, Agents, and Admins, ensuring a seamless and secure digital
              wallet experience for everyone.
            </p>
          </div>

          {/* Core Features */}
          <div className="mt-20 pb-20 text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Lock className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Secure Transactions
                </h3>
                <p className="text-muted-foreground text-sm">
                  All transactions are atomic and logged for traceability, ensuring data integrity and a reliable audit trail.
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Scaling className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Scalable Architecture
                </h3>
                <p className="text-muted-foreground text-sm">
                  Built with a clean, modular architecture that separates concerns, making it easy to maintain and scale.
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Users className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Role-Based Access
                </h3>
                <p className="text-muted-foreground text-sm">
                  A multi-tenant environment supporting three distinct roles: Users, Agents, and Admins.
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Cpu className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Modern Technology
                </h3>
                <p className="text-muted-foreground text-sm">
                  Leverages a modern and powerful stack to ensure scalability, security, and maintainability.
                </p>
              </div>
            </div>
          </div>

          {/* Role-Based Features */}
          <div className="max-w-6xl mx-auto mt-12 pb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Role-Based Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {/* User Features */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <User className="h-8 w-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-primary">
                    User Features
                  </h2>
                </div>
                <ul className="text-muted-foreground space-y-2 text-left">
                  {userFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agent Features */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-8 w-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-primary">
                    Agent Features
                  </h2>
                </div>
                <ul className="text-muted-foreground space-y-2 text-left">
                  {agentFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admin Features */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-primary">
                    Admin Features
                  </h2>
                </div>
                <ul className="text-muted-foreground space-y-2 text-left">
                  {adminFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;