-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL UNIQUE,
  full_name TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create OTP logs table for tracking received OTPs
CREATE TABLE public.otp_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_number TEXT NOT NULL,
  sender_name TEXT,
  otp_code TEXT NOT NULL,
  message_content TEXT NOT NULL,
  purpose TEXT,
  location JSONB,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
  is_suspicious BOOLEAN DEFAULT false,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on otp_logs
ALTER TABLE public.otp_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for otp_logs
CREATE POLICY "Users can view their own OTP logs" 
ON public.otp_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own OTP logs" 
ON public.otp_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create call logs table for unknown caller identification
CREATE TABLE public.call_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  caller_number TEXT NOT NULL,
  caller_name TEXT,
  caller_type TEXT, -- business, personal, spam, unknown
  call_duration INTEGER DEFAULT 0,
  call_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_spam BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT false,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on call_logs
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for call_logs
CREATE POLICY "Users can view their own call logs" 
ON public.call_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own call logs" 
ON public.call_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, phone_number, full_name)
  VALUES (
    NEW.id,
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_otp_logs_user_id ON public.otp_logs(user_id);
CREATE INDEX idx_otp_logs_received_at ON public.otp_logs(received_at DESC);
CREATE INDEX idx_call_logs_user_id ON public.call_logs(user_id);
CREATE INDEX idx_call_logs_call_time ON public.call_logs(call_time DESC);