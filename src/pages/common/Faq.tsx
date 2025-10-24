import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  const faqItems = [
    {
      question: "What is VaultPay?",
      answer:
        "VaultPay is a robust and secure digital wallet system designed to handle financial transactions efficiently. It provides a multi-tenant environment supporting Users, Agents, and Admins, built with modern technologies like Node.js, Express, and TypeScript.",
    },
    {
      question: "What are the main roles supported by the system?",
      answer:
        "The system supports three distinct roles: Users (primary consumers who send and receive money), Agents (intermediaries who facilitate cash-in/cash-out operations), and Admins (superusers who oversee the health and security of the entire system).",
    },
    {
      question: "How does VaultPay ensure transaction security?",
      answer:
        "All transactions are atomic and logged for traceability, ensuring data integrity and a reliable audit trail. Strong security foundations like JWT for authentication and bcryptjs for password hashing are implemented to protect user data.",
    },
    {
      question: "How do I send money to another user?",
      answer:
        "You can easily send money to any other registered VaultPay user directly from your wallet. Simply navigate to the 'Send Money' section in your application, enter the recipient's details and the amount, and confirm the transaction.",
    },
    {
      question: "How can I add money to my VaultPay wallet?",
      answer:
        "You can add money to your wallet through various convenient methods, including linking your bank account or utilizing a cash-in service provided by an authorized VaultPay agent.",
    },
    {
      question: "How can I withdraw money from my VaultPay wallet?",
      answer:
        "To withdraw money from your wallet, you can initiate a cash-out request within the application. This process is typically facilitated by visiting an authorized VaultPay agent who will assist you with the withdrawal.",
    },
    {
      question: "Are there any fees for transactions?",
      answer:
        "VaultPay strives to keep transaction fees minimal. Specific fees may apply for certain services like cash-in/cash-out operations or international transfers. Please refer to our detailed fee structure within the application or on our website for more information.",
    },
    {
      question: "What should I do if I forget my password or PIN?",
      answer:
        "If you forget your password, you can use the 'Forgot Password' option on the login screen to securely reset it. For your transaction PIN, a secure recovery process is available within your account settings to help you regain access.",
    },
    {
      question: "What can an Admin do in the system?",
      answer:
        "Admins have complete oversight, including agent management (approving pending requests and viewing approved agents), accessing dashboard-ready system-wide statistics, managing users and wallets (view, block/unblock), and viewing all system transactions.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Find answers to the most common questions about VaultPay's Digital Wallet System.
            </p>
          </div>

          <div className="mt-12 pb-20 max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`h-6 w-6 text-primary transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;