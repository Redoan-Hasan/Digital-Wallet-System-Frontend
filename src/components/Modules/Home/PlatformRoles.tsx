import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserCog, Shield, CheckCircle2 } from "lucide-react";

const PlatformRoles = () => {
  const roles = [
    {
      value: "user",
      name: "User",
      icon: <User className="w-24 h-24 text-blue-500" />,
      title: "Empowering Every User",
      description:
        "Our platform provides a seamless and secure experience for every individual to manage their digital finances with confidence.",
      features: [
        "Instantly send money to any other registered user.",
        "Easily add funds to your wallet or withdraw money.",
        "View your complete, detailed transaction history anytime.",
        "Request an upgrade to an Agent account to expand your capabilities.",
      ],
    },
    {
      value: "agent",
      name: "Agent",
      icon: <UserCog className="w-24 h-24 text-emerald-500" />,
      title: "Facilitating the Flow of Funds",
      description:
        "As an Agent, you are a crucial part of the ecosystem, enabling users to move money between the digital and physical worlds.",
      features: [
        "Add money to a user's wallet through Cash-In operations.",
        "Facilitate cash withdrawals for users.",
        "Maintain your own wallet and view your transaction history.",
        "Earn commissions and grow your business with our platform.",
      ],
    },
    {
      value: "admin",
      name: "Admin",
      icon: <Shield className="w-24 h-24 text-rose-500" />,
      title: "Complete System Oversight",
      description:
        "Admins have the ultimate control and responsibility, ensuring the security, integrity, and health of the entire wallet system.",
      features: [
        "Approve or deny pending Agent account requests.",
        "View system-wide statistics on a comprehensive dashboard.",
        "Manage all users and wallets, including blocking or unblocking.",
        "Access a complete, auditable log of all system transactions.",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            A Platform for Everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our system is designed with distinct roles to create a secure and
            efficient financial ecosystem for all participants.
          </p>
        </div>

        <Tabs defaultValue="user" className="mt-12">
          <TabsList className="flex justify-center space-x-4 max-w-2xl mx-auto bg-transparent border-2 border-primary/30 rounded-lg p-1">
            {roles.map((role) => (
              <TabsTrigger
                key={role.value}
                value={role.value}
                className={
                  "px-3 py-2 text-base font-medium transition-all duration-200 rounded-md " +
                  "border-2 border-transparent bg-primary/15 hover:bg-primary/25 text-primary " +
                  "data-[state=active]:border-primary data-[state=active]:bg-primary/15 data-[state=active]:text-primary " +
                  "dark:data-[state=active]:border-primary dark:data-[state=active]:bg-primary/15"
                }
              >
                <div className="flex items-center space-x-2 text-primary">
                  {role.value === "user" && <User className="w-4 h-4" />}
                  {role.value === "agent" && <UserCog className="w-4 h-4" />}
                  {role.value === "admin" && <Shield className="w-4 h-4" />}
                  <span>{role.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {roles.map((role) => (
            <TabsContent
              key={role.value}
              value={role.value}
              className="mt-10 transition-all duration-300 animate-in fade-in-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary">
                    {role.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground">
                    {role.description}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center row-start-1 md:row-auto">
                  {role.icon}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PlatformRoles;
