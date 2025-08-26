import { Shield, Zap, MapPin, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.05)_25%,hsl(var(--primary)/0.05)_50%,transparent_50%,transparent_75%,hsl(var(--primary)/0.05)_75%)] bg-[length:2rem_2rem]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">Next-Gen Security</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Shielding Your
              <span className="bg-gradient-security bg-clip-text text-transparent"> Digital World</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              GenShield is the next-generation OTP fraud prevention tool that tracks real-time OTP generation, 
              providing contextual insights and intelligent fraud detection to protect you from digital threats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="security" size="xl">
                <Shield className="h-5 w-5" />
                Start Protection
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Zap className="h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-primary-foreground/60">Fraud Detection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-primary-foreground/60">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">0.1s</div>
                <div className="text-sm text-primary-foreground/60">Response Time</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="relative">
            <Card className="p-6 bg-gradient-card shadow-glow">
              <img 
                src={heroDashboard} 
                alt="GenShield Security Dashboard" 
                className="w-full rounded-lg shadow-card"
              />
              
              {/* Floating Alert Cards */}
              <div className="absolute -top-4 -right-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground p-3 rounded-lg shadow-elegant animate-pulse">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Fraud Detected</span>
                </div>
                <p className="text-xs mt-1">Suspicious OTP request blocked</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-accent/90 backdrop-blur-sm text-accent-foreground p-3 rounded-lg shadow-elegant">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Location Verified</span>
                </div>
                <p className="text-xs mt-1">OTP request from trusted location</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;