import { Shield, Menu, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import genShieldLogo from "@/assets/genshield-logo.png";

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={genShieldLogo} alt="GenShield Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GenShield
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="#security" className="text-muted-foreground hover:text-primary transition-smooth">
              Security
            </a>
            <a href="#enterprise" className="text-muted-foreground hover:text-primary transition-smooth">
              Enterprise
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="hero" size="sm">
              <User className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;