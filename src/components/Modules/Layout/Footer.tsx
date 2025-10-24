import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 bg-background py-4 md:py-6 overflow-hidden">
      {/* Light effect in footer */}
      <div className="absolute bottom-0 left-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-slow-spin -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo and Description */}
        <div className="flex flex-col items-center mb-4">
          <Link to="/" className="flex items-center space-x-2 mb-2">
            <img
              className="h-8 w-auto"
              src="/digital-wallet-system-logo-removebg-preview.png"
              alt="VaultPay"
            />
            <span className="text-2xl font-bold text-primary">VaultPay</span>
          </Link>
          <p className="text-muted-foreground text-sm mx-auto">
            Your secure and seamless digital wallet solution. Manage your
            finances with confidence and ease.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="javascript:void(0)"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook-icon lucide-facebook h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="javascript:void(0)"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter-icon lucide-twitter h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a
            href="javascript:void(0)"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram-icon lucide-instagram h-5 w-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="javascript:void(0)"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} VaultPay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
