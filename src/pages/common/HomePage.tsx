import Hero from "@/components/Modules/Home/Hero";
import PlatformRoles from "@/components/Modules/Home/PlatformRoles";
import Security from "@/components/Modules/Home/Security";

const HomePage = () => {
  return (
    <div className="relative bg-background overflow-x-hidden">
      {/* Unified Background Blobs */}
      {/* Hero Left */}
      <div className="absolute top-20 -left-40 w-160 h-160 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      {/* Hero Right (Desktop Only) */}
      <div className="hidden lg:block absolute top-60 right-20 w-120 h-120 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      {/* PlatformRoles */}
      <div className="absolute top-180 -left-60 w-160 h-160 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      {/* Security */}
      <div className="absolute top-340 -right-60 w-160 h-160 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />

      {/* Page content is rendered on top */}
      <div className="relative z-10">
          <Hero />
          <PlatformRoles />
          <Security />
      </div>
    </div>
  );
};

export default HomePage;