import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface OtpVerificationProps {
  phoneNumber: string;
  onBack: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({ 
  phoneNumber, 
  onBack 
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms'
      });

      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Phone number verified successfully!",
        });
        // User will be automatically redirected via AuthProvider
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Verification failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "OTP Sent",
          description: "New verification code sent to your phone",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute left-4 top-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center justify-center mb-4">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-xl">Verify Your Phone</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {phoneNumber}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleVerify}
              className="w-full" 
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleResend}
              className="w-full"
              disabled={loading}
            >
              Resend Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};