import { Shield, Zap, Gem } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      {/* Unified Background Blobs*/}
      <div
        className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl animate-slow-spin 
       "
      />
      <div
        className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-slow-spin 
       "
      />
      <div
        className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin 
       "
      />
      <div
        className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin 
       "
      />
      <div
        className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-primary/5 rounded-full blur-3xl animate-slow-spin 
       "
      />
      <div className="relative z-10 pt-15 md:pt-15">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About VaultPay
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              At VaultPay, we are revolutionizing the way you manage your
              digital finances. Our mission is to provide a secure, seamless,
              and intuitive platform that empowers individuals and businesses to
              control their money with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Mission Section */}
            <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                To build the most trusted and user-friendly digital wallet
                system, enabling secure and efficient financial transactions for
                everyone, everywhere. We strive to innovate continuously,
                ensuring our platform remains at the forefront of financial
                technology.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground">
                To create a world where financial services are accessible,
                transparent, and effortless for all. We envision a future where
                VaultPay is synonymous with digital financial freedom and
                security.
              </p>
            </div>
          </div>

          {/* Why Choose VaultPay Section */}
          <div className="mt-20 pb-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Why Choose VaultPay?
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Experience the future of digital finance with VaultPay. We are
              committed to providing you with unparalleled security,
              convenience, and innovation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Shield className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Unwavering Security
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your financial safety is our top priority. We employ advanced
                  encryption and multi-layered security protocols.
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Blazing Fast Transactions
                </h3>
                <p className="text-muted-foreground text-sm">
                  Send and receive money instantly, anytime, anywhere. No more
                  waiting.
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300">
                <Gem className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Intuitive User Experience
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our platform is designed for simplicity and ease of use,
                  making digital finance accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
