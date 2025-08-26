import { Shield, AlertTriangle, CheckCircle, MapPin, Clock, Smartphone, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const recentActivity = [
    {
      id: 1,
      service: "Banking App",
      location: "New York, US",
      time: "2 mins ago",
      status: "verified",
      risk: "low"
    },
    {
      id: 2,
      service: "Email Login",
      location: "Unknown Location",
      time: "5 mins ago", 
      status: "blocked",
      risk: "high"
    },
    {
      id: 3,
      service: "Shopping Site",
      location: "New York, US",
      time: "12 mins ago",
      status: "verified",
      risk: "low"
    },
    {
      id: 4,
      service: "Social Media",
      location: "California, US",
      time: "1 hour ago",
      status: "flagged",
      risk: "medium"
    }
  ];

  const stats = [
    {
      title: "Total OTPs Today",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Smartphone
    },
    {
      title: "Threats Blocked",
      value: "3", 
      change: "+200%",
      trend: "up",
      icon: Shield
    },
    {
      title: "Risk Score",
      value: "Low",
      change: "-25%",
      trend: "down",
      icon: AlertTriangle
    },
    {
      title: "Protected Services",
      value: "12",
      change: "+2",
      trend: "up", 
      icon: CheckCircle
    }
  ];

  return (
    <section id="dashboard" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Security Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Real-Time Protection Monitoring
          </h2>
          <p className="text-lg text-muted-foreground">
            Monitor your OTP security status, view recent activity, and manage threat protection 
            from your comprehensive GenShield dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent OTP Activity
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'verified' ? 'bg-accent' :
                        activity.status === 'blocked' ? 'bg-destructive' :
                        'bg-warning'
                      }`} />
                      <div>
                        <div className="font-medium">{activity.service}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {activity.location} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        activity.status === 'verified' ? 'default' :
                        activity.status === 'blocked' ? 'destructive' :
                        'secondary'
                      }>
                        {activity.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Status */}
              <div className="text-center p-6 rounded-lg bg-accent/10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-2">Protected</div>
                <div className="text-sm text-muted-foreground">
                  All systems secure
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button variant="security" size="sm" className="w-full">
                  <AlertTriangle className="h-4 w-4" />
                  Report Suspicious Activity
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-4 w-4" />
                  Update Trusted Locations
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  <Clock className="h-4 w-4" />
                  View Security Timeline
                </Button>
              </div>

              {/* Security Score */}
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Security Score</span>
                  <span className="text-2xl font-bold text-accent">95</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '95%' }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Excellent security posture
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;