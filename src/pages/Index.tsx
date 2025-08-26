import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import { OtpTracker } from "@/components/OtpTracker";
import { CallTracker } from "@/components/CallTracker";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.phone || 'User'}
            </h1>
            <p className="text-muted-foreground">
              Monitor your OTP activity and protect against fraud
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        
        {/* OTP and Call Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OtpTracker />
          <CallTracker />
        </div>
        
        {/* Dashboard */}
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;