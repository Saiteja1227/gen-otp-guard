import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Phone, Clock, MapPin, AlertTriangle, Shield } from 'lucide-react';

interface CallLog {
  id: string;
  caller_number: string;
  caller_name: string | null;
  caller_type: string | null;
  call_duration: number;
  call_time: string;
  is_spam: boolean;
  is_blocked: boolean;
  location: any;
}

export const CallTracker = () => {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    fetchCallLogs();

    // Set up real-time subscription for new calls
    const channel = supabase
      .channel('call-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'call_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setCallLogs(current => [payload.new as CallLog, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchCallLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('call_time', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCallLogs((data as CallLog[]) || []);
    } catch (error) {
      console.error('Error fetching call logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'Missed';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getCallerTypeColor = (type: string | null, isSpam: boolean) => {
    if (isSpam) return 'destructive';
    switch (type) {
      case 'business': return 'secondary';
      case 'personal': return 'default';
      case 'spam': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Recent Calls
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
          <Phone className="w-5 h-5" />
          Recent Calls
        </CardTitle>
      </CardHeader>
      <CardContent>
        {callLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No call history yet</p>
            <p className="text-sm mt-1">Your call logs will appear here automatically</p>
          </div>
        ) : (
          <div className="space-y-4">
            {callLogs.map((call) => (
              <div key={call.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">
                        {call.caller_name || call.caller_number}
                      </span>
                      {call.caller_name && (
                        <span className="text-sm text-muted-foreground">
                          {call.caller_number}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {call.caller_type && (
                        <Badge variant={getCallerTypeColor(call.caller_type, call.is_spam)}>
                          {call.caller_type}
                        </Badge>
                      )}
                      {call.is_spam && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Spam
                        </Badge>
                      )}
                      {call.is_blocked && (
                        <Badge variant="secondary">
                          <Shield className="w-3 h-3 mr-1" />
                          Blocked
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{formatDuration(call.call_duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{formatTime(call.call_time)}</span>
                  </div>
                </div>

                {call.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {call.location.city}, {call.location.country}
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