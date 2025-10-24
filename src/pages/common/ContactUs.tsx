import { MapPin, Mail, Phone, Send, Clock } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    await new Promise((resolve) => setTimeout(resolve, 2000)); 

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setIsSubmitted(false), 5000);

    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Unified Background Blobs*/}
      <div className="absolute top-12 -left-8 w-72 h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="hidden lg:block absolute top-40 right-8 w-56 h-56 lg:w-80 lg:h-80 bg-primary/5 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute -top-8 -right-14 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-8 -right-12 w-64 h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />
      <div className="absolute bottom-6 -left-8 w-56 h-56 lg:w-72 lg:h-72 bg-primary/10 rounded-full blur-3xl animate-slow-spin" />

      <div className="relative z-10 pt-15 md:pt-15">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          {/* Get in Touch Section */}
          <div className="mt-12 pb-12 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Address */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Our Office</h3>
                <p className="text-muted-foreground">123 Wallet Street, Digital City, 12345</p>
              </div>

              {/* Email */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <Mail className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground">contact@vaultpay.com</p>
              </div>

              {/* Phone */}
              <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
              </div>

              {/* Business Hours */}
              <div className="lg:col-span-3 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12 pb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Send us a Message
            </h2>
            <div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border border-border rounded-lg p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-muted-foreground text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-muted-foreground text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-muted-foreground text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-muted-foreground text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-secondary/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
                {isSubmitted && (
                  <p className="text-green-500 text-center mt-4">Email sent successfully! Thank you for contacting us.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;