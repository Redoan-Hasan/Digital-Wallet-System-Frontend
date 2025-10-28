import { RegisterForm } from "@/components/Modules/Common/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  return (
    <div className="relative bg-background overflow-hidden min-h-[calc(100vh-2562px)] flex items-center justify-center py-12">
      {/* Unified Background Blobs*/}
      <div className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-4">
        <Card className="p-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border shadow-lg overflow-hidden md:max-w-2xl lg:max-w-7xl mx-auto">
          <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Register Form Column */}
            <div className="flex items-center justify-center w-full h-full px-4 order-2 lg:order-1 py-12">
              <div className="w-full max-w-md">
                <RegisterForm />
              </div>
            </div>
            {/* Image Column */}
            <div className="flex items-center justify-center h-[300px] md:h-[520px] lg:h-auto order-1 lg:order-2">
              <img
                src="/loginphoto.jpg"
                alt="Register Illustration"
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
