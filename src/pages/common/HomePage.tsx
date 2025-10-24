import Security from "@/components/Modules/Home/Security";
import Hero from "@/components/Modules/Home/Hero";
import PlatformRoles from "@/components/Modules/Home/PlatformRoles";

const HomePage = () => {
  return (
    <div className="relative bg-background overflow-x-hidden">
      {/* Unified Background Blobs */}
      <div className="absolute top-20 -left-40 w-160 h-160 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-60 right-20 w-120 h-120 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute top-180 -left-60 w-160 h-160 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute top-340 -right-60 w-160 h-160 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-0 -left-40 w-160 h-160 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10">
        <Hero />
        <PlatformRoles />
        <Security />
      </div>
    </div>
  );
};

export default HomePage;
