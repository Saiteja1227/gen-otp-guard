import { Shield, MapPin, Clock, AlertTriangle, Smartphone, Brain, Lock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Real-Time OTP Tracking",
      description: "Monitor every OTP generation with contextual insights including location, time, and purpose.",
      badge: "Core Feature",
      color: "bg-accent/10 text-accent border-accent/20"
    },
    {
      icon: Brain,
      title: "AI Fraud Detection",
      description: "Advanced machine learning algorithms detect suspicious patterns and prevent fraud before it happens.",
      badge: "AI-Powered",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: MapPin,
      title: "Location-Based Protection",
      description: "Detect unusual location changes and verify OTP requests from trusted geographical areas.",
      badge: "Geo-Security",
      color: "bg-accent/10 text-accent border-accent/20"
    },
    {
      icon: AlertTriangle,
      title: "Instant Fraud Alerts",
      description: "Get immediate notifications when suspicious OTP activity is detected on your accounts.",
      badge: "Real-Time",
      color: "bg-destructive/10 text-destructive border-destructive/20"
    },
    {
      icon: Clock,
      title: "Behavioral Analysis",
      description: "Analyze usage patterns, timing, and frequency to identify potential security threats.",
      badge: "Smart Analytics",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Support",
      description: "Seamless protection across web browsers, mobile apps, and enterprise systems.",
      badge: "Cross-Platform",
      color: "bg-accent/10 text-accent border-accent/20"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Advanced security features for businesses with admin dashboards and API integration.",
      badge: "Enterprise",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: TrendingUp,
      title: "Scalable SaaS Solution",
      description: "From individual users to large enterprises - GenShield scales with your security needs.",
      badge: "Scalable",
      color: "bg-accent/10 text-accent border-accent/20"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Comprehensive Protection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced Security Features
          </h2>
          <p className="text-lg text-muted-foreground">
            GenShield combines cutting-edge technology with intelligent analysis to provide 
            comprehensive protection against OTP fraud and digital threats.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-smooth hover:-translate-y-1 bg-gradient-card border-0 shadow-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className={feature.color}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to experience next-generation OTP security?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-smooth">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-smooth">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;