import { useState } from 'react';
import { PhoneLogin } from '@/components/auth/PhoneLogin';
import { OtpVerification } from '@/components/auth/OtpVerification';

export default function Auth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setStep('otp');
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to GenShield</h1>
          <p className="text-muted-foreground">Secure OTP protection for your digital life</p>
        </div>

        {step === 'phone' ? (
          <PhoneLogin onPhoneSubmit={handlePhoneSubmit} />
        ) : (
          <OtpVerification 
            phoneNumber={phoneNumber} 
            onBack={handleBackToPhone}
          />
        )}
      </div>
    </div>
  );
}