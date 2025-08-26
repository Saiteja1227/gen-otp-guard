import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "GenShield - Next-Gen OTP Fraud Prevention | Real-Time Security Protection";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'GenShield provides advanced OTP fraud prevention with real-time monitoring, AI-powered threat detection, and location-based security. Protect your digital identity from fraud, SIM swapping, and phishing attacks.'
      );
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "GenShield",
      "description": "Next-generation OTP fraud prevention tool with real-time monitoring and AI-powered threat detection",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <Features />
        
        {/* Dashboard Preview */}
        <Dashboard />
        
        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4">GenShield</h3>
                <p className="text-primary-foreground/80 mb-4 max-w-md">
                  Protecting your digital world with advanced OTP fraud prevention 
                  and real-time security monitoring.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-smooth">
                    Get Started
                  </button>
                  <button className="px-6 py-2 border border-primary-foreground/20 rounded-lg font-medium hover:bg-primary-foreground/10 transition-smooth">
                    Contact Sales
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-primary-foreground/80">
                  <li><a href="#features" className="hover:text-primary-foreground transition-smooth">Features</a></li>
                  <li><a href="#dashboard" className="hover:text-primary-foreground transition-smooth">Dashboard</a></li>
                  <li><a href="#security" className="hover:text-primary-foreground transition-smooth">Security</a></li>
                  <li><a href="#api" className="hover:text-primary-foreground transition-smooth">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-primary-foreground/80">
                  <li><a href="#about" className="hover:text-primary-foreground transition-smooth">About</a></li>
                  <li><a href="#careers" className="hover:text-primary-foreground transition-smooth">Careers</a></li>
                  <li><a href="#contact" className="hover:text-primary-foreground transition-smooth">Contact</a></li>
                  <li><a href="#support" className="hover:text-primary-foreground transition-smooth">Support</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-primary-foreground/60 text-sm">
                © 2024 GenShield. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-primary-foreground/60 mt-4 md:mt-0">
                <a href="#privacy" className="hover:text-primary-foreground transition-smooth">Privacy Policy</a>
                <a href="#terms" className="hover:text-primary-foreground transition-smooth">Terms of Service</a>
                <a href="#cookies" className="hover:text-primary-foreground transition-smooth">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;