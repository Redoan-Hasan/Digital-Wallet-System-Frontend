import { LoginForm } from "@/components/Modules/Common/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="relative bg-background overflow-hidden flex items-center justify-center py-12">
      {/* Unified Background Blobs*/}
      <div className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-4">
        <Card className="p-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border shadow-lg overflow-hidden md:max-w-2xl lg:max-w-7xl mx-auto">
          <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Image Column - Now visible on all devices, on top for mobile/tablet */}
            <div className="flex items-center justify-center h-[300px] md:h-[520px] lg:h-[550px] order-1 lg:order-0">
              <img
                src="/loginphoto.jpg"
                alt="Login Illustration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Login Form Column */}
            <div className="flex items-center justify-center w-full h-[450px] md:h-[500px] lg:h-[550px] px-4 order-2 lg:order-0">
              <div className="w-full max-w-md">
                <LoginForm />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
