import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { MessageSquare, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface OtpLog {
  id: string;
  sender_number: string;
  sender_name: string | null;
  otp_code: string;
  message_content: string;
  purpose: string | null;
  location: any;
  risk_level: 'low' | 'medium' | 'high';
  is_suspicious: boolean;
  received_at: string;
}

export const OtpTracker = () => {
  const [otpLogs, setOtpLogs] = useState<OtpLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    fetchOtpLogs();

    // Set up real-time subscription for new OTPs
    const channel = supabase
      .channel('otp-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'otp_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setOtpLogs(current => [payload.new as OtpLog, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchOtpLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('otp_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('received_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setOtpLogs((data as OtpLog[]) || []);
    } catch (error) {
      console.error('Error fetching OTP logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      default: return 'secondary';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent OTP Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Recent OTP Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {otpLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No OTP activity yet</p>
            <p className="text-sm mt-1">Your OTP logs will appear here when you receive them</p>
          </div>
        ) : (
          <div className="space-y-4">
            {otpLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{log.sender_name || log.sender_number}</span>
                      <Badge variant={getRiskColor(log.risk_level)}>
                        {log.risk_level} risk
                      </Badge>
                      {log.is_suspicious && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Suspicious
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {log.message_content}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>OTP: {log.otp_code}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{formatTime(log.received_at)}</span>
                  </div>
                </div>

                {log.purpose && (
                  <div className="text-sm">
                    <span className="font-medium">Purpose: </span>
                    <span className="text-muted-foreground">{log.purpose}</span>
                  </div>
                )}

                {log.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {log.location.city}, {log.location.country}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};