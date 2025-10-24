import { KeyRound, Lock, ShieldCheck } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: <Lock className="w-10 h-10 text-blue-500" />,
      bgColor: "bg-blue-500/10",
      title: "Secure Credential Hashing",
      description: "Your passwords and PINs are never stored in plain text. We use the industry-standard bcrypt hashing algorithm to keep your credentials safe.",
    },
    {
      icon: <KeyRound className="w-10 h-10 text-amber-500" />,
      bgColor: "bg-amber-500/10",
      title: "JWT Authentication",
      description: "Every session and request is protected by stateless JSON Web Tokens (JWT), ensuring that only authorized users can access their accounts and data.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />,
      bgColor: "bg-emerald-500/10",
      title: "Robust Data Validation",
      description: "We enforce strict data validation at the runtime level using Zod. This prevents malformed data and protects our system from common vulnerabilities.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Security You Can Trust</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your security is our top priority. Our platform is built with multiple layers of protection to keep your data and funds safe.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-background/80 backdrop-blur-sm border rounded-lg shadow-sm hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto ${feature.bgColor}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
