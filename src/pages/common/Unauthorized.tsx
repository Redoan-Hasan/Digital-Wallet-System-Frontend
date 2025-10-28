import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="relative bg-background overflow-hidden flex items-center justify-center text-center px-4">
      {/* Unified Background Blobs */}
      <div className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-destructive/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-destructive/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-destructive/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-destructive/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-destructive/5 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10 max-w-md mx-auto">
        <div className="flex justify-center">
          <ShieldAlert className="w-24 h-24 text-destructive" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Access Denied
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You do not have the necessary permissions to access this page. Please
          contact an administrator if you believe this is an error.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
